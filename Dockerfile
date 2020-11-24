FROM navikt/node-express:14-alpine
WORKDIR /app

COPY package.json /app/.
COPY build/. /app/.
COPY server/. /app/.
COPY ./node_modules/. /app/.

RUN npm install http-proxy-middleware

EXPOSE 9000 8012 8080 443
ENTRYPOINT ["node", "index.js"]
