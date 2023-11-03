FROM navikt/node-express:18

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

WORKDIR /var/server
RUN npm ci

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
