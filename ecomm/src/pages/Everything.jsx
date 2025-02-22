
import { useState, useEffect } from "react";
import ProductCard from "../components/productcard";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Everything() {
        const [products, setProducts] = useState([])
    
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/getProducts`,{withCredentials: true});
            if(response.status===200){
              console.log("Products Fetched Successfully")
              setProducts(response.data); 
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        

        useEffect(() => {
          fetchProducts();
        }, []);

        
        const [search, setSearch] = useState("");
        const [priceRange, setPriceRange] = useState([0, 10000]);
        // Filter products based on search & price range
        const filteredProducts = Array.isArray(products) ? products.filter(
          (product) =>
            product.name?.toLowerCase().includes(search.toLowerCase()) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        ) : [];
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f1f0] px-4 sm:px-10 md:px-20 py-8 md:py-12">
  <main className="flex flex-1 flex-col md:flex-row">
    {/* Sidebar - Filters */}
    <aside className="w-full md:w-1/5 p-4 border-b md:border-b-0 md:border-r border-gray-300">
      <h2 className="text-lg font-bold">Search Products</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md my-2"
      />

      <h2 className="text-lg font-bold mt-4">Filter by Price</h2>
      <input
        type="range"
        min="10"
        max="40"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([10, Number(e.target.value)])}
        className="w-full"
      />
      <p>£{priceRange[0]} - £{priceRange[1]}</p>
    </aside>

    {/* Products Section */}
    <section className="w-full md:w-4/5 px-4 sm:px-6 md:px-8">
      <div className="px-4 sm:px-8 mb-8">
        <nav className="text-gray-500 mb-4">
          <Link to="/">
            <span>Home</span>
          </Link>
          <span className="mx-2">/</span>
          <span>Shop</span>
        </nav>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#8ec63f]">Shop</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-8">
          <p className="text-gray-600">
            Showing 1–{filteredProducts.length} of {products.length} results
          </p>
          <select className="border p-2 rounded mt-2 sm:mt-0">
            <option>Default sorting</option>
            <option>Sort by price: low to high</option>
            <option>Sort by price: high to low</option>
          </select>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {filteredProducts.map((product) => (
          <div key={product._id} className="w-full">
            <Link to={`/product/${product._id}`}>
              <div className="block w-full h-full">
                <ProductCard
                  name={product.name}
                  category={product.category?.name || "Unknown"} 
                  price={product.price}
                  image={product.image}
                  description={
                    product.description.length < 80 ? product.description : product.description.slice(0, 80) + '...'
                  }
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  </main>
</div>

  )
}
