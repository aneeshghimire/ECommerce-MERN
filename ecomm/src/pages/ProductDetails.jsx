import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductDetailsCard } from "../components/productdetailcard";
import { FaTruckMoving } from "react-icons/fa6";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0); // Track selected quantity

  useEffect(() => {
    if (id) fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Product Details Fetched Successfully");
        setProduct(response.data);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const cartItem = {
      productId: product._id,
      quantity: Number(quantity),
    };
    console.log(cartItem);
    try {
      if(cartItem.quantity <1){
        alert("The quantity can't be 0.");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/addtocart`,
        cartItem,
        { withCredentials: true }
      );
      if (response.status === 201) {
        console.log("Added to cart:", response.data);
        alert("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (!product) {
    return <p className="text-center text-gray-600 text-xl">Loading product details...</p>;
  }

  return (
    <div className="mx-auto p-8 flex flex-col md:flex-row items-start bg-[#f8f6f3] rounded-lg shadow-md">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <ProductDetailsCard src={product.image} />
      </div>

      
      <div className="w-full md:w-1/2 py-24 px-24">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

        <p className="text-2xl font-semibold text-gray-900 mt-2">
          Rs. {product.price.toFixed(2)}
        </p>
        <p className="flex items-center">
            <span className="text-sm font-light mr-3 text-gray-500">
                Free Shipping
            </span>
            <FaTruckMoving className="ml-1" />
        </p>
        <p className="text-gray-600 text-lg mt-4">{product.description}</p>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center mt-6">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-16 p-2 border rounded-md text-center"
          />
          <button
            onClick={handleAddToCart}
            className="ml-4 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
