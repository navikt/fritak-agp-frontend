FROM navikt/node-express:14-alpine as builder

WORKDIR /app
RUN yarn add http-proxy-middleware fs-extra mustache-express jsdom promise

FROM navikt/node-express:12.2.0-alpine
WORKDIR /app

COPY build/. /app/.
COPY server/. /app/.
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 9000 3000 8012 8080 443
ENTRYPOINT ["node", "index.js"]
