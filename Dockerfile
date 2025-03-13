FROM node:22-alpine AS builder

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> server/.npmrc

WORKDIR /var/server
RUN npm ci

RUN rm /var/server/.npmrc

FROM gcr.io/distroless/nodejs22-debian12@sha256:ba670ace564d2ff780881509904d3ee4c8fbf3e587bed6a395377b7e56bfcf4a AS runner

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy
WORKDIR /var

COPY --from=builder /var/dist ./dist
COPY --from=builder /var/server ./server

WORKDIR /var/server

EXPOSE 8080
CMD [ "server.js"]
