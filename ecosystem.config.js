// pm2 ecosystem file

module.exports = {
  // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  apps: [
    {
      name: 'vin.dubsquared.com',
      script: 'yarn',
      args: 'start',
      interpreter: '/bin/bash',
      instances: 1, // 0 for max, specify some number for limiting
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // merge_logs: true,
      log_type: 'raw',
      // script: './node_modules/@nuxt/cli-edge/bin/nuxt-cli.js',
      // args: '["start"]',
      // cwd: "/home/shaggy/www/vin.dubsquared.com/vin-decoder",
      // cwd: "./",
      // exec_mode: "cluster"
    },
  ],
};
