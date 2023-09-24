const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL } = require('./src/config');

module.exports = function (app) {
  app.use(
    '/', // Specify the URL path you want to proxy
    createProxyMiddleware({
      target: API_URL, // URL of your API server
      changeOrigin: true, // Necessary for virtual hosted sites
    })
  );
};