import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Success() {
    const [animate, setAnimate] = useState(false);

    const clearCart = async ()=>{
        try{
            const response = await axios.delete('http://localhost:3001/clearCart',
              {withCredentials:true}
            );
            if(response.status===200){
                console.log("Cart Cleared Successfully")
            }
            if(response.status===400){
                console.log(response.data.message)
            }
        }catch(error){
            console.error("Error Clearing Cart", error);
        }
    }

    useEffect(() => {
        clearCart()
        setAnimate(true);
    }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="relative">
        {/* Outer circle */}
        <div className={`w-32 h-32 rounded-full border-4 border-green-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} 
          transition-all duration-700 ease-out`} />
        
        {/* Middle circle */}
        <div className={`w-24 h-24 rounded-full border-4 border-green-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} 
          transition-all duration-500 ease-out delay-200`} />
        
        {/* Checkmark container */}
        <div className={`w-16 h-16 rounded-full bg-green-500 flex items-center justify-center 
          ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} 
          transition-all duration-300 ease-out delay-400`}>
          {/* Checkmark */}
          <svg 
            className={`w-8 h-8 text-white transform ${animate ? 'scale-100' : 'scale-0'} transition-transform duration-500 delay-700`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="3" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Success message */}
      <h1 className={`mt-8 text-2xl font-bold text-gray-800 
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} 
        transition-all duration-500 delay-1000`}>
        Transaction Successful!
      </h1>

      {/* Home button */}
      <button 
        className={`mt-6 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold 
          hover:bg-green-600 transform hover:-translate-y-0.5 transition-all duration-200
          ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} 
          transition-all duration-500 delay-1200`}
        onClick={() => window.location.href = '/'}
      >
        Return to Homepage
      </button>
    </div>
  )
}
