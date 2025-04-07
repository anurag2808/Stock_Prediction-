from cassandra.cluster import Cluster
from datetime import datetime

# Connect to Cassandra
cluster = Cluster(['127.0.0.1'],port=9043)  # If Docker is on a different machine, use its IP
session = cluster.connect('stock_data')

# Insert predictions for a specific stock
def insert_stock_prediction(stock_symbol, prediction_date, predicted_price):
    query = """
    INSERT INTO stock_predictions (stock_symbol, prediction_date, predicted_price)
    VALUES (%s, %s, %s)
    """
    session.execute(query, (stock_symbol, prediction_date, predicted_price))

# Example usage for inserting data for 10 stocks with manual price input
stocks = ['TCS', 'TATAMOTORS', 'SUNPHARMA', 'RELIANCE', 'ITC', 'INFY', 'ICICIBANK', 'HINDUNILVR', 'HDFCBANK', 'ADANIPOWER']
for stock in stocks:
    # Prompt user for predicted price
    predicted_price = float(input(f"Enter the predicted price for {stock}: "))
    prediction_date = datetime.now()
    insert_stock_prediction(stock, prediction_date, predicted_price)

print("Stock predictions have been successfully inserted!")