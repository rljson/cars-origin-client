# @license
# Copyright (c) 2026 Rljson
#
# Use of this source code is governed by terms that can be
# found in the LICENSE file in the root of this package.

# The container cars-origin-client: the page, served by nginx as uid 1000.

FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm exec vite build

FROM nginxinc/nginx-unprivileged:1.27-alpine
USER root
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
COPY public/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/dist/cars-origin-client.js /usr/share/nginx/html/
RUN chown -R 1000:1000 /etc/nginx/conf.d /var/cache/nginx /usr/share/nginx/html
# MASTER_URL reaches the master of this side; the deployment sets it per stage
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1 \
    MASTER_URL=http://host.docker.internal:3000
USER 1000
EXPOSE 8080
