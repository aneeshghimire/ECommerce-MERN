import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
const[cart, setCart] = useState({ items: [], totalPrice: 0, itemCount: 0 })
  const [formData, setFormData] = useState({
    fullname:'',
    companyName: '',
    streetAddress: '',
    town: '',
    state: '',
    postcode: '',
    paymentMethod: 'check'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const orderID = `TXN-${Date.now()}`;
  const [amount, setAmount] = useState(0)
  const data = {
    amount : amount,
    orderID
  }
  const verifyKhalti = async() =>{
    const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}`,data, {
      withCredentials: true,
    });
    if(response.status === 200){
      console.log("Backend data: ", response.data.url.payment_url)
      window.location.href = response.data.url.payment_url;
    }
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  useEffect(()=>{
        fetchCart();
    },[])

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/getCartItems`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response.data)
        setCart(response.data)
        setAmount(response.data.totalPrice)
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Billing Details Section */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
              <form onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                  
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State / Zone <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="bagmati">Bagmati</option>
                    <option value="gandaki">Gandaki</option>
                    {/* Add other states */}
                  </select>
                </div>
                <h3 className='mt-6 text-3xl'>Additional Information</h3>
                <hr className='my-5'/>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order notes (optional)
                  </label>
                  <input
                    type="textarea"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                  
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Your order</h2>
              
              <div className="border-b pb-4">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Product</span>
                  <span className="text-gray-600">Subtotal</span>
                </div>
                {cart.items.length > 0 ? (
                    cart.items.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-4">
                                <span>{item.product.name} × {item.quantity}</span>
                                <span>Rs{item.subtotal}</span>
                                </div>
                            </div>
                        ))
                      ) : (
                        <p className="p-4 text-center text-gray-500">Your cart is empty.</p>
                )}
                                
                                <div className="flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-bold">{cart.totalPrice}</span>
                                </div>
                
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="check"
                    name="paymentMethod"
                    value="check"
                    checked={formData.paymentMethod === 'check'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600"
                  />
                  <label htmlFor="check" className="ml-2">Check payments</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600"
                  />
                  <label htmlFor="cash" className="ml-2">Cash on delivery</label>
                </div>
                
                <div className="bg-gray-50 p-4 text-sm text-gray-600 rounded">
                  Once you confirm the order, the product may be shipped in 2-3 days. Please answer the call for receiving the product on delivery day.
                </div>

                <button
                  onClick={verifyKhalti}
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;