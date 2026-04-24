# Task Manager Application

A full-stack task management application built with React (frontend) and Express/PostgreSQL (backend).

## Features

- User authentication (signup/login) with JWT tokens
- Create, read, update, and delete tasks
- Task status toggle (PENDING/COMPLETED)
- Secure password hashing with bcrypt
- Protected API routes with JWT middleware
- Responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- Tailwind CSS v4 for styling
- Vite for build tooling

### Backend
- Express.js
- PostgreSQL with Sequelize ORM
- JWT for authentication
- bcrypt for password hashing
- Helmet for security headers
- Express Rate Limit for brute force protection

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or cloud like Neon)

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   - `PORT`: Server port (default: 5000)
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_TOKEN`: Secret key for JWT (min 32 characters)
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs

5. Start the server:
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   - `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /health | Health check | No |
| POST | /api/authenticate/signup | User registration | No |
| POST | /api/authenticate/login | User login | No |
| GET | /api/tasks | Get all user tasks | Yes |
| POST | /api/tasks | Create a task | Yes |
| GET | /api/tasks/:id | Get task by ID | Yes |
| PATCH | /api/tasks/:id | Update a task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication with 1-day expiration
- Helmet security headers
- CORS with configurable allowed origins
- Input sanitization to prevent XSS
- Protected routes with auth middleware

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Auth, validation, error handling
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # Express routes
│   │   ├── utils/           # Helper functions
│   │   └── app.js           # Express app setup
│   └── server.js            # Entry point
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios API client
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context (Auth)
│   │   ├── pages/           # Page components
│   │   └── main.jsx         # Entry point
│   └── index.html
└── README.md
```

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_TOKEN=your-super-secret-key-min-32-chars
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## License

ISC
