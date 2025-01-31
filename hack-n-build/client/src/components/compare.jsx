

/*
GOALS:
use this emo for done tasks: ✅
- make a request to the server to get stock data for two companies  ✅
- display the stock data in a grid layout ✅
- display the sentiment analysis of the stock data✅
- display the reddit posts for each company✅


*/

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./nav";
const StockComparison = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(useLocation().search);
  const brand1 = query.get("brand-1");
  const brand2 = query.get("brand-2");

  useEffect(() => {
    if (brand1 && brand2) {
      setLoading(true);
      axios.get(`http://localhost:3000/compare-stocks?symbol1=${brand1}&symbol2=${brand2}`)
      .then((response) => {
          setStockData(response.data);
          setLoading(false);
      })
      .catch((error) => {
          console.error("there was an error", error);
          setError("failed to fetch.");
          setLoading(false);
      });
    }
  }, [brand1, brand2]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
  <div className="w-12 h-12 border-4 border-t-4 border-gray-500 border-solid rounded-full animate-spin"></div>
</div>

    );
  }
  

  if (error) {
    return <div>{error}</div>;
  }

  if (!stockData) {
    return <div>No data available.</div>;
  }

  const { stock1, stock2, redditPosts1, redditPosts2, sentimentAnalysis } = stockData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 lg:p-8 mt-15">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {stock1.companyName} vs {stock2.companyName}
        </h1>
  
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Stock 1 Card */}
          <div className="bg-white rounded-xl shadow-2xl p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{stock1.companyName}<span className="text-gray-500 ml-2">({stock1.symbol})</span></h2>
            </div>
              <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Current Price</span>
                      <span className="text-xl font-semibold text-gray-800">${stock1.price}</span>
                    </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Market Cap</span>
                    <span className="text-xl font-semibold text-gray-800">${(stock1.marketCap / 1e9).toFixed(2)}B</span>
                </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg ${stock1.change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                      <span className="text-gray-600">24h Change</span>
                      <span className={`text-xl font-semibold ${stock1.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock1.change >= 0 ? '↗' : '↘'} {stock1.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
  
        
          <div className="bg-white rounded-xl shadow-2xl p-6 transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{stock2.companyName}<span className="text-gray-500 ml-2">({stock2.symbol})</span></h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Current Price</span>
                <span className="text-xl font-semibold text-gray-800">${stock2.price}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Market Cap</span>
                <span className="text-xl font-semibold text-gray-800">${(stock2.marketCap / 1e9).toFixed(2)}B</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg ${stock2.change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className="text-gray-600">24h Change</span>
                <span className={`text-xl font-semibold ${stock2.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock2.change >= 0 ? '↗' : '↘'} {stock2.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
  
     
        <div className="bg-indigo-50 rounded-xl p-6 mb-8 border-l-4 border-indigo-600">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Market Sentiment</h3>
          <p className="text-lg text-gray-700 leading-relaxed bg-white p-4 rounded-lg shadow-sm">
            {sentimentAnalysis}
          </p>
        </div>
  
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
         <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-1.93 0-2.097 1.309-3.251 1.309-.723 0-1.194-.498-1.194-1.21 0-1.755 2.504-4.117 5.11-4.117 2.607 0 5.112 2.479 5.112 5.123 0 6.234-7.04 10.419-10.621 10.419-3.581 0-10.62-4.185-10.62-10.419 0-2.644 2.506-5.123 5.112-5.123 2.607 0 5.11 2.362 5.11 4.117 0 .712-.471 1.21-1.194 1.21-1.154 0-1.321-1.309-3.251-1.309-1.465 0-2.657 1.186-2.657 2.645 0 4.479 5.567 7.843 8.646 7.843 3.078 0 8.646-3.364 8.646-7.843z"/>
       </svg>
              {stock1.companyName} Discussions
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
         {redditPosts1.map((post, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="text-gray-700">"{post}"</p>
                </div>
              ))}
            </div>
    </div>
          
  <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
       <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-1.93 0-2.097 1.309-3.251 1.309-.723 0-1.194-.498-1.194-1.21 0-1.755 2.504-4.117 5.11-4.117 2.607 0 5.112 2.479 5.112 5.123 0 6.234-7.04 10.419-10.621 10.419-3.581 0-10.62-4.185-10.62-10.419 0-2.644 2.506-5.123 5.112-5.123 2.607 0 5.11 2.362 5.11 4.117 0 .712-.471 1.21-1.194 1.21-1.154 0-1.321-1.309-3.251-1.309-1.465 0-2.657 1.186-2.657 2.645 0 4.479 5.567 7.843 8.646 7.843 3.078 0 8.646-3.364 8.646-7.843z"/>
              </svg>
              {stock2.companyName} Discussions
            </h3>
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {redditPosts2.map((post, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="text-gray-700">"{post}"</p>
      </div>
              ))}
            </div>
          </div>
     </div>
      </div>
    </div>
  );
};

export default StockComparison;
