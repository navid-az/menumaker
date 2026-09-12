# ============== BUILD STAGE ==============
FROM node:26-slim AS builder

WORKDIR /app

RUN npm config set registry https://mirror.abrha.net/repository/npm/
RUN npm install -g pnpm@10.12.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Declare each NEXT_PUBLIC_* as a build arg and convert to ENV
# so Next.js can read them during `next build`
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_DEMO_MODE_ENABLED

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL
ENV NEXT_PUBLIC_MEDIA_URL=$NEXT_PUBLIC_MEDIA_URL
ENV NEXT_PUBLIC_DEMO_MODE_ENABLED=$NEXT_PUBLIC_DEMO_MODE_ENABLED



RUN pnpm run build

# ============== PRODUCTION STAGE ==============
FROM node:26-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]