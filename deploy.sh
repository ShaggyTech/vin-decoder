#!/bin/bash

# Script for zero downtime Nuxt continuous deployment

# Build the new app
echo "Preparing to deploy a new production build..."
./build.sh & pid=$!
wait $pid

# Reload the app
echo "New build completed, running pm2 reload"
pm2 reload ecosystem.config.js --update-env