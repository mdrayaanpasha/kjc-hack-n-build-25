import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const CompareForm = () => {

  const [tickers, setTickers] = useState([]);
  const [selectedTicker1, setSelectedTicker1] = useState("");
  const [selectedTicker2, setSelectedTicker2] = useState("");
  const navigate = useNavigate();




  useEffect(() => {
    setTickers([
      "AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NFLX", "NVDA", "META",
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTicker1 && selectedTicker2 && selectedTicker1 !== selectedTicker2) {
      navigate(`/stock-compare?brand-1=${selectedTicker1}&brand-2=${selectedTicker2}`);
    } else {
      alert("Please select two different brands.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">

      <div className="bg-white p-6 rounded-xl shadow-sm max-w-lg w-full border border-black">

        <h2 className="text-2xl font-bold text-black mb-4">Compare Two Brands</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label htmlFor="ticker1" className="block text-sm font-medium text-black">
              Select First Brand
            </label>

            <select
              id="ticker1"
              name="ticker1"
              value={selectedTicker1}
              onChange={(e) => setSelectedTicker1(e.target.value)}
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



          <div className="mb-4">

<label htmlFor="ticker2" className="block text-sm font-medium text-black">Select Second Brand</label>

     <select
     id="ticker2"
     name="ticker2"
     value={selectedTicker2}
              onChange={(e) => setSelectedTicker2(e.target.value)}
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-700"
          >
            Compare Brands
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompareForm;
