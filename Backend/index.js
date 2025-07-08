// server/index.js or server/server.js

import express from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import db from './config/db.js';
// import errorHandler from './src/middleware/errorHandler.js'; // optional
import cors from 'cors'; // optional but recommended
import errorHandler from "./middleware/errorHandlingMiddleware.js";



dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // allow cross-origin requests (e.g. from frontend)
app.use(express.json()); // parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // handles /register, /login











// Example protected route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (optional)
// app.use(errorHandler);
app.use(errorHandler);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
