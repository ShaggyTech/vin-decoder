#!/bin/bash

# Script for zero downtime Nuxt continuous deployment

# Fetch new files
git fetch --all
git checkout --force "origin/master"

# Rename the build directory
sed -i "s/buildDir: '.nuxt'/buildDir: 'next_build'/" nuxt.config.ts

# Install dependencies
echo "Installing Yarn dependencies..."
yarn

# Build the app
echo "Generating new nuxt app from master branch..."
yarn generate
echo "New nuxt app built!"
wait 3

# Revert the rename
git checkout nuxt.config.js

# Replace the existing directory with the new build
echo "Replacing files in .nuxt with new build..."
rm -rf .nuxt && mv next_build .nuxt

echo "New build completed, running pm2 reload"
pm2 reload vin.dubsquared.com
