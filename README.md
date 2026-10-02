# collabrativeDraw

> A modern, real-time multiplayer whiteboard monorepo where two or more users can create, manipulate, and synchronize canvas shapes simultaneously.

![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue?style=flat-square&logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Turborepo](https://img.shields.io/badge/Turborepo-2.x-ef4444?style=flat-square&logo=turborepo)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green?style=flat-square&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=flat-square&logo=prisma)

---

## 🎨 Overview

**collabrativeDraw** is a collaborative whiteboard application built with performance and developer ergonomics in mind. It allows teams, designers, and developers to join shared canvas rooms and brainstorm, sketch architecture, and manipulate geometric shapes in real time with near-zero latency.

### Key Highlights
- **Simultaneous Multiplayer Drawing**: Multiple connected users can create, drag, and modify shapes on the canvas concurrently.
- **Top-Center Floating Canvas Toolbar**: Intuitive shape switching (**Rectangle**, **Circle**, **Arrow**, and **Pencil**) with live active state highlighting.
- **Direct Workspace Dashboard (`/dashboard`)**: Preview your active whiteboard room, monitor connected collaborators, and access recent rooms without mandatory authentication barriers.
- **Full Authentication Suite**: Clean, minimalist **Sign In** (`/signin`) and **Sign Up** (`/signup`) flows with client-side validation.
- **Distraction-Free Drafting Aesthetic**: Built with a sleek dark obsidian/graphite design system (`#090a0f`), subtle drafting grid textures, and refined typography.

---

## 🏗️ Monorepo Architecture

This project is organized as a **Turborepo** monorepo managed with **pnpm workspaces**:

```text
excaliDraw/
├── apps/
│   ├── web/               # Next.js 16 frontend (React 19, Tailwind CSS v4, HTML5 Canvas 2D)
│   ├── http/              # Node.js & Express REST API (Auth, Room management, History)
│   └── ws/                # WebSocket server for instant real-time shape broadcasting
├── packages/
│   ├── db/                # Prisma ORM client with PostgreSQL adapter
│   ├── validations/       # Shared Zod schemas (signup, signin, shapes)
│   ├── ui/                # Shared UI design tokens & components
│   ├── typescript-config/ # Centralized TypeScript configs across packages
│   └── eslint-config/     # Centralized ESLint rules
├── turbo.json             # Turborepo task pipeline configuration
├── pnpm-workspace.yaml    # Workspace package definitions
└── package.json           # Root package & monorepo orchestration scripts
```

---

## 📦 Applications & Packages

### `apps/web` (Frontend)
- **Framework**: Next.js 16 (App Router) + React 19.
- **Styling**: Tailwind CSS v4 with custom drafting grid (`draft-grid`) and graphite theme.
- **Canvas Engine**: Native HTML5 Canvas 2D with dedicated `canvasManager` and `initDraw` lifecycle.
- **Routes**:
  - `/`: Modern landing page with interactive collaborative live preview, features, and quick room launcher.
  - `/dashboard`: Authenticated workspace view showcasing current active room, live collaborator status, room link sharing, and recent boards.
  - `/canvas/[roomId]`: Interactive real-time whiteboard canvas with floating top-center shape selector.
  - `/signin` & `/signup`: Refined authentication screens.

### `apps/http` (REST API)
- **Framework**: Express 5 on Node.js.
- **Security**: JWT authentication (`jsonwebtoken`) and password hashing (`bcrypt`).
- **Endpoints**: User registration, login, room creation, and room shape history queries.

### `apps/ws` (WebSocket Server)
- **Engine**: Native `ws` library.
- **Responsibility**: Real-time room-based shape broadcasting, user presence tracking, and bidirectional canvas sync between active clients.

### `packages/db` (Database Layer)
- **ORM**: Prisma 7 with `@prisma/adapter-pg` connecting to PostgreSQL.
- Exports shared singleton DB client across backend microservices.

### `packages/validations` (Shared Schemas)
- Zod schemas validating user credentials and canvas shape payload structures.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `>= 24.0.0`
- **Package Manager**: `pnpm` (version `11.x` recommended)
- **PostgreSQL**: A running PostgreSQL instance for Prisma

### 1. Clone the Repository
```bash
git clone <repository-url>
cd excaliDraw
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables

Create `.env` files for the respective applications:

#### Root `.env`
```env
WS_PORT="8080"
```

#### `apps/web/.env`
```env
HTTP_URL="http://localhost:3001/api/room/getRooms"
NEXT_PUBLIC_HTTP_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="ws://localhost:8080"
```

#### `apps/http/.env`
```env
PORT=3001
JWT_SECRET="your-super-secret-jwt-key"
DATABASE_URL="postgresql://user:password@localhost:5432/excalidraw?schema=public"
```

#### `apps/ws/.env`
```env
PORT=8080
JWT_SECRET="your-super-secret-jwt-key"
DATABASE_URL="postgresql://user:password@localhost:5432/excalidraw?schema=public"
```

### 4. Database Setup
```bash
# Generate Prisma Client & apply migrations
pnpm --filter @repo/db exec prisma migrate dev
```

### 5. Run Development Servers
Start all applications concurrently via Turborepo:
```bash
pnpm dev
```

Or run individual apps:
```bash
# Start frontend only (http://localhost:3000)
pnpm --filter web dev

# Start HTTP backend only (http://localhost:3001)
pnpm --filter @repo/http dev

# Start WebSocket server only (ws://localhost:8080)
pnpm --filter @repo/ws dev
```

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts all applications in development mode with Turborepo |
| `pnpm build` | Compiles and builds all apps and packages for production |
| `pnpm lint` | Runs ESLint across all packages and applications |
| `pnpm format` | Formats TypeScript and Markdown files with Prettier |
| `pnpm check-types` | Type-checks all TypeScript projects across the monorepo |

---

## 📐 Canvas Tooling & Controls

The canvas page (`/canvas/[roomId]`) features a dedicated top-center toolbar:

| Tool | Icon | Action |
| :--- | :---: | :--- |
| **Rectangle** | `▢` | Click and drag to create vector rectangles |
| **Circle** | `◯` | Click and drag from center to stroke geometric circles |
| **Arrow** | `↗` | Draw directional vectors and flow connectors |
| **Pencil** | `✎` | Freehand drawing and rapid visual annotations |

---


