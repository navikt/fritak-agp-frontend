FROM node:alpine as builder

WORKDIR /app
RUN yarn add http-proxy-middleware@0.21.0 fs-extra mustache-express jsdom promise


FROM navikt/node-express:12.2.0-alpine
WORKDIR /app

COPY build/ build/
COPY src/server/ src/server/
COPY start.sh ./
COPY --from=builder /app/node_modules /app/node_modules


EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
