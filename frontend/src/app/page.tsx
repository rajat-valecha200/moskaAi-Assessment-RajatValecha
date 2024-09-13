"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';

interface LiveData {
  store_id: string;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

interface HistoryData {
  hour: string;
  customers_in: number;
  customers_out: number;
}

const Dashboard = () => {
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const [historyData, setHistoryData] = useState<{ [key: string]: HistoryData[] }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/live');
        setLiveData(response.data);
      } catch (error) {
        setError("Error fetching live data");
      }
    };

    const fetchHistoryData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/hourly');
        setHistoryData(response.data);
      } catch (error) {
        setError("Error fetching history data");
      }
    };

    fetchLiveData();
    fetchHistoryData();

    const interval = setInterval(fetchLiveData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString()
  };

  return (
    <div className={styles.container}>
      <h1>Customer in/out monitoring data</h1>
      <p>Coding Assessment for Full Stack Developers from mokSa.ai</p>
      
      {error && <p className={styles.error}>{error}</p>}
      <h2 className={styles.heading}>Live Data</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Store ID</th>
            <th className={styles.th}>Customers In</th>
            <th className={styles.th}>Customers Out</th>
            <th className={styles.th}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {liveData.map((row, idx) => (
            <tr key={idx} className={styles.tr}>
              <td className={styles.td}>{row.store_id}</td>
              <td className={styles.td}>{row.customers_in}</td>
              <td className={styles.td}>{row.customers_out}</td>
              <td className={styles.td}>{formatTimestamp(row.time_stamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.heading}>History Data</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Hour</th>
            <th className={styles.th}>Customers In</th>
            <th className={styles.th}>Customers Out</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(historyData).map(([hour, entries], index) => (
            <tr key={index} className={styles.tr}>
              <td className={styles.td}>{hour}</td>
              <td className={styles.td}>{entries.reduce((sum, entry) => sum + entry.customers_in, 0)}</td>
              <td className={styles.td}>{entries.reduce((sum, entry) => sum + entry.customers_out, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Made by: Rajat Valecha</p>
    </div>
  );
};

export default Dashboard;
