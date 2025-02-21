import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPage from './AdminForm';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/getProducts", {
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
          const response = await axios.delete(`http://localhost:3001/deleteProducts`, {
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
          <table className="min-w-full divide-y divide-gray-200">
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
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {/* <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button> */}
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
        </div>
      </div>
    );
  };

const ManageOrders = () => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Order Management Dummy Page</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4">#12345</td>
            <td className="px-6 py-4">John Doe</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </td>
            <td className="px-6 py-4">$199.99</td>
            <td className="px-6 py-4">
              <button className="text-blue-600 hover:text-blue-900">Process</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

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
            onClick={() => setActiveTab('orders')}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'orders' 
                ? 'text-[#8ec63f] bg-gray-100' 
                : 'text-gray-600 hover:text-[#8ec63f]'
            }`}
          >
            Manage Orders
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-6">
        {activeTab === 'add' && <AdminPage/>}
        {activeTab === 'products' && <ViewProducts />}
        {activeTab === 'orders' && <ManageOrders />}
      </main>
    </div>
  );
};

export default AdminDashboard;