FROM node:24-bookworm-slim@sha256:a81a03dd965b4052269a57fac857004022b522a4bf06e7a739e25e18bce45af2 AS builder

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo '//npm.pkg.github.com/:_authToken='$(cat /run/secrets/NODE_AUTH_TOKEN) >> server/.npmrc

WORKDIR /var/server
RUN npm ci

RUN rm /var/server/.npmrc

FROM gcr.io/distroless/nodejs24-debian12@sha256:b35a10df56aa17825e81e836ff70fe3c27002809dd94e6bfd655ed05bac52230 AS runner

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy
WORKDIR /var

COPY --from=builder /var/dist ./dist
COPY --from=builder /var/server ./server

WORKDIR /var/server

EXPOSE 8080
CMD [ "server.js"]
