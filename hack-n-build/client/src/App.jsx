import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/Home';
import Stock from './components/stock';
import StockComparison from './components/compare';
import TickerForm from './components/tickerSelect';
import CompareForm from './components/compareForm';
import TryNow from './components/trynow';

export default function App() {
  return (

    <Router>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />

        <Route path="/stock-compare" element={<StockComparison/>} />

        <Route path="/ticker-select"  element={<TickerForm/>}/>

        <Route path="/compare-form"  element={<CompareForm/>}/>
        <Route path="/try-now"  element={<TryNow/>}/>
      
      </Routes>

    </Router>
  );
}
