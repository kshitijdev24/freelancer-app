# freeLance. - Online Marketplace for Freelancers

A full-featured Fiverr clone built with Next.js, Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication**: JWT-based registration and login with role selection (Client vs Freelancer).
- **Gigs Marketplace**: Browse, search, and filter services by categories and price.
- **Service Management**: Freelancers can create, edit, and delete their service gigs.
- **Premium Design**: Modern, responsive UI with glassmorphism and smooth transitions.
- **Dashboards**: Dedicated dashboards for clients and freelancers to manage orders and services.
- **Real-time Chat**: Built-in support for Socket.io (ready for implementation).
- **Payments**: Stripe integration support (ready for implementation).

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, React Context API.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), TypeScript.
- **Security**: JWT, BcryptJS.
- **Tools**: Nodemon, ts-node, ESLint.

## 🏃‍♂️ Getting Started

### 1. Prerequisites
- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### 2. Setup Backend
```bash
cd server
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

## 📬 API Routes (Prefix: `/api`)

- `POST /auth/register` - Create a new account.
- `POST /auth/login` - Authenticate user.
- `GET /auth/me` - Get current user profile.
- `GET /gigs` - List all gigs with filters.
- `POST /gigs` - Create a new gig (Freelancer only).
- `GET /gigs/:id` - Get gig details.

## 📁 Project Structure

- `client/`: Next.js frontend application.
- `server/`: Express.js backend with TypeScript.
