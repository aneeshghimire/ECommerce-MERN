import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { useState } from 'react';
import { Menu, X } from "lucide-react";
export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md px-6 md:px-16 py-4 h-[80px]">
      <div className="flex justify-between items-center h-full">
        {/* Left Section (Logo) */}
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo Organic Foods" className="w-[150px] md:w-[200px]" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-xl text-gray-800">
          <li><Link to="/everything" className="hover:text-green-600">Everything</Link></li>
          <li><Link to="/groceries" className="hover:text-green-600">Groceries</Link></li>
          <li><Link to="/juice" className="hover:text-green-600">Juice</Link></li>
        </ul>

        {/* Right Section (About, Contact, Icons) */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex text-xl space-x-8 text-gray-800">
            <li><Link to="/about" className="hover:text-green-600">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-600">Contact</Link></li>
          </ul>
          <div className="flex space-x-6">
            <Link to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-700 hover:text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </Link>
            <Link to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-700 hover:text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md p-6 flex flex-col space-y-4 text-xl text-gray-800">
          <Link to="/everything" className="hover:text-green-600" onClick={() => setIsOpen(false)}>Everything</Link>
          <Link to="/groceries" className="hover:text-green-600" onClick={() => setIsOpen(false)}>Groceries</Link>
          <Link to="/juice" className="hover:text-green-600" onClick={() => setIsOpen(false)}>Juice</Link>
          <hr />
          <Link to="/about" className="hover:text-green-600" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="hover:text-green-600" onClick={() => setIsOpen(false)}>Contact</Link>
          <hr />
          <Link to="/cart" className="hover:text-green-600 flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            🛒 Cart
          </Link>
          <Link to="/login" className="hover:text-green-600 flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            🔑 Login
          </Link>
        </div>
      )}
    </nav>
  );
}