import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockVolumeChart = ({ data }) => {
  const formattedData = data.map(row => ({
    Date: row['Date'],
    Volume: parseFloat(row['Total Traded Quantity']),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Volume" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StockVolumeChart;
