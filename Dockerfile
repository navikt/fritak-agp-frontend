FROM node:21-alpine

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> .npmrc

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> server/.npmrc


WORKDIR /var/server
RUN npm ci

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
