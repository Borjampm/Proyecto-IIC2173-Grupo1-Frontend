const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/', // Specify the URL path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // URL of your API server
      changeOrigin: true, // Necessary for virtual hosted sites
    })
  );
};