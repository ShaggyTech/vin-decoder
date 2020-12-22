#!/bin/bash

# Script for zero downtime Nuxt continuous deployment

set -e

# Build the new app
echo "Preparing to deploy a new production build..."
./build.sh & pid=$!
wait $pid

# Reload the app
echo "New build completed, running pm2 reload"
/home/shaggy/.nvm/versions/node/v14.15.3/lib/node_modules/pm2/bin/pm2 reload ecosystem.config.js --update-env
wait
echo "pm2 reloaded"