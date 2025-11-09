# DressUp_V2

Fashion rental platform with three user roles: Admin, Buyer, Seller.

## Tech Stack
- Backend: Node.js (Express + TypeScript) with Prisma ORM, PostgreSQL
- Frontend: Next.js (App Router) + NextAuth (Google & Facebook OAuth)
- Auth: NextAuth issuing JWT consumed by Express protected routes
- Containers: Docker & docker-compose (web, server, postgres)

## High-Level Features
- User registration/login via Google or Facebook
- Seller dashboard: KPI overview & upload new dresses
- Buyer pages: Home (list dresses), Dress detail, Cart, Checkout (rental flow)
- Admin (placeholder) for future management features

## Monorepo Structure
```
/README.md
/docker-compose.yml
/server
  /src
  /prisma
/web
  /app
  /components
```

## Getting Started (Dev)
1. Copy `.env.example` files in `server` and `web` to `.env` and fill values.
2. Run `docker compose up --build`.
3. Apply Prisma migrations automatically on server start (dev script).

## Roadmap
- Payments integration
- Image CDN & processing
- Advanced search & filtering
- Admin moderation tools
