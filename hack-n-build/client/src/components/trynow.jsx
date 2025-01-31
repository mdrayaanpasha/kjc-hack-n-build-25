/*
GOAL:

add this emoji once done: ✅

- add a nav✅
- add a background gradient ✅
- add a description to the features section✅


*/

import { useNavigate } from "react-router-dom";
import Navbar from "./nav";



const TryNow = () => {
  const navigate = useNavigate();

  const handleBrandInsightsClick = () => {
    navigate("/ticker-select");
  };

  const handleCompareBrandsClick = () => {
    navigate("/compare-form");
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gradient-to-r from-red-400 via-gray-300 to-blue-500 min-h-screen flex items-center justify-center">
  <div>
  <center>
    <h1 className="font-bold text-5xl text-white">What We Offer?</h1>
    <hr className="border-t-2 border-white/20 w-3/4 mx-auto my-8 rounded-full" />

    
      <p className="text-white font-semibold">get deep brand performance with mix of number and social media opinions.</p>
    </center>
  </div>
</div>

<h1 className="text-3xl font-bold text-gray-800 p-4">Our Features</h1>

    <div className="min-h-screen bg-white  mt-10">

     
      <div className="flex items-center justify-evenly gap-8">
        <div
  onClick={handleBrandInsightsClick}
  className="border border-gray-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer text-black h-50 w-100"
>
  <div className="flex items-center justify-center mb-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
      width="50px"
      height="50px"
      viewBox="0 0 50 50"
    >
      <path d="M8 2L8 6L4 6L4 48L15 48L15 39L19 39L19 48L30 48L30 6L26 6L26 2 Z M 10 10L12 10L12 12L10 12 Z M 14 10L16 10L16 12L14 12 Z M 18 10L20 10L20 12L18 12 Z M 22 10L24 10L24 12L22 12 Z M 32 14L32 18L34 18L34 20L32 20L32 22L34 22L34 24L32 24L32 26L34 26L34 28L32 28L32 30L34 30L34 32L32 32L32 34L34 34L34 36L32 36L32 38L34 38L34 40L32 40L32 42L34 42L34 44L32 44L32 48L46 48L46 14 Z M 10 15L12 15L12 19L10 19 Z M 14 15L16 15L16 19L14 19 Z M 18 15L20 15L20 19L18 19 Z M 22 15L24 15L24 19L22 19 Z M 36 18L38 18L38 20L36 20 Z M 40 18L42 18L42 20L40 20 Z M 10 21L12 21L12 25L10 25 Z M 14 21L16 21L16 25L14 25 Z M 18 21L20 21L20 25L18 25 Z M 22 21L24 21L24 25L22 25 Z M 36 22L38 22L38 24L36 24 Z M 40 22L42 22L42 24L40 24 Z M 36 26L38 26L38 28L36 28 Z M 40 26L42 26L42 28L40 28 Z M 10 27L12 27L12 31L10 31 Z M 14 27L16 27L16 31L14 31 Z M 18 27L20 27L20 31L18 31 Z M 22 27L24 27L24 31L22 31 Z M 36 30L38 30L38 32L36 32 Z M 40 30L42 30L42 32L40 32 Z M 10 33L12 33L12 37L10 37 Z M 14 33L16 33L16 37L14 37 Z M 18 33L20 33L20 37L18 37 Z M 22 33L24 33L24 37L22 37 Z M 36 34L38 34L38 36L36 36 Z M 40 34L42 34L42 36L40 36 Z M 36 38L38 38L38 40L36 40 Z M 40 38L42 38L42 40L40 40 Z M 10 39L12 39L12 44L10 44 Z M 22 39L24 39L24 44L22 44 Z M 36 42L38 42L38 44L36 44 Z M 40 42L42 42L42 44L40 44Z"/>
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-black text-center mb-2">
    Brand Insights
  </h3>
  <p className="text-black text-center">
    Dive into the story beyond the numbers.
  </p>
</div>

<div
  onClick={handleCompareBrandsClick}
  className="border border-gray-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer text-black h-50 w-100"
>
  <div className="flex items-center justify-center mb-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
      width="50px"
      height="50px"
      viewBox="0 0 32 32"
    >
      <path d="M8,19H4v-3h1v-1h2v1h1V19z M28,15h-1v-1h-2v1h-1v4h4V15z M27,22v1h3v6h-1v1h-2v-1H5v1H3v-1H2v-6h3 v-1H0v-2h12v2H7v1h7l1-7.08C11.609,15.434,9,12.526,9,9c0-3.866,3.134-7,7-7s7,3.134,7,7c0,3.526-2.609,6.434-6,6.92L18,23h7v-1h-5 v-2h12v2H27z M16,14c2.761,0,5-2.239,5-5s-2.239-5-5-5s-5,2.239-5,5S13.239,14,16,14z M20,9c0,2.209-1.791,4-4,4s-4-1.791-4-4 c0-2.209,1.791-4,4-4S20,6.791,20,9z M16.951,8.756l1.403-1.403l-0.707-0.707l-1.403,1.403C16.164,8.029,16.086,8,16,8 c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1s1-0.448,1-1C17,8.914,16.971,8.836,16.951,8.756z"/>
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-black text-center mb-2">
    Compare Brands
  </h3>
  <p className="text-black text-center">
    select two brands and compare them side-by-side.
  </p>
</div>

        
      </div>
    </div>
    </>
  );
};

export default TryNow;
