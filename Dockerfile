FROM navikt/node-express:14-alpine
WORKDIR /app
COPY build/. /app/build
COPY server/. /app
EXPOSE 3000
CMD ["node", "index.js"]
