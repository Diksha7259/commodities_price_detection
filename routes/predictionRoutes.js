import express from 'express';
import { getPrediction } from '../controllers/predictionController.js';

const router = express.Router();

// POST route to fetch commodity price prediction
router.post('/predict', getPrediction);

export default router;

