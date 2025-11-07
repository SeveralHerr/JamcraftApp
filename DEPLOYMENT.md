# Jamcraft Deployment Guide

Quick guide to deploying the Jamcraft portfolio website to AWS with SSL.

## Quick Start

### 1. Install Prerequisites

- [Terraform](https://www.terraform.io/downloads) (>= 1.0)
- [AWS CLI](https://aws.amazon.com/cli/)
- AWS account with admin access

### 2. Configure AWS

```powershell
aws configure
```

### 3. Deploy Infrastructure

```powershell
cd terraform
terraform init
terraform apply
```

**Important**: After `terraform apply`, you'll get nameservers. Update these at your domain registrar (where you bought jamcraft.io).

### 4. Set Up GitHub Actions

Add these secrets to your GitHub repo (Settings → Secrets and variables → Actions):

1. `AWS_ROLE_ARN` - Get from: `terraform output github_actions_role_arn`
2. `S3_BUCKET_NAME` - Get from: `terraform output s3_bucket_name`
3. `CLOUDFRONT_DISTRIBUTION_ID` - Get from: `terraform output cloudfront_distribution_id`

### 5. Deploy Your Site

Push to `main` branch and GitHub Actions will automatically deploy!

```powershell
git add .
git commit -m "Deploy infrastructure"
git push origin main
```

## Architecture

- **S3** stores your static files
- **CloudFront** serves them globally with HTTPS
- **ACM** provides free SSL certificate
- **Route53** manages DNS for jamcraft.io
- **GitHub Actions** auto-deploys on every push to main

## Costs

~$1-8/month depending on traffic (S3 + CloudFront + Route53)

## Full Documentation

See [terraform/README.md](terraform/README.md) for detailed setup, troubleshooting, and configuration options.

## Manual Deploy (without GitHub Actions)

If you want to deploy manually:

```powershell
cd jamcraft-app
npm install
npm run build

# Get bucket name
cd ../terraform
terraform output s3_bucket_name

# Upload to S3
aws s3 sync ../jamcraft-app/build/ s3://YOUR-BUCKET-NAME/ --delete

# Invalidate CloudFront cache
terraform output cloudfront_distribution_id
aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

## Troubleshooting

**SSL not working?**
- Check nameservers are updated at domain registrar
- Wait 15-30 minutes for DNS propagation
- ACM validation can take up to 30 minutes

**Site not loading?**
- Try the CloudFront URL directly: `terraform output cloudfront_domain_name`
- Check if DNS has propagated: `nslookup jamcraft.io`
- Clear browser cache or use incognito mode

**GitHub Actions failing?**
- Verify all three secrets are set correctly
- Check IAM role has correct permissions
- Review logs in GitHub Actions tab

## Useful Commands

```powershell
# View all infrastructure outputs
terraform output

# View website URL
terraform output website_url

# View CloudFront distribution
terraform output cloudfront_domain_name

# Update infrastructure
terraform apply

# Destroy everything (careful!)
terraform destroy
```
