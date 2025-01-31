

/*
minimalist thing with top left having the name and right having the btn.

use this emo for done tasks: ✅

- create a navbar component ✅
- add a logo to the navbar ✅
- add a button to the navbar ✅
*/
const Navbar = () => {
  return (

<nav className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-lg fixed top-0 w-full z-50 cursor-pointer border border-white/20 shadow-md" onClick={e => window.location.href = "./"}>
  
  <span className="text-2xl font-bold text-gray-900">Quantiva</span>




  <a href="./try-now" className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 flex items-center space-x-2 transition">
    <span>Try Now</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </a>
</nav>

  );
};

export default Navbar;
