const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.enable('trust proxy');

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(
  '/',
  createProxyMiddleware({ 
    target: 'https://api.twitter.com', 
    changeOrigin: true,
    onProxyReq(proxyReq, req, res) {
      // proxyReq.setHeader('origin', 'https://mobile.twitter.com');
      proxyReq.setHeader('referer', 'https://mobile.twitter.com/');
    },
  }),
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));