import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
// import ProductCard from "../components/productcard";
import supabase from "../services/supabaseClient";
import axios from "axios";

export default function AdminPage() {
  
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getCategories");
        setCategories(response.data); // Expecting an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setNewProduct({ ...newProduct, category: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  // Upload image to Supabase and return its URL
  const uploadImageToSupabase = async () => {
    if (!imageFile) return null;

    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from("ecomm-project-storage")
      .upload(fileName, imageFile);

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("ecomm-project-storage")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  // Handle product submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImageToSupabase();
      if (!imageUrl) {
        alert("Image upload failed!");
        return;
      }

      const productData = {
        ...newProduct,
        image: imageUrl,
      };

      const response = await axios.post("http://localhost:3001/addProducts", productData);

      if (response.status === 201) {
        alert("Product added successfully!");
        console.log(response.data);
        setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <section className="w-3/4 p-8">
        <h1 className="text-4xl font-bold text-[#8ec63f]">Add New Product</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 shadow-lg rounded-lg">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleProductChange}
            placeholder="Product Name"
            className="w-full p-3 border rounded-md"
            required
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleCategoryChange}
            className="w-full p-3 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleProductChange}
            placeholder="Description"
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleProductChange}
            placeholder="Price"
            className="w-full p-3 border rounded-md"
            required
          />
          <input type="file" onChange={handleImageChange} className="w-full p-3 border rounded-md" required />
          {imagePreview && (
            <div className="mt-3 relative">
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
              >
                X
              </button>
            </div>
          )}
          <button type="submit" className="px-6 py-2 bg-[#8ec63f] text-white rounded-md shadow-lg hover:bg-[#7fb13f]">
            Add Product
          </button>
        </form>
        {/* Current Products */}
        {/* <h2 className="text-2xl font-semibold mt-12">Current Products</h2>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard
                name={
                  <Link to={/product/${product.id}} className="hover:underline">
                    {product.name}
                  </Link>
                }
                category={product.category}
                price={product.price}
              />
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
}
