FROM navikt/node-express:14-alpine
WORKDIR /app

COPY build/. /app/.
COPY server/. /app/.

RUN npm install http-proxy-middleware -g

EXPOSE 9000 8012 8080 443
ENTRYPOINT ["node", "index.js"]
