FROM navikt/node-express:14-alpine

WORKDIR /app

COPY build/. /build
COPY server/. /
RUN npm install

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
