import  { useState,useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

import axios from 'axios';
const CartPage = () => {
    const [couponCode, setCouponCode] = useState('');
    const[cart, setCart] = useState({ items: [], totalPrice: 0, itemCount: 0 })
    const [isDisabled, setIsDisabled] = useState(true);
    
  //const [count, setCount] = useState(0);
  useEffect(()=>{
      fetchCart();
  },[])
  
  const [updatedQuantities,setUpdatedQuantities] = useState({})
  const handleQuantityChange = (e, item) =>{
    const id = item.id
    setIsDisabled(false); // Enable the Update button when quantity changes
    const newQuantity = parseInt(e.target.value);
    console.log("New Quantity: ", newQuantity)
    console.log("Item quantity: ", item.quantity)
    if (newQuantity != item.quantity) {
      setUpdatedQuantities((prev) => ({
        ...prev,
        [id]: newQuantity,
      }));
    }

  }

  const updateCart = async()=>{
    console.log(updatedQuantities)
    const updatedItems = Object.entries(updatedQuantities).map(([id, quantity]) => ({
      id,
      quantity
    }));
    console.log(updatedItems)
    try{
      const response = await axios.put("http://localhost:3001/updateCart",
      updatedItems,
      {withCredentials:true})
      if(response.status===200){
        console.log("Updated Cart successfully")
        setUpdatedQuantities({});
        fetchCart()
      }
    }catch (error){
      console.error("Error Updating cart:", error);
    }
  }

  

  const deleteCartItem = async(itemId)=>{
    console.log("Item id : ",itemId);
    try{
        const response = await axios.delete('http://localhost:3001/deleteCartItem',
          {params : {productId : itemId},
          withCredentials:true}
        );

        if(response.status===200){
            console.log("Items Deleted Successfully")
            fetchCart()
        }
        if(response.status===400){
            console.log(response.data.message)
        }
    }catch(error){
        console.error("Error fetching product details:", error);
    }
  }
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getCartItems', {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Fetched")
        setCart(response.data)
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">Cart</h1>

            {/* Cart Table */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b">
                    <div className="col-span-6">
                        <h2 className="text-gray-700 font-medium">Product</h2>
                    </div>
                    <div className="col-span-2 text-left">
                        <h2 className="text-gray-700 font-medium">Price</h2>
                    </div>
                    <div className="col-span-2 text-left">
                        <h2 className="text-gray-700 font-medium">Quantity</h2>
                    </div>
                    <div className="col-span-2 text-right">
                        <h2 className="text-gray-700 font-medium">Subtotal</h2>
                    </div>
                </div>

                {cart.items.length > 0 ? (
          cart.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b"
            >
              <div className="col-span-6 flex items-center gap-4">
                <button onClick={()=>{deleteCartItem(item.id)}} className="text-gray-400 hover:text-gray-600">
                  <MdDelete className=' text-lg' />
                </button>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover"
                />
                <span className="text-green-600">{item.product.name}</span>
              </div>
              <div className="col-span-2">
                <span>Rs. {item.product.price}</span>
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  min="1"
                  onChange={(e)=>{handleQuantityChange(e,item)}}
                  placeholder={item.quantity}
                  className="w-16 p-1 border rounded text-center"
                />
              </div>
              <div className="col-span-2 text-right">
                <span>Rs. {item.subtotal}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">Your cart is empty.</p>
        )}
                   
            </div>

            {/* Coupon and Update Section */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Coupon code"
                        className="px-4 py-2 border rounded"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                        APPLY COUPON
                    </button>
                </div>
                <button
                  onClick={updateCart}
                  className={` bg-green-600 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition ${isDisabled ? 'bg-gray-200 opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isDisabled}
                >
          UPDATE CART
        </button>
            </div>

            {/* Cart Totals */}
            <div className="ml-auto max-w-md">
                <h2 className="text-xl font-bold mb-4">Cart totals</h2>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between py-3 border-b">
                        <span>Subtotal</span>
                        <span>Rs. {cart.totalPrice}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span>Total</span>
                        <span className="font-bold">Rs. {cart.totalPrice}</span>
                    </div>
                    <Link to="/checkout">
                        <button className="w-full bg-green-600 text-white py-3 rounded mt-6 hover:bg-green-700 transition">
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};

export default CartPage;