const express = require('express');
const cassandra = require('cassandra-driver');
const cors = require('cors');

// Create an Express app
const app = express();
app.use(cors());  // Enable CORS

// Connect to Cassandra
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'], // Make sure the IP address and port match your Docker setup
    localDataCenter: 'datacenter1',  // Update with your actual data center
    keyspace: 'stock_data',  // Keyspace name
    protocolOptions: { port: 9043 }  // Corrected port used in Docker
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to Cassandra', err);
        process.exit(1);
    } else {
        console.log('Connected to Cassandra');
    }
});

// Route to get stock predictions
app.get('/get_stock_prediction', (req, res) => {
    const stock_symbol = req.query.stock_symbol;
    
    if (!stock_symbol) {
        return res.status(400).json({ error: 'stock_symbol is required' });
    }

    const query = 'SELECT prediction_date, predicted_price FROM stock_predictions WHERE stock_symbol = ? ALLOW FILTERING';
    
    client.execute(query, [stock_symbol], { prepare: true }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: `An error occurred: ${err.message}` });
        }
        
        const rows = result.rows;
        const predictions = rows.map(row => ({
            prediction_date: row.prediction_date.toISOString(),
            predicted_price: row.predicted_price
        }));

        res.json(predictions);
    });
});

// Start the server
const port = 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
