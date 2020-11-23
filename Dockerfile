FROM node:alpine as builder

#WORKDIR /app
RUN yarn add install http-proxy-middleware@0.21.0 fs-extra mustache-express jsdom promise

FROM navikt/node-express:14-alpine
#WORKDIR /app

#COPY build/ app/build/
#COPY server/ app/server/
#COPY start.sh app/
#COPY --from=builder /app/node_modules /app/node_modules


EXPOSE 9000 8012 443
ENTRYPOINT ["/bin/sh", "start.sh"]
