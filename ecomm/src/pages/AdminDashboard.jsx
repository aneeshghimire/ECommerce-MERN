import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPage from './AdminForm';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      description: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getProducts`, {
          withCredentials: true
        });
  
        if (response.status === 200) {
          console.log("Products Fetched Successfully");
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
    
        try {
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteProducts`, {
            params:{productId: id},
            withCredentials: true
          });
    
          if (response.status === 200) {
            console.log("Product Deleted Successfully");
            fetchProducts();
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete product");
        }
      };



    const handleEdit = async (id) => {      
      console.log(id)
      console.log(formData)
      const isFormEmpty = Object.values(formData).some(value => value === "" || value === null);

      if (isFormEmpty) {
        alert("Enter all the fields");
        return;
      }    

     
        try {
          const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateProduct`,formData, {
            params:{productId: id},
            withCredentials: true
          });
    
          if (response.status === 200) {
            alert("Product Updated Successfully")
            setIsPopupOpen(false)
            setFormData({
              name: "",
              description: "",
              price: "",
            });
            fetchProducts();
          }
        } catch (error) {
          console.error("Error update product:", error);
          alert("Failed to update product");
        }
     
       
      };


      
    
      const [selectedProduct, setSelectedProduct] = useState(null);
  
      const activatePopup = (id)=>{
        const productToEdit = products.find((product) => product._id === id);
        setSelectedProduct(productToEdit);
        setIsPopupOpen(true)
      }
    
        useEffect(() => {
        fetchProducts();
      }, []);
    
    if (loading) {
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-center text-gray-600">Loading products...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-center text-red-600">{error}</p>
        </div>
      );
    }
  
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-3xl text-center font-semibold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">Rs. {product.price}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-900 mr-3"
                         onClick={() => activatePopup(product._id)}
                      >Edit</button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {isPopupOpen && selectedProduct && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 px-4">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-lg sm:max-w-xl md:max-w-2xl w-full sm:w-11/12 md:w-3/4 overflow-y-auto max-h-screen">
                
                <h3 className="text-xl font-bold mb-4 sm:mb-6 text-center">Edit Product</h3>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={selectedProduct.name}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={selectedProduct.price}
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                      placeholder={selectedProduct.description}
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="flex items-center space-x-4">
                    <div className="w-24">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <img
                        src={selectedProduct.image}
                        alt="Product Image"
                        className="w-20 h-20 object-cover border rounded-md"
                      />
                    </div>
                    
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors w-full sm:w-auto"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors w-full sm:w-auto"
                    onClick={() => handleEdit(selectedProduct._id)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AddCategory = () => {
    const [categories, setCategories] = useState([]); // State to store categories
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getCategories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    useEffect(() => {
      fetchCategories();
    }, []); 
  
    const handleSubmit = async ()=>{
      try {
        const data = {name : categoryName}
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/addCategory`,data,{withCredentials:true});
        if(response.status===201){
          alert("Category Adding Successfull")
          setIsPopupOpen(false);
          setCategoryName('');
          fetchCategories();
        }
      } catch (error) {
        console.error("Adding Categories failed:", error);
      }
    }

    return (
      <div className="container mx-auto p-4">
        
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Add Category
        </button>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Item Number</th>
              <th className="px-4 py-2 text-left">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => {
                  setIsPopupOpen(false);
                  setCategoryName('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  };

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products'); // Default to products tab

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-1/4 p-6 bg-white border-r">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <nav className="mt-6 space-y-4">
          <button
            onClick={() => setActiveTab('add')}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'add' 
                ? 'text-[#8ec63f] bg-gray-100' 
                : 'text-gray-600 hover:text-[#8ec63f]'
            }`}
          >
            Add Products
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'products' 
                ? 'text-[#8ec63f] bg-gray-100' 
                : 'text-gray-600 hover:text-[#8ec63f]'
            }`}
          >
            View Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'orders' 
                ? 'text-[#8ec63f] bg-gray-100' 
                : 'text-gray-600 hover:text-[#8ec63f]'
            }`}
          >
            Add Category
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-6">
        {activeTab === 'add' && <AdminPage/>}
        {activeTab === 'products' && <ViewProducts />}
        {activeTab === 'categories' && <AddCategory />}
      </main>
    </div>
  );
};

export default AdminDashboard;