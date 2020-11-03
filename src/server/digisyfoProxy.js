const proxy = require('http-proxy-middleware');

const sykemeldteTarget = () => {
    if (process.env.NAIS_CLUSTER_NAME === "prod-sbs") {
        return "https://tjenester.nav.no";
    } else {
        return "https://tjenester-q1.nav.no";
    }
};

const digisyfoSykemeldteProxyConfig = {
    changeOrigin: true,
    target: sykemeldteTarget(),
    pathRewrite: {
        '^/fritak-agp': '',
    },
    secure: true,
    xfwd: true
};


module.exports = proxy(digisyfoSykemeldteProxyConfig);
