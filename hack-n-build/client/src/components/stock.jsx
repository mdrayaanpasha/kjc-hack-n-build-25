/*
TO DO:

use this emoji for done tasks: ✅
- display the stock data in a grid layout ✅
- display the sentiment analysis of the stock data✅
- display the reddit posts for each company✅
- display the stock data in a chart ✅

*/


import Navbar from "./nav";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; 



import { Line } from "react-chartjs-2";





import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler} from "chart.js";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler);

export default function Stock() {

  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  const ticker = new URLSearchParams(location.search).get("ticker");

  useEffect(() => {

    const fetchStockData = async () => {

      if (!ticker) return;


      try {

        const { data } = await axios.get(`https://kjc-hack-n-build-25.vercel.app/stock/${ticker}`);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setStockData(data);

      } catch (err) {

        setError("Failed to load stock data");
        console.error("Error fetching stock data", err);

      } finally {

        setLoading(false);
      }
    };

    fetchStockData();
  }, [ticker]); 

  const chartData = useMemo(() => ({

    labels: stockData?.historical.map(item => 
      new Date(item.date).toLocaleDateString()

    ) || [],
    datasets: [
      {
        label: "Closing Price",
        data: stockData?.historical.map(item => item.close) || [],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  }), [stockData]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "#f3f4f6" },
        ticks: { color: "#6b7280" },
      },
    },
  }), []);

  const renderSentimentAnalysis = useMemo(() => {

    if (!stockData?.sentimentAnalysis) return null;
    
    return stockData.sentimentAnalysis.split("\n").map((line, index) => {

      const isSummary = line.startsWith("###");


      const isMessage = line.startsWith("##");
      
      return (
        <p
        
          key={index}
          className={`text-sm ${
            isSummary ? "font-semibold text-blue-600 mt-4" :
            isMessage ? "text-gray-700 italic" : "text-gray-600"
          }`}
        >
          {line.replace(/#/g, "").trim()}
        </p>
      );
    });
  }, [stockData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar></Navbar>
      <div className="container mx-auto p-4 lg:p-8 mt-15">
        
        <div className="bg-white rounded-xl shadow-2xl p-6 transition-transform hover:scale-[1.02]">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {stockData?.current.companyName} ({stockData?.current.symbol})
          </h1>
      <div className="flex justify-center items-center gap-4">
        <div className="text-2xl font-semibold text-blue-600">
          ${stockData?.current.price?.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">
          Market Cap: ${stockData?.current.marketCap?.toLocaleString()}
        </div>
  </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-2xl p-6 transition-transform hover:scale-[1.02]">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Price History
            </h3>
            <div className="h-96"> 
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
  
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-2xl p-6 transition-transform hover:scale-[1.02]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Price Predictions
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Tomorrow:</span>
                  <span className="text-lg font-semibold text-green-600">
                    ${stockData?.prediction.tomorrow?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Day After Tomorrow:</span>
                  <span className="text-lg font-semibold text-green-600">
                    ${stockData?.prediction.dayAfterTomorrow?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
  
    <div className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-600 transition-transform hover:scale-[1.02]">
    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
          Market Sentiment
        </h3>
              <p className="text-lg text-gray-700 leading-relaxed bg-white p-4 rounded-lg shadow-sm">
                {renderSentimentAnalysis}
              </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};


