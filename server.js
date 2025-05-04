import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import predictionRoutes from './routes/predictionRoutes.js';
import morgan from 'morgan'; // Optional: for logging requests

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(morgan('dev')); // Logs incoming requests (Optional)
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api', predictionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
// Middleware
// Middleware
console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);

  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
  next();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});