import express from 'express';
import cors from 'cors';
import { liveData, hourlyData } from './kafkaConsumer';

const app = express();
app.use(cors());
const PORT = 3001;

// end point to get live data from kafka
app.get('/api/live',(req,res)=>{
    res.json(liveData);
});

// endpoint to get hourly data from kafka
app.get('/api/hourly',(req,res)=>{
    res.json(hourlyData);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port 172.0.0.1:${PORT}`);
});
