import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StockPredictionApp from './App';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const loader = document.getElementById('loader');
  const stockBg = document.getElementById('stock-bg');

  // Simulating a loading delay for dramatic effect
  setTimeout(() => {
    ReactDOM.render(
      <React.StrictMode>
        <StockPredictionApp />
      </React.StrictMode>,
      root,
      () => {
        if (loader) {
          loader.style.opacity = '0';
          loader.style.transition = 'opacity 0.5s ease-out';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }
        root.style.display = 'block';
        
        // Add market insights dynamically
        addMarketInsights();
      }
    );
  }, 2000); // 2 second delay

  // Add parallax effect to the background
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    stockBg.style.transform = `translate(${moveX}px, ${moveY}px)`;  // Corrected the string interpolation
  });
});

function addMarketInsights() {
  const insights = [
    "Global markets show mixed trends amid economic recovery hopes.",
    "Tech sector continues to outperform, driven by AI and cloud computing.",
    "Oil prices stabilize as OPEC+ agrees on production cuts.",
    "Cryptocurrency market experiences high volatility; experts urge caution.",
    "Emerging markets attract investors seeking higher yields."
  ];
  
  const insightsList = document.getElementById('insights-list');
  if (insightsList) {
    insights.forEach((insight) => {
      const listItem = document.createElement('li');
      listItem.textContent = insight;
      insightsList.appendChild(listItem);
    });
  }
}
