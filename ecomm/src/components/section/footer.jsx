import { Link } from 'react-router-dom'
import FooterLogo from '../../../src/assets/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


export default function Footer() {
  return (
    // Outermost wrapperwih copyright section
    <div className="bg-gray-950 px-10 py-7">
        {/* Footer Part*/}
      <div className="flex flex-wrap justify-between font-sans text-white">
        <div className=" pl-16 md:w-1/4 ">
          <div className="mb-4">
            <Link to="/">
              <img src={FooterLogo} alt='Organic Foods Logo' height={200} width={200} className="mx-auto md:mx-0" />
            </Link>
          </div>
          <p className="text-lg leading-relaxed text-center md:text-left">
            Find local organic food items here on Organic Foods. We sell authentic and healthy chemical-free foods on this website.
          </p>
        </div>

        <div className="w-full md:w-1/4 text-center mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
            <li><Link to="/cart" className="hover:text-gray-400">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-gray-400">Checkout</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          </ul>
        </div>

        <div className=" ">
          <h3 className="text-xl font-semibold mb-4">Our Location</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center">
                <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                </svg>
                </span>Kathmandu, Nepal</li>
            <li className="flex items-center">
                <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                </svg>
                </span>9841578941</li>
            <li className="flex items-center">
                <span className="mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                    </span>ghimireaneesh@gmail.com</li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 text-center">
          <h3 className="text-xl font-semibold mb-4">Follow Us On</h3>
            <div className="flex justify-center space-x-4 text-2xl">
            <Link to="https://www.facebook.com/awwneesh"><FaFacebook /></Link>
            <Link to="https://www.linkedin.com/in/ghimireanish/"><FaLinkedinIn /></Link>
            <Link to="/"><FaInstagram /></Link>
            </div>
        </div>
      </div>

      <div className="mt-10 text-center text-white">
        <p className="text-lg font-semibold">Designed by Anish Ghimire in 2024 &copy; All Rights Reserved</p>
        <p className="text-sm">For business inquiries, contact me through the provided links.</p>
      </div>
    </div>
  )
}
