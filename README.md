# Game Backlog Tracker

Game Backlog Tracker is a full-stack web app for organizing a personal video game backlog. The app helps users track what they are playing, what they have completed, what is still waiting in their backlog, and what games they may want to play next.

## Live Demo

[View the deployed app 🚀](https://game-backlog-tracker.netlify.app/)

## Preview

![Game Backlog Tracker Dashboard](./client/src/assets/readme/preview.jpg)

## Features

- Account-based signup and login flow
- Protected dashboard routes
- Sidebar account display with logout support
- Dashboard overview with game summary cards
- Status breakdown chart using Recharts
- Backlog preview section
- My Backlog page with status filtering and search
- Add Game flow using RAWG API search results
- User-specific game storage with Supabase
- Save and delete games per logged-in account
- Stats page with deeper backlog analytics
- Games by Platform chart
- Games by Genre chart
- Estimated backlog time summary using average playtime data
- Wishlist page
- Responsive dark glass-style UI built with Tailwind CSS

## Current Stats Page

The Stats page shows deeper insights than the main dashboard. Current stats include:

- Total estimated time to complete backlog games
- Average backlog game length
- Longest backlog game
- Shortest backlog game
- Game count by platform
- Game count by genre

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Recharts

### Backend

- Node.js
- Express
- JWT authentication
- bcryptjs for password hashing

### Database and APIs

- Supabase for user-specific game storage
- RAWG API for game data

### Deployment

- Frontend deployed on Netlify
- Backend deployed on Render
- Database hosted with Supabase

## Project Architecture

The app is built with a traditional frontend/backend structure.

```txt
Frontend React app
  ↓
Express backend API
  ↓
External services / database
```

For game search, the frontend does not call RAWG directly. Instead, the frontend sends a search request to the Express backend. The backend calls RAWG, cleans the response, and sends useful game data back to the frontend.

```txt
Frontend Add Game page
  ↓
Express backend route
  ↓
RAWG API
  ↓
Backend sends cleaned game data
  ↓
Frontend displays results
```

When a user saves a game, the final saved object combines public RAWG game data with user-specific tracking data.

```txt
RAWG data + user data = saved user game
```

Example user-specific fields:

- Status
- Selected platform
- Notes
- Date added
- Average playtime

Each saved game is connected to the logged-in user's account in Supabase.

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Create the frontend environment file

Inside the `client` folder, create a `.env` file:

```env
VITE_API_URL=http://localhost:5001
```

### 4. Start the frontend

```bash
npm run dev
```

### 5. Install backend dependencies

```bash
cd ../server
npm install
```

### 6. Create the backend environment file

Inside the `server` folder, create a `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
RAWG_API_KEY=your_rawg_api_key
CLIENT_URL=http://localhost:5173
```

### 7. Start the backend

```bash
npm start
```

## Current Status

The project is deployed as a full-stack MVP. The frontend is hosted on Netlify, the backend is hosted on Render, and user-specific game data is stored in Supabase.

Future improvements may include editing saved games, additional filters, improved recommendations, and more detailed backlog analytics.

## Repository Description

A full-stack game backlog tracker for organizing, filtering, and analyzing a personal video game collection.