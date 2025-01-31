/*
GOALS:
use this emo for done tasks: ✅

- fetch data from stocks endpoint ✅
- display stock data in a grid layout ✅
- display the sentiment analysis of the stock data ✅
- display the reddit posts for each company ✅
- display the stock data in a grid layout ✅
- display the sentiment analysis of the stock data ✅
- display the reddit posts for each company ✅


*/

import { useEffect, useState } from 'react';
import Navbar from './nav';





export default function StockDashboard() {


  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/stocks/summary')

      .then(response => response.json())
      .then(data => {
        setStocks(data.summary);
        setLoading(false);
      })

      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });


  }, []);

  const formatMarketCap = (value) => {

    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    return value;

  };

  const getChangeColor = (change) => {

    return change.includes('-') ? 'text-red-500' : 'text-green-500';
    
  };

  if (loading) {
    return <div className="p-8 text-center">Loading stock data...</div>;
  
  }

  return (

    <>

    <Navbar></Navbar>
    <div className='bg-gradient-to-r from-red-400 via-gray-300 to-blue-500 min-h-screen flex items-center justify-center'>
      <div>
      <h1 className='font-bold text-5xl text-white'>Retail Trading, Rewired</h1>
      <hr className="border-t-2 border-white/20 w-3/4 mx-auto my-8 rounded-full" />

      <center><p classname='text-white font-semibold' >Beyond your everyday dashboards.</p>
      
      </center>
      </div>
    </div>
    <div className="min-h-screen  p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Stock Market Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
      <h2 className="text-xl font-bold text-gray-800">{stock.companyName}</h2>
      <p className="text-gray-500">{stock.symbol}</p>
      </div>
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
      {stock.symbol}
      </span>
      </div>

            <div className="mb-4">
        <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-800">${stock.price.toFixed(2)}</span>
                <span className={`${getChangeColor(stock.change)} font-semibold`}>{stock.change}</span>
            </div>
              <p className="text-gray-600 text-sm">
                Market Cap: {formatMarketCap(stock.marketCap)}
              </p>
            </div>

            <div className="border-t pt-4">
       <h3 className="text-sm font-semibold text-gray-700 mb-2">Investor Sentiment</h3>
              <p className="text-sm text-gray-600 line-clamp-4">
            {stock.redditSentiment.split('\n\n')[0]}
        </p>       
            </div>
          </div>
        ))}

        
      </div>
    </div>
    </>
  );
}