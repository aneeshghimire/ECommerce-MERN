import { Route, Routes } from "react-router-dom"
import Aboutus from "./pages/Aboutus"
import Home from "./pages/Home"
import Everything from "./pages/Everything"
import ProductDetails from "./pages/ProductDetails"
import AdminForm from "./pages/AdminForm"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Groceries from "./pages/Groceries"
import Juice from "./pages/Juice"
import Success from "./pages/Success"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/everything" element={<Everything/>}/>
        <Route path="/groceries" element={<Groceries/>}/>
        <Route path="/juice" element={<Juice/>}/>
        <Route path="/adminform" element={<AdminForm/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/khaltiSuccess" element={<Success/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
