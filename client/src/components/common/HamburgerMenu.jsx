
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcherBtn';


const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
    <div className='flex'>
    <div className='p-3'>
      <ThemeSwitcher />
    </div>
      
      <button className="navbar-burger flex items-center text-accent p-3" onClick={toggleMenu}>
        <svg className="block h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

    </div>
      

      {isOpen && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-background opacity-25" onClick={toggleMenu}></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-background border-r-2 border-accent shadow-md overflow-y-auto">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold " href="#">
              <img src='/public/chereta_logo.svg' className=' h-9 w-9'/>
              </a>
              <button className="bg-background" onClick={toggleMenu}>
                <svg className="h-6 w-6 cursor-pointer hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <a className="block p-4 text-sm font-semibold  hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Home</a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 rounded" href="#">About Us</a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Services</a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-sm font-semibold  hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Pricing</a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
