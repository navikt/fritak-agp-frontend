FROM navikt/node-express:14-common
WORKDIR /app

COPY index.js /app/.
COPY build/. /app/.

RUN npm install http-proxy-middleware -g

EXPOSE 9000 8012 443
CMD ["node", "index.js"]
