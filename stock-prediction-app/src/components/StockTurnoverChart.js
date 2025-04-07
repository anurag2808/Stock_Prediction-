import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockTurnoverChart = ({ data }) => {
  const formattedData = data.map(row => ({
    Date: row['Date'],
    Turnover: parseFloat(row['Turnover ₹']),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Turnover" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockTurnoverChart;
