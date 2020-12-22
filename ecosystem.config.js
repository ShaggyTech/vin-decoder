// pm2 ecosystem file

module.exports = {
  // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  apps: [
    {
      name: 'vin.dubsquared.com',
      script: './node_modules/@nuxt/cli-edge/bin/nuxt-cli.js',
      args: ['start'],
      instances: 0, // 0 for max, specify some number for limiting
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
