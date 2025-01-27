import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app) => {
  app.use(
    createProxyMiddleware({
      target: 'https://backendhackathon-production.up.railway.app', // Replace with your backend server URL
      changeOrigin: true, // Ensures the host header of the request matches the target
      pathRewrite: {
        '^/': '/', // Rewrite all paths (optional, depending on your backend setup)
      },
    })
  );
};

export default setupProxy;
