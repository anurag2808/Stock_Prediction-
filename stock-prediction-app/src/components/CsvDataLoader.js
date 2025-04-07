import React, { useEffect } from 'react';

const CsvDataLoader = ({ stock, setData }) => {
  useEffect(() => {
    const loadCsv = async () => {
      const response = await fetch(`/${stock}.csv`); // Dynamically load CSV file based on selected stock
      const csvText = await response.text();

      const csvLines = csvText.split('\n');
      const headers = csvLines[0].split(',');

      const parsedData = csvLines.slice(1).map(line => {
        const values = line.split(',');
        const entry = headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index]?.trim();
          return obj;
        }, {});
        return entry;
      });

      setData(parsedData);
    };

    if (stock) {
      loadCsv();
    }
  }, [stock, setData]);

  return null;
};

export default CsvDataLoader;
