FROM navikt/node-express:14-alpine as builder

WORKDIR /app
RUN yarn add http-proxy-middleware

FROM navikt/node-express:12.2.0-alpine
WORKDIR /app

COPY build/. /app/build
COPY server/. /app/server
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000
ENTRYPOINT ['node', 'server/index.js']
