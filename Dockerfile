FROM node:24-alpine AS builder

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> server/.npmrc

WORKDIR /var/server
RUN npm ci

RUN rm /var/server/.npmrc

FROM gcr.io/distroless/nodejs24-debian12@sha256:fc48627d4510f6e5fcda973a495f82a9f11a9b3a08dca42b8656e0d3b2ad05ab AS runner

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy
WORKDIR /var

COPY --from=builder /var/dist ./dist
COPY --from=builder /var/server ./server

WORKDIR /var/server

EXPOSE 8080
CMD [ "server.js"]
