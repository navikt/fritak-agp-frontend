FROM navikt/node-express:14-alpine as builder
WORKDIR /app

COPY package.json /app/.

RUN npm install http-proxy-middleware

COPY build/. /app/.
COPY server/. /app/.
COPY --from=builder  node_modules/. /app/.



EXPOSE 9000 8012 8080 443
ENTRYPOINT ["node", "index.js"]
