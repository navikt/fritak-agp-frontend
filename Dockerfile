FROM node:25-bookworm-slim@sha256:32f45869cf02c26971de72c383d5f99cab002905ed8b515b56df925007941782 AS builder

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> server/.npmrc

WORKDIR /var/server
RUN npm ci

RUN rm /var/server/.npmrc

FROM gcr.io/distroless/nodejs24-debian12@sha256:aad62f814208ec57ff3a67a9ca8764b0bfa0f7af9809008a04aada96f6987dab AS runner

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy
WORKDIR /var

COPY --from=builder /var/dist ./dist
COPY --from=builder /var/server ./server

WORKDIR /var/server

EXPOSE 8080
CMD [ "server.js"]
