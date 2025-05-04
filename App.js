import React, { useState } from 'react';
import Form from './components/Form';
import ResultCard from './components/ResultCard';
import axios from 'axios';

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    console.log('Form Data:', formData); 

    try {
      const response = await axios.post('http://localhost:5000/api/predict', formData);
      setResult(response.data);
    } catch (err) {
      console.error('Error fetching prediction:', err);
      setError('Error predicting price. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Commodity Price Predictor</h1>
      <Form onSubmit={handleSubmit} />
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {loading ? (
        <div className="text-blue-500 mt-4">Loading...</div>
      ) : (
        result && <ResultCard result={result} />
      )}
    </div>
  );
};

export default App;