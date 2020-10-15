FROM openresty/openresty:alpine-fat

# User env var is needed for luarocks to not complain.
ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/fritak-agp" \
	USER="root"

# Copying over the config-files.
COPY files/default-config.nginx /etc/nginx/conf.d/app.conf.template
COPY files/start-nginx.sh       /usr/sbin/start-nginx
RUN chmod u+x /usr/sbin/start-nginx
RUN mkdir -p /nginx
COPY build /app

EXPOSE 9000 8012 443

WORKDIR ${APP_DIR}

CMD ["start-nginx"]
