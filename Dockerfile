FROM navikt/node-express:14-alpine AS basebuilder
WORKDIR /app

COPY package.json /app/.

RUN npm install http-proxy-middleware

COPY build/. /app/.
COPY server/. /app/.



EXPOSE 9000 8012 8080 443
ENTRYPOINT ["node", "index.js"]
