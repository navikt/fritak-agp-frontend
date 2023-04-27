FROM node:18-alpine

WORKDIR /var

COPY build/ build/
COPY server/ server/

WORKDIR /var/server
RUN npm install

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
