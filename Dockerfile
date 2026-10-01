FROM cgr.dev/chainguard/wolfi-base@sha256:2bdab5abde97a1487c667d3ffcc7265fa9abdeb5b2365bca9a64a5f3afc5a563 AS builder

WORKDIR /var

COPY dist/ dist/
COPY server/ server/

RUN npm install -g --force --ignore-scripts corepack && corepack enable

RUN --mount=type=secret,id=NODE_AUTH_TOKEN sh -c \
    'npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)'
RUN npm config set @navikt:registry=https://npm.pkg.github.com

WORKDIR /var/server
RUN pnpm install --frozen-lockfile  --ignore-scripts

FROM cgr.dev/chainguard/wolfi-base@sha256:2bdab5abde97a1487c667d3ffcc7265fa9abdeb5b2365bca9a64a5f3afc5a563 AS runner

# Uncommet for debugging of express-http-proxy
# ENV DEBUG=express-http-proxy
WORKDIR /var

COPY --from=builder /var/dist ./dist
COPY --from=builder /var/server ./server

WORKDIR /var/server

EXPOSE 8080
CMD [ "server.js"]
