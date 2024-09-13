import { KafkaClient, Consumer } from "kafka-node";

interface CustomerData {
    store_id:number;
    customers_in:number;
    customers_out:number;
    time_stamp:string;
}

const liveData: CustomerData[] = [];
const hourlyData: {[key:string]:CustomerData[]} = {};

const client = new KafkaClient({kafkaHost:'localhost:9092'});
const consumer = new Consumer(client, [{topic:'customer-data', partition:0}], {autoCommit:true});

consumer.on('message', (message) => {
    const data = JSON.parse(message.value.toString());
    
    // storing live records and removing top most element if more than 10 records found 
    if(liveData.length >= 10){
        liveData.shift();
    }
    liveData.push(data);

    // storing data hourly if hour not found added hour
    const hour = new Date(data.time_stamp).getHours();
    if(!hourlyData[hour]){
        hourlyData[hour] = [];
    }
    hourlyData[hour].push(data);
});

consumer.on('error',(err)=>{
    console.log("Error occurred in consumer",err);
});

export {liveData, hourlyData};
