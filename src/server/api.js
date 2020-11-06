const proxy = require('http-proxy-middleware');

// const sykemeldteTarget = () => {
//     if (process.env.NAIS_CLUSTER_NAME === "prod-sbs") {
//         return "https://tjenester.nav.no";
//     } else {
//         return "https://tjenester-q1.nav.no";
//     }
// };

const apiProxyConfig = {
    changeOrigin: true,
    target: 'http://localhost:3000',
    // pathRewrite: {
    //     '^/fritak-agp': '',
    // },
    secure: true,
    xfwd: true
};


module.exports = proxy(apiProxyConfig);

// app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
