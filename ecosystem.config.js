// pm2 ecosystem file
// $ pm2 start ecosystem.config.js
// $ pm2 save
// $ pm2 status

module.exports = {
  // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  apps: [
    {
      name: 'vin.shaggytech.com',
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      log_type: 'raw',
      script: './node_modules/nuxt-edge/bin/nuxt.js',
      args: 'start',
    },
  ],
};
