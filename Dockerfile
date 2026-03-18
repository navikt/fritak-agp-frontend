FROM node:25-bookworm-slim@sha256:44bcbf493408a824104e74976ae5539f596c46cbe75ed0423a137552a555e2de AS builder

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN npm install -g --force --ignore-scripts corepack && corepack enable

RUN --mount=type=secret,id=NODE_AUTH_TOKEN sh -c \
    'npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)'
RUN npm config set @navikt:registry=https://npm.pkg.github.com

WORKDIR /var/server
RUN pnpm install --frozen-lockfile  --ignore-scripts

FROM gcr.io/distroless/nodejs24-debian12@sha256:61f4f4341db81820c24ce771b83d202eb6452076f58628cd536cc7d94a10978b AS runner

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy
WORKDIR /var

COPY --from=builder /var/dist ./dist
COPY --from=builder /var/server ./server

WORKDIR /var/server

EXPOSE 8080
CMD [ "server.js"]
