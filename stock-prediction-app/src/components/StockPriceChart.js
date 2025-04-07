import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockPriceChart = ({ data }) => {
  // Reformat date for X-axis
  const formattedData = data.map(row => ({
    Date: row['Date'],
    Close: parseFloat(row['Close Price']),
    High: parseFloat(row['High Price']),
    Low: parseFloat(row['Low Price']),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Close" stroke="#8884d8" />
        <Line type="monotone" dataKey="High" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Low" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockPriceChart;
