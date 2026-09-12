# Stage 1: Build the React Vite app
FROM node:lts-alpine3.28 AS build

WORKDIR /app

# Enable pnpm via corepack so the lockfile (pnpm-lock.yaml) is honored.
# `--frozen-lockfile` makes the build fail if package.json drifts from the lockfile.
RUN corepack enable && corepack prepare pnpm@10 --activate

# Copy workspace + manifest + lockfile first to leverage Docker layer caching.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# VITE_API_URL is required — config.js throws if empty (fail-secure).
# VITE_API_KEY is optional — axios omits apikey header when empty (C-01).
# Both are baked at build time via Vite; provide via --build-arg in CI.
# Build without VITE_API_KEY is supported (BFF proxy path).
ARG VITE_API_URL
ARG VITE_API_KEY
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_KEY=${VITE_API_KEY}

COPY . .
RUN pnpm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
