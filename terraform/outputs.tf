output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "nameservers" {
  description = "Route53 nameservers (update these at your domain registrar)"
  value       = aws_route53_zone.main.name_servers
}
