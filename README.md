# Comics Studies Lab

Interactive web experience and content hub for the Comics Studies Lab at IIT Jodhpur. The project is split into a React + Vite frontend and a Node.js + Express + MongoDB backend that powers authentication and media uploads.

## Features

- Multi-page public site that highlights origin, activity, visibility, and creativity initiatives.
- Authentication with JWT, password hashing, and role-based redirects (admin dashboard vs. community archive).
- Admin media dashboard supporting description-rich uploads (images, video, audio, PDFs, links) with previews and deletion.
- Community archive view for authenticated users with download/open helpers and friendly file-size formatting.
- Animated visual identity via reusable background and heading components plus lightbox galleries.

## High-Level Architecture

```
frontend/ (Vite + React)
	src/
		App.jsx, pages 1-7, adminDashboard, postsPage, shared components, assets

backend/ (Express API)
	server.js              -> config, MongoDB connection, mounts routes
	routes/auth.js         -> signup/signin endpoints
	routes/uploads.js      -> JWT auth, multer uploads, admin CRUD
	models/User.js         -> user schema with roles
	models/Upload.js       -> upload metadata schema
	uploads/               -> stored files (gitignored)
```

Frontend calls the backend using the `VITE_API_URL` environment variable (defaults to `http://localhost:5000`). Auth tokens and profile data are cached in `localStorage` and attached to upload requests.

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+
- MongoDB instance (Atlas cluster or local)

## Environment Variables

Create `backend/.env` with values similar to:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/comics-lab
JWT_SECRET=change-me
PORT=5000
```

Create `frontend/.env` or add to the root `.env` consumed by Vite:

```
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` should point to wherever the backend runs (include protocol and port).

## Getting Started

Install dependencies for both workspaces:

```bash
cd backend
npm install
cd ..
npm install
```

### Run the backend (development)

```bash
cd backend
npm run dev
```

This launches `nodemon` on `server.js`. The server validates `MONGODB_URI` and `JWT_SECRET` on startup and serves uploaded files from `backend/uploads/`.

### Run the frontend (development)

```bash
npm run dev
```

Vite starts on `http://localhost:5173` by default. It proxies API calls directly to the URL defined by `VITE_API_URL`.

### Production builds

```bash
npm run build
```

Build output appears in `dist/`. Serve it with any static host or `npm run preview` for a local preview.

## Linting

Run ESLint (frontend scope) to catch issues:

```bash
npm run lint
```

## Key Workflows

1. **Sign up / Sign in** — `/page7` collects user details and calls `/api/auth/signup` or `/api/auth/signin`. Successful logins store a JWT and redirect based on role.
2. **Admin uploads** — `/dashboard` allows admins to submit descriptions, optional external links, and a file. The backend ensures the description stays under 1000 words, validates URLs, saves files to disk, and records metadata in MongoDB.
3. **Community archive** — `/posts` fetches all uploads for logged-in non-admin users, providing inline previews plus open/download actions.

## Known Gaps

- The `/api/reviews` endpoint declared in `backend/server.js` references a `Review` model that is not implemented yet. Until the model is added, the route will throw at runtime.
- The “Leave Review” modal on `/page7` currently displays a client-side alert and does not post to the backend.

Feel free to open issues or submit PRs with improvements, especially around review handling, responsive layout tweaks, accessibility, and unit testing.

