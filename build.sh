#!/bin/bash

# Script for zero downtime Nuxt continuous deployment
# called from ./deploy.sh to deploy new changes

set -e

# Fetch new files - Change to 'main' if using newish github repo
git pull -f origin master

# New build directory
mkdir -p dist_next

# Make nuxt temporarily output to dist_next dir so production site is not interrupted
echo "nuxt.config.ts changes to build in ./dist_next"
sed -i "s/generate: { dir: 'dist' },/generate: { dir: 'dist_next' },/" nuxt.config.ts

# Make sure we have latest dependencies installed
echo "Updating Yarn dependencies..."
yarn

# Build the new nuxt app
echo "Generating new nuxt app from master branch into ./dist_next ..."
yarn generate
echo "New build has been output to ./dist_next/"

# Revert the nuxt config change
git restore nuxt.config.ts
echo "nuxt.config.ts changes reverted"

# Replace the existing directory with the new build
echo "Replacing files in ./dist with new build..."
rm -rf dist && mv dist_next dist

echo "build.sh completed successfully "
