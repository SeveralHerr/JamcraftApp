# Jamcraft Infrastructure

This directory contains Terraform configuration for deploying the Jamcraft portfolio website to AWS with CloudFront, S3, Route53, and ACM SSL certificates.

## Architecture

- **S3**: Static website hosting bucket
- **CloudFront**: CDN with HTTPS/SSL termination
- **Route53**: DNS management for jamcraft.io
- **ACM**: Free SSL/TLS certificate (auto-renewed)

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **Terraform** >= 1.0 installed ([download](https://www.terraform.io/downloads))
3. **AWS CLI** configured with credentials ([setup guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))
4. **Domain ownership**: You must own jamcraft.io

## Initial Setup

### 1. Configure AWS Credentials

```powershell
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, and default region (us-east-1).

### 2. Initialize Terraform

```powershell
cd terraform
terraform init
```

### 3. Review Infrastructure Plan

```powershell
terraform plan
```

This will show you all resources that will be created.

### 4. Deploy Infrastructure

```powershell
terraform apply
```

Type `yes` when prompted. This will take 5-10 minutes.

**IMPORTANT**: After apply completes, Terraform will output nameservers. You **must** update your domain registrar with these nameservers for DNS to work.

### 5. Update Domain Nameservers

After `terraform apply` completes, you'll see output like:

```
nameservers = [
  "ns-1234.awsdns-56.org",
  "ns-789.awsdns-01.net",
  ...
]
```

Go to your domain registrar (where you purchased jamcraft.io) and update the nameservers to match these values. DNS propagation can take 24-48 hours but is usually faster (15-60 minutes).

### 6. Set up GitHub Actions

Create the following secrets in your GitHub repository (Settings → Secrets and variables → Actions → New repository secret):

1. **AWS_ROLE_ARN**: IAM role ARN for GitHub Actions OIDC (see below)
2. **S3_BUCKET_NAME**: Run `terraform output s3_bucket_name`
3. **CLOUDFRONT_DISTRIBUTION_ID**: Run `terraform output cloudfront_distribution_id`

#### Creating GitHub Actions IAM Role

Create an IAM role that allows GitHub Actions to deploy:

```powershell
# Navigate to terraform directory
cd terraform

# Create the GitHub OIDC role (one-time setup)
terraform apply -target=aws_iam_openid_connect_provider.github
```

Then create this file: `terraform/github-actions-role.tf`

```hcl
# IAM role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name = "${var.project_name}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:SeveralHerr/JamcraftApp:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "github_actions_s3" {
  name = "s3-access"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ]
        Resource = [
          aws_s3_bucket.website.arn,
          "${aws_s3_bucket.website.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "github_actions_cloudfront" {
  name = "cloudfront-access"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation"
        ]
        Resource = aws_cloudfront_distribution.website.arn
      }
    ]
  })
}

data "aws_caller_identity" "current" {}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "IAM role ARN for GitHub Actions (add this as AWS_ROLE_ARN secret)"
}
```

Then run:

```powershell
terraform apply
```

Copy the `github_actions_role_arn` output and add it as a GitHub secret named `AWS_ROLE_ARN`.

## Deployment Workflow

Once set up, every push to the `main` branch will automatically:

1. Build the React app
2. Sync files to S3
3. Invalidate CloudFront cache
4. Make the new version live

You can also trigger deployments manually from the GitHub Actions tab.

## Useful Commands

```powershell
# View current infrastructure state
terraform show

# View outputs (URLs, IDs, etc.)
terraform output

# Update infrastructure after code changes
terraform apply

# Destroy all infrastructure (careful!)
terraform destroy
```

## Troubleshooting

### SSL Certificate Issues

If the certificate is stuck in "Pending Validation":
1. Check that nameservers are updated at your domain registrar
2. Run `nslookup jamcraft.io` to verify DNS propagation
3. Wait up to 30 minutes for ACM to validate

### Website Not Loading

1. Check CloudFront distribution status: `terraform output cloudfront_domain_name`
2. Visit the CloudFront domain directly to test
3. Check Route53 records are pointing to CloudFront
4. Clear browser cache or test in incognito mode

### GitHub Actions Failing

1. Verify all three secrets are set in GitHub
2. Check AWS credentials have correct permissions
3. Review GitHub Actions logs for specific errors

## Cost Estimate

- **S3**: ~$0.50-2/month (storage + requests)
- **CloudFront**: ~$0.50-5/month (data transfer, first 1TB free tier for 12 months)
- **Route53**: $0.50/month per hosted zone
- **ACM**: Free

**Total**: ~$1-8/month depending on traffic

## Security Features

- S3 bucket is private (no public access)
- CloudFront uses Origin Access Control (OAC)
- TLS 1.2+ enforced
- HTTPS redirect enabled
- Server-side encryption enabled on S3
- Versioning enabled for rollback capability
