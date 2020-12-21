#!/bin/bash

# Script for zero downtime Nuxt continuous deployment
# called from ./deploy.sh to deploy new changes

# Fetch new files
git fetch --all
git checkout --force "origin/master"

# Rename the build directory
mkdir -p next_build
sed -i "s/buildDir: '.nuxt'/buildDir: 'next_build'/" nuxt.config.ts

# Update dependencies
echo "Updating Yarn dependencies..."
yarn

# Build the app
echo "Generating new nuxt app from master branch into ./next_build ..."
yarn generate
echo "New build has been output to ./next_build/"
echo "New nuxt app built!"

# Revert the rename
git checkout nuxt.config.ts

# Replace the existing directory with the new build
echo "Replacing files in .nuxt with new build..."
rm -rf .nuxt && mv next_build .nuxt
