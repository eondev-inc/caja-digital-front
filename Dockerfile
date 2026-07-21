# Stage 1: Build the React Vite app
# node:16-alpine is EOL (April 2023) and the source of F-08.
# node:22-alpine is the current LTS; uses corepack to pin pnpm 10.
FROM node:lts-alpine3.28 AS build

WORKDIR /app

# Enable pnpm via corepack so the lockfile (pnpm-lock.yaml) is honored.
# `--frozen-lockfile` makes the build fail if package.json drifts from the lockfile.
RUN corepack enable && corepack prepare pnpm@10 --activate

# Copy only the manifest + lockfile first to leverage Docker layer caching.
# package-lock.json is intentionally NOT copied; the project uses pnpm.
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# VITE_API_URL and VITE_API_KEY are read at build time by Vite and baked
# into the client bundle. They MUST be provided via --build-arg at CI/CD.
# If absent the bundle ships with empty strings; the runtime will fail fast.
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