# ============== BUILD STAGE ==============
FROM node:26-slim AS builder

WORKDIR /app

RUN npm install -g pnpm@10.12.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# NEXT_PUBLIC_* must be baked in HERE, during the build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MEDIA_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_MEDIA_URL=${NEXT_PUBLIC_MEDIA_URL}

RUN pnpm run build

# ============== PRODUCTION STAGE ==============
FROM node:26-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Runtime env vars — read at request time, not baked into bundle
# These are injected by docker compose at container startup
ENV API_URL=http://backend:8000
# SECRET_KEY and other runtime vars come from compose environment/env_file

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]