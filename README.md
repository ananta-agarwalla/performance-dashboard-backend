# Performance Dashboard Backend

A Node.js Express backend API for the performance dashboard application.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables

4. Start the development server:
   ```bash
   npm run dev
   ```

   Or start the production server:
   ```bash
   npm start
   ```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-restart on changes)
- `npm test` - Run tests

### API Endpoints

- `GET /` - Welcome message and server status
- `GET /health` - Health check endpoint
- `GET /api` - API information

### Project Structure

```
performance-dashboard-backend/
├── server.js          # Main server file
├── package.json       # Project dependencies and scripts
├── .env               # Environment variables
└── README.md          # This file
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
# Add other environment variables as needed
```

### Features

- Express.js web framework
- CORS enabled for cross-origin requests
- JSON parsing middleware
- Error handling middleware
- Health check endpoint
- Environment variable support with dotenv
- Development server with nodemon

### Next Steps

You can extend this basic setup by adding:
- Database integration (MongoDB, PostgreSQL, etc.)
- Authentication middleware
- API routes for your performance dashboard
- Validation middleware
- Logging
- Tests

## License

ISC
