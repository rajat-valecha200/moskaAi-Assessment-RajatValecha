"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_node_1 = require("kafka-node");
const client = new kafka_node_1.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka_node_1.Producer(client);
// adding the sample id from given sample data
const storeId = 10;
// starting producer
producer.on('ready', () => {
    console.log('Producer is ready to generate dummy data...');
    //Generating dummy data in every 5sec
    setInterval(() => {
        const customerInCount = Math.floor(Math.random() * 5);
        const customerOutCount = Math.floor(Math.random() * 5);
        const timeStamp = new Date().toISOString();
        // creating payload with dummy entries
        const message = JSON.stringify({
            store_id: storeId,
            customers_in: customerInCount,
            customers_out: customerOutCount,
            time_stamp: timeStamp
        });
        const payloads = [{ topic: 'customer-data', messages: message }];
        // sending payload
        producer.send(payloads, (err, data) => {
            if (err) {
                console.log('Error occurred while sending to kafka :', err);
            }
            else {
                console.log('Data sent to kafka successfully...', data);
            }
        });
    }, 5000);
});
producer.on('error', (err) => {
    console.error("Error Occurred in Producer:", err);
});
