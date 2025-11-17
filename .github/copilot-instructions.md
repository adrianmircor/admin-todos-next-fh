# Copilot Instructions - Admin Todos Next.js App

## Architecture Overview
- **Next.js 16** with TypeScript, React 19, and Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM (schema in `prisma/schema.prisma`)
- **Authentication**: NextAuth.js v4 with Prisma adapter (`auth/` folder)
- **State Management**: Server Actions pattern for todos (`todos/actions/`)
- **Layout**: Dashboard layout with sidebar navigation (`app/dashboard/layout.tsx`)

## Essential Patterns

### Prisma Client Usage
- Always import from `@/libs/prisma` (singleton pattern for dev/prod environments)
- Example: `import prisma from "@/libs/prisma";`

### Server Actions Convention
- Use `'use server'` directive at top of action files
- Always call `revalidatePath()` after mutations to refresh cache
- Pattern: `export const serverActions[ActionName] = async (...): Promise<ReturnType>`
- Example: See `todos/actions/todo-actions.ts`

### Authentication Setup
- Root layout wraps with `AuthProvider` HOC (client component)
- User model has roles array and isActive boolean fields
- Default test user: `test1@google.com` / `123456`

### Development Workflow
```bash
# Start PostgreSQL database
docker compose up -d

# Install dependencies and start dev server
npm install
npm run dev

# Database migrations
npx prisma migrate dev
npx prisma generate

# Seed database (creates test user + sample todos)
# Visit: localhost:3000/api/seed
```

### File Structure Conventions
- Feature-based folders: `todos/`, `auth/`, `products/`, `shopping-cart/`
- Each feature exports from `index.ts` barrel file
- Components in `components/` subfolder within features
- Actions in `actions/` subfolder for server functions

### Database Schema Notes
- UUIDs for all primary keys (`@id @default(uuid())`)
- User-Todo relationship with `userId` foreign key
- Auth.js tables: Account, Session, User, VerificationToken
- Employee table separate from User (legacy/example model)

### Import Aliases
- `@/` maps to project root for absolute imports
- Example: `@/libs/prisma`, `@/auth/components/AuthProvider`