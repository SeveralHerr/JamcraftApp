variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = "jamcraft.io"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "jamcraft"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}
