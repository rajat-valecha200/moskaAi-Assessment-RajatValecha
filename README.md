# moskaAi-Assessment-RajatValecha


# Store Dashboard

## Overview

This project is a real-time dashboard for tracking customer traffic in a store. It uses Kafka for message streaming, Node.js and Express.js for the backend, and React with Next.js for the frontend. 
The dashboard displays live customer traffic data and historical hourly data.


## Setup

### 1. **Kafka Setup**

1. **Clone the Repository:**
   ``` bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Start Kafka and Zookeeper:**
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **Create Kafka Topic:**
   ```bash
   docker exec -it store-dashboard_kafka_1 bash
   kafka-topics --create --topic store-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
   ```

### 2. **Backend Setup**

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the Backend:**
   ```bash
   tsc
   node dist/server.js
   ```

   The backend will run on `http://localhost:3001`.

### 3. **Frontend Setup**

1. **Install Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the Frontend:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

### 4. **Send Test Messages to Kafka**

1. **Access Kafka Container:**
   ```bash
   docker exec -it store-dashboard_kafka_1 bash
   ```

2. **Send Messages:**
   ```bash
   kafka-console-producer --topic store-topic --bootstrap-server localhost:9092
   ```

   Example messages:
   ```json
   {"store_id": "10", "customers_in": 2, "customers_out": 3, "time_stamp": "10.12.03"}
   {"store_id": "10", "customers_in": 0, "customers_out": 1, "time_stamp": "10.13.15"}
   {"store_id": "10", "customers_in": 2, "customers_out": 0, "time_stamp": "10.15.12"}
   ```

## Features

- **Live Data**: Real-time customer traffic displayed in a table.
- **History Data**: Hourly customer traffic for the past 24 hours, summarized in a table.


## Contact

For questions, contact Rajat Valecha(mailto:rajat.valecha200@gmail.com).


![image](https://github.com/user-attachments/assets/eb564369-29d1-4c79-8e96-41651a11611f)
