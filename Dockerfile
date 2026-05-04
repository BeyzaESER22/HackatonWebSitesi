# ─────────────────────────────────────────────────────
# HackFest'26 AI — Coolify Production Dockerfile
# Multi-stage build for Next.js 14 (standalone)
# ─────────────────────────────────────────────────────

# ── Stage 1: Install dependencies ──
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# ── Stage 2: Build the application ──
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (override via Coolify environment settings)
ARG NEXT_PUBLIC_SITE_URL=https://hackfest26.com
ARG NEXT_PUBLIC_EVENT_NAME="HackFest'26 AI"
ARG NEXT_PUBLIC_EVENT_DATE_ISO=2026-05-16T09:00:00+03:00
ARG NEXT_PUBLIC_CONTACT_EMAIL=gdg@istinye.edu.tr

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_EVENT_NAME=$NEXT_PUBLIC_EVENT_NAME
ENV NEXT_PUBLIC_EVENT_DATE_ISO=$NEXT_PUBLIC_EVENT_DATE_ISO
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL

# Ensure data directory exists for build
RUN mkdir -p data && \
    for f in hackathon-applications.json attendees.json projects.json; do \
      [ -f "data/$f" ] || echo '[]' > "data/$f"; \
    done

RUN npm run build

# ── Stage 3: Production runner ──
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create writable data directory for runtime
RUN mkdir -p data && chown nextjs:nodejs data

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
