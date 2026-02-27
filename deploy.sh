#!/bin/bash
# Complete GitHub Pages Deployment Script
# Run this after creating your GitHub repository

echo "🚀 GitHub Pages Deployment"
echo "=========================="
echo ""

# Check if git remote is already set
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote already configured"
    CURRENT_URL=$(git remote get-url origin)
    echo "   Current: $CURRENT_URL"
else
    echo "⚠️  GitHub repository not connected yet"
    echo ""
    echo "Step 1: Create GitHub Repository"
    echo "--------------------------------"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: oleavine-dashboard"
    echo "3. Description: Oleavine Social Command Center"
    echo "4. Make it: Public"
    echo "5. Click 'Create repository'"
    echo ""
    echo "Step 2: Connect and Push"
    echo "------------------------"
    echo "Run these commands:"
    echo ""
    echo "cd /home/ubuntu/.openclaw/workspace/tools/gh-pages"
    echo "git remote add origin https://github.com/YOUR_USERNAME/oleavine-dashboard.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    echo "Step 3: Enable GitHub Pages"
    echo "---------------------------"
    echo "1. Go to: https://github.com/YOUR_USERNAME/oleavine-dashboard/settings/pages"
    echo "2. Under 'Build and deployment':"
    echo "   Source: Deploy from a branch"
    echo "   Branch: main / (root)"
    echo "3. Click 'Save'"
    echo ""
    echo "Step 4: Access Your Dashboard"
    echo "-----------------------------"
    echo "Wait 2-3 minutes, then visit:"
    echo "https://YOUR_USERNAME.github.io/oleavine-dashboard"
    echo ""
    exit 0
fi

echo ""
echo "Step 2: Push to GitHub"
echo "----------------------"
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "Step 3: Enable GitHub Pages"
    echo "---------------------------"
    echo "1. Go to your repo settings:"
    REMOTE_URL=$(git remote get-url origin | sed 's/\.git$//\/settings\/pages/')
    echo "   $REMOTE_URL"
    echo ""
    echo "2. Under 'Build and deployment':"
    echo "   Source: Deploy from a branch"
    echo "   Branch: main / (root)"
    echo "3. Click 'Save'"
    echo ""
    echo "Step 4: Wait and Access"
    echo "-----------------------"
    USERNAME=$(git remote get-url origin | sed 's/.*github.com\///' | sed 's/\/.*//')
    echo "Wait 2-3 minutes, then visit:"
    echo "https://$USERNAME.github.io/oleavine-dashboard"
    echo ""
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   - Wrong repository URL"
    echo "   - Not authenticated with GitHub"
    echo "   - Repository doesn't exist"
    echo ""
    echo "Try running: git push -u origin main"
fi
