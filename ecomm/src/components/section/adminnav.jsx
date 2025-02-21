import { Link } from 'react-router-dom'
export default function AdminNavigation() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-1/4 p-6 bg-white border-r">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <nav className="mt-6 space-y-4">
          <Link to="/adminform" className="block text-gray-600 hover:text-[#8ec63f]">
            Add Products
          </Link>
          <Link to="/admin/products" className="block text-gray-600 hover:text-[#8ec63f]">
            View Products
          </Link>
          <Link to="/admin/orders" className="block text-gray-600 hover:text-[#8ec63f]">
            Manage Orders
          </Link>
        </nav>
      </aside>
    </div>
  )
}
