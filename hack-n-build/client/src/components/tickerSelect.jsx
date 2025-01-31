/*
GOAL:

add this emoji once done: ✅
- add a nav✅
- add select with option of comp tifkers.✅
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "./nav";

const TickerForm = () => {
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    setTickers(["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NFLX", "NVDA", "META", "AMD", "INTC"]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTicker) {
      navigate(`/stock?ticker=${selectedTicker}`);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="bg-white p-6 rounded-xl shadow-sm max-w-lg w-full border border-black">
        <h2 className="text-2xl font-bold text-black mb-4">Select a Ticker</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ticker" className="block text-sm font-medium text-black">Stock Ticker</label>
          <select
              id="ticker"
              name="ticker"
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          >
          <option value="">Select a ticker...</option>
          {tickers.map((ticker) => (
            <option key={ticker} value={ticker}>
            {ticker}
            </option>
          ))}
          </select>
        </div>
      <button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-700">
      Go to Stock Info
      </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default TickerForm;
