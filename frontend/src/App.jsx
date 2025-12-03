import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';  
import Navbar from './components/Navbar'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Home from './pages/Home'; 
import Cart from './pages/Cart'; 
import MyOrders from './pages/MyOrders'; 
import AdminDashboard from './pages/AdminDashboard'; 
import Footer from './components/Footer'; 
 
function App() { 
  return ( 
    <AuthProvider> 
      <CartProvider>  
        <BrowserRouter> 
          <Navbar /> 
          <div className="min-h-screen"> 
          <Routes> 
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/my-orders" element={<MyOrders />} /> 
            <Route path="/admin" element={<AdminDashboard />} /> 
          </Routes> 
          </div> 
          <Footer /> 
        </BrowserRouter> 
      </CartProvider>  
    </AuthProvider> 
  ); 
} 
 
export default App;