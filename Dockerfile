FROM navikt/node-express:14-alpine
WORKDIR /usr/src/app
COPY build/. ./build
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
