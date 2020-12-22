// Simple example node.js webhook server
// credit to:
// https://www.robinwieruch.de/github-webhook-node-js

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = 9000;

// !! EDIT
const SECRET = 'MY_GITHUB_WEBHOOK_SECRET';

// !!! EDIT
// Uncomment and change at least one of the following to match your github repository name
// with the correct folder for your production server
const GITHUB_REPOSITORIES_TO_DIR = {
  // 'ShaggyTech/vin-decoder': '/home/shaggy/my-website-one',
  // 'ShaggyTech/some-other-website': '/home/shaggy/my-website-two',
};

http
  .createServer((req, res) => {
    req.on('data', (chunk) => {
      console.log({
        message: `Webhook received, parsing request...`,
      });
      const signature = `sha1=${crypto
        .createHmac('sha1', SECRET)
        .update(chunk)
        .digest('hex')}`;

      const isAllowed = req.headers['x-hub-signature'] === signature;

      const body = JSON.parse(chunk);

      const isMaster = body.ref === 'refs/heads/master' || false;
      const fullName = body.repository.full_name || false;
      const directory = GITHUB_REPOSITORIES_TO_DIR[fullName] || false;

      if (isAllowed && isMaster && directory) {
        console.log({
          message: `Webhook parsed successfully.`,
          isAllowed,
          body,
          isMaster,
          directory,
          error: false,
        });
        try {
          console.log({
            message: `Running 'deploy.sh' in ${directory}.`,
          });

          exec(`cd ${directory} && bash deploy.sh`);

          console.log({
            message: `New website deployed in ${directory}`,
            error: false,
          });
        } catch (error) {
          console.log({
            message: `Error deploying website.`,
            error,
          });
        }
      } else {
        console.log({
          message: `Error parsing webhook request data.`,
          isAllowed,
          body,
          isMaster,
          directory,
          error: true,
        });
      }
    });

    res.end();
  })
  .listen(PORT);

console.log({
  message: `Webhook server listening on port ${PORT}`,
});
