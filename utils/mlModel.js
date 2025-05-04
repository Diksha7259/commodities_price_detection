import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const RAPID_API_KEY = process.env.RAPID_API_KEY;

const commoditySymbolMap = {
  gold: 'GOLD',
  silver: 'SILVER',
  brentoil: 'BRENTOIL',
  crudeoil: 'CRUDEOIL',
  platinum: 'PLATINUM',
};

export const getRealTimePrice = async (commodity) => {
  const symbol = commoditySymbolMap[commodity.toLowerCase()];

  if (!symbol) {
    console.error(`Unsupported commodity: ${commodity}`);
    return null;
  }

  const date = new Date().toISOString().split('T')[0];

  try {
    const response = await axios.get(
      `https://commodity-rates-api.p.rapidapi.com/open-high-low-close/${date}`,
      {
        params: {
          base: 'USD',
          symbols: symbol,
        },
        headers: {
          'x-rapidapi-host': 'commodity-rates-api.p.rapidapi.com',
          'x-rapidapi-key': RAPID_API_KEY,
        },
      }
    );

    const priceData = response.data?.data?.[symbol];
    return priceData?.close || null;
  } catch (error) {
    console.error('Error fetching real-time price:', error);
    return null;
  }
};