import React, { useState, useEffect } from 'react';
import CsvDataLoader from './components/CsvDataLoader';
import StockPriceChart from './components/StockPriceChart';
import StockVolumeChart from './components/StockVolumeChart';
import StockTurnoverChart from './components/StockTurnoverChart';

import './App.css';

const stocks = ['TCS', 'TATAMOTORS', 'SUNPHARMA', 'RELIANCE', 'ITC', 'INFY', 'ICICIBANK', 'HINDUNILVR', 'HDFCBANK', 'ADANIPOWER'];

const insights = [
  "Global markets show mixed trends amid economic recovery hopes.",
  "Tech sector continues to outperform, driven by AI and cloud computing.",
  "Oil prices stabilize as OPEC+ agrees on production cuts.",
  "Cryptocurrency market experiences high volatility; experts urge caution.",
  "Emerging markets attract investors seeking higher yields."
];

function StockPredictionApp() {
  const [selectedStock, setSelectedStock] = useState('ITC'); // Default stock
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [csvData, setCsvData] = useState([]); // To hold CSV data for charts
  const [darkMode, setDarkMode] = useState(false); // For dark mode toggle

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchStockPrediction(selectedStock);   // triggered based on user selection to call backend API
    }
  }, [selectedStock]);

  const fetchStockPrediction = (stockSymbol) => {
    setApiLoading(true);  // Start loading for API call

    fetch(`http://localhost:5001/get_stock_prediction?stock_symbol=${stockSymbol}`)
      .then(response => response.json())
      .then(data => {
        setApiLoading(false);  // Stop loading after API response
        if (data.length === 0) {
          setError('No data found for this stock symbol.');
          setPredictions([]);
        } else {
          setError('');
          setPredictions(data);
        }
      })
      .catch(err => {
        setApiLoading(false);  // Stop loading on error
        console.error('Error fetching predictions:', err);
        setError('Error fetching predictions. Please try again later.');
      });
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  if (loading) {
    return (
      <div className="loader">
        <svg className="loader-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" />
        </svg>
        <span>Initializing StockPulse...</span>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} container`}>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">StockPulse: Market Predictor</h1>
        
        {/* Dark mode toggle */}
        <div className="mb-4">
          <label className="mr-4">Dark Mode:</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        {/* Market Summary */}
        <div className="market-summary">
          <div className="ticker-tape">
            <div className="ticker-item">SENSEX <span className="up">▲ 1.2%</span></div>
            <div className="ticker-item">NIFTY <span className="down">▼ 0.8%</span></div>
            <div className="ticker-item">USD/INR <span className="up">▲ 0.3%</span></div>
          </div>
        </div>

        {/* Stock Selection Dropdown */}
        <div className="stock-selector mb-4">
          <label htmlFor="stock-select" className="mr-4">Select Stock: </label>
          <select
            id="stock-select"
            className="p-2 bg-gray-700 text-white"
            value={selectedStock}
            onChange={handleStockChange}
          >
            <option value="">Select a stock</option>
            {stocks.map(stock => (
              <option key={stock} value={stock}>
                {stock}
              </option>
            ))}
          </select>
        </div>

        {/* Load CSV data based on selected stock */}
        <CsvDataLoader stock={selectedStock} setData={setCsvData} />

        {/* Price, Volume, and Turnover Charts */}
        <div className="my-8">
          {csvData.length > 0 && <StockPriceChart data={csvData} />}
        </div>
        <div className="my-8">
          {csvData.length > 0 && <StockVolumeChart data={csvData} />}
        </div>
        <div className="my-8">
          {csvData.length > 0 && <StockTurnoverChart data={csvData} />}
        </div>

        {/* Stock Prediction Data */}
        {apiLoading ? (
          <p>Loading prediction...</p>
        ) : (
          <div id="prediction-container">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
              {predictions.map((prediction, index) => (
                <li key={index}>
                  Date: {new Date(prediction.prediction_date).toLocaleDateString()}, 
                  Price: {prediction.predicted_price}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Market Insights */}
        <div className="market-insights mt-8">
          <h2>Market Insights</h2>
          <ul id="insights-list">
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StockPredictionApp;
