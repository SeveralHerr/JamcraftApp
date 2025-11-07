terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment this block after creating an S3 bucket for state in your AWS account
  # backend "s3" {
  #   bucket = "jamcraft-terraform-state"
  #   key    = "jamcraft-io/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

# Primary provider for most resources
provider "aws" {
  region = var.aws_region
}

# us-east-1 provider for ACM certificate (CloudFront requires certs in us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
