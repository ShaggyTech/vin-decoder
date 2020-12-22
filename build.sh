#!/bin/bash

# Script for zero downtime Nuxt continuous deployment
# called from ./deploy.sh to deploy new changes

# Fetch new files
git fetch --all
git checkout master
git pull

wait

# Rename the build directory
mkdir -p dist_next
sed -i "s/generate: { dir: 'dist' },/generate: { dir: 'dist_next' },/" nuxt.config.ts

# Update dependencies
echo "Updating Yarn dependencies..."
yarn

# Build the app
echo "Generating new nuxt app from master branch into ./dist_next ..."
yarn generate
wait
echo "New build has been output to ./dist_next/"
echo "New nuxt app built!"

# Revert the rename
sed -i "s/generate: { dir: 'dist_next' },/generate: { dir: 'dist' },/" nuxt.config.ts

# Replace the existing directory with the new build
echo "Replacing files in ./dist with new build..."
rm -rf dist && mv dist_next dist
