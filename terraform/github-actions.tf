# OIDC provider for GitHub Actions
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]

  tags = {
    Name        = "${var.project_name}-github-oidc"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name = "${var.project_name}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
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

  tags = {
    Name        = "${var.project_name}-github-actions-role"
    Environment = var.environment
    Project     = var.project_name
  }
}

# S3 access policy for GitHub Actions
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

# CloudFront access policy for GitHub Actions
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

# Data source for AWS account ID
data "aws_caller_identity" "current" {}

# Output the role ARN for GitHub secrets
output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "IAM role ARN for GitHub Actions (add this as AWS_ROLE_ARN secret)"
}
