# Jamcraft AWS Deployment Script
# Run this in a NEW PowerShell window (to pick up Terraform in PATH)

Write-Host "🚀 Deploying Jamcraft to AWS..." -ForegroundColor Cyan
Write-Host ""

# Navigate to terraform directory
Set-Location -Path "$PSScriptRoot\terraform"

# Initialize Terraform
Write-Host "📦 Initializing Terraform..." -ForegroundColor Yellow
terraform init

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Terraform init failed. Please restart your terminal and try again." -ForegroundColor Red
    exit 1
}

# Plan the deployment
Write-Host ""
Write-Host "📋 Planning infrastructure..." -ForegroundColor Yellow
terraform plan -out=tfplan

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Terraform plan failed." -ForegroundColor Red
    exit 1
}

# Apply the deployment
Write-Host ""
Write-Host "🏗️  Deploying infrastructure (this takes 5-10 minutes)..." -ForegroundColor Yellow
terraform apply tfplan

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Terraform apply failed." -ForegroundColor Red
    exit 1
}

# Get outputs
Write-Host ""
Write-Host "✅ Infrastructure deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Getting configuration values..." -ForegroundColor Yellow

$roleArn = terraform output -raw github_actions_role_arn
$bucketName = terraform output -raw s3_bucket_name
$distributionId = terraform output -raw cloudfront_distribution_id
$nameservers = terraform output -json nameservers | ConvertFrom-Json

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 IMPORTANT: Update your domain nameservers at your registrar" -ForegroundColor Yellow
Write-Host "   to these values:" -ForegroundColor Yellow
Write-Host ""
foreach ($ns in $nameservers) {
    Write-Host "   • $ns" -ForegroundColor White
}
Write-Host ""
Write-Host "⏱️  DNS propagation can take 15-60 minutes" -ForegroundColor Yellow
Write-Host ""

# Set GitHub secrets
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔐 Setting up GitHub secrets..." -ForegroundColor Yellow
Write-Host ""

Set-Location -Path $PSScriptRoot

Write-Host "Setting AWS_ROLE_ARN..." -ForegroundColor Gray
gh secret set AWS_ROLE_ARN --body "$roleArn"

Write-Host "Setting S3_BUCKET_NAME..." -ForegroundColor Gray
gh secret set S3_BUCKET_NAME --body "$bucketName"

Write-Host "Setting CLOUDFRONT_DISTRIBUTION_ID..." -ForegroundColor Gray
gh secret set CLOUDFRONT_DISTRIBUTION_ID --body "$distributionId"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ GitHub secrets configured!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  GitHub secrets may need manual setup" -ForegroundColor Yellow
    Write-Host "   Add these in GitHub → Settings → Secrets and variables → Actions:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   AWS_ROLE_ARN: $roleArn" -ForegroundColor White
    Write-Host "   S3_BUCKET_NAME: $bucketName" -ForegroundColor White
    Write-Host "   CLOUDFRONT_DISTRIBUTION_ID: $distributionId" -ForegroundColor White
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎯 NEXT STEPS:" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Update nameservers at your domain registrar (see above)" -ForegroundColor White
Write-Host "2. Wait 15-60 minutes for DNS propagation" -ForegroundColor White
Write-Host "3. Push to main branch to trigger auto-deployment:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Add AWS infrastructure'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Your site will be live at: https://jamcraft.io" -ForegroundColor Cyan
Write-Host ""
