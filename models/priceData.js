import mongoose from 'mongoose';

// Define the schema for storing commodity price data
const priceDataSchema = new mongoose.Schema(
  {
    commodity: { type: String, required: true }, // The commodity (e.g., GOLD, SILVER, etc.)
    location: { type: String, required: true },  // The location for which the price is relevant
    month: { type: String, required: true },     // The month for which the price is relevant (e.g., January, February, etc.)
    price: {
      open: { type: Number, required: true },    // Opening price for the commodity
      high: { type: Number, required: true },    // High price for the commodity
      low: { type: Number, required: true },     // Low price for the commodity
      close: { type: Number, required: true },   // Closing price for the commodity
    },
    fetchedAt: {
      type: Date,
      default: Date.now,  // Automatically sets the current timestamp when the data is saved
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create a model based on the schema
const PriceData = mongoose.model('PriceData', priceDataSchema);

// Export the model for use in other files
export default PriceData;

