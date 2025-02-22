
import { useState, useEffect } from "react";
import ProductCard from "../components/productcard";
import { Link} from "react-router-dom";
import axios from "axios";

export default function Everything() {
        const [products, setProducts] = useState([])
        
        const filterProducts = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/getProductByCategory`,{
            params: { categoryType: "Juice" },
            withCredentials: true});
            if(response.status===200){
              console.log("Products Fetched Successfully")
              setProducts(response.data); 
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        useEffect(() => {
          filterProducts();
        }, []);
        const [search, setSearch] = useState("");
        const [priceRange, setPriceRange] = useState([10, 40]);
      
        // Filter products based on search & price range
        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        );
  return (
    
    <div className="min-h-screen flex flex-col bg-[#f1f1f0] px-6 lg:px-20 py-12">
    {/* Main Content */}
    <main className="flex flex-col lg:flex-row flex-1">
      {/* Sidebar - Filters */}
      <aside className="w-full lg:w-1/5 p-4 border-b lg:border-b-0 lg:border-r border-gray-300">
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
      <section className="w-full lg:w-4/5 px-4 lg:px-8">
        <div className="mb-8">
          <nav className="text-gray-500 mb-4">
            <Link to="/">
              <span>Home</span>
            </Link>
            <span className="mx-2">/</span>
            <span>Juice</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-bold text-[#8ec63f]">Juice</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6">
            <p className="text-gray-600 mb-2 md:mb-0">
              Showing 1–{filteredProducts.length} of {products.length} results
            </p>
            <select className="border p-2 rounded w-full md:w-auto">
              <option>Default sorting</option>
              <option>Sort by price: low to high</option>
              <option>Sort by price: high to low</option>
            </select>
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="w-full">
              <Link to={`/product/${product._id}`}>
                <div className="block w-full h-full">
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={
                      product.description.length < 80
                        ? product.description
                        : product.description.slice(0, 80) + '...'
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
