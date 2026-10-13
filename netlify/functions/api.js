const serverless = require('serverless-http');
const app = require('../../api/app');

const handle = serverless(app);

exports.handler = async (event, context) => {
  const prefix = '/.netlify/functions/api';
  if (event.path && event.path.startsWith(prefix)) {
    event.path = event.path.slice(prefix.length) || '/';
  }
  if (event.rawPath && event.rawPath.startsWith(prefix)) {
    event.rawPath = event.rawPath.slice(prefix.length) || '/';
  }
  return handle(event, context);
};
