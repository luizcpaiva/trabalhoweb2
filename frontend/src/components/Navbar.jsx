import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-20 top-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500 group-hover:opacity-80 transition">
              Bosque Mágico
            </span>
          </Link>

          <div className="flex items-center space-x-6"> 
            
            <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition duration-200">
              Loja
            </Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-purple-600 transition duration-200 flex items-center gap-1">
              <span>Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                    {cartCount}
                </span>
              )}
            </Link>

            <div className="flex items-center pl-6 border-l border-gray-200 gap-4">
              {user ? (
                <>
                  <span className="text-gray-600">
                    Olá, <strong className="text-purple-600">{user.username}</strong>
                  </span>
                  
                  <Link 
                    to="/my-orders" 
                    className="text-gray-600 hover:text-purple-600 font-medium text-sm transition border border-gray-200 px-3 py-1 rounded-full hover:border-purple-300"
                  >
                    Meus Pedidos
                  </Link>

                  <button 
                    onClick={handleLogout} 
                    className="text-red-500 hover:text-white border border-red-200 hover:bg-red-500 hover:border-red-500 px-3 py-1 rounded-full text-sm font-medium transition duration-200"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-gray-600 hover:text-purple-600 font-medium">
                    Entrar
                  </Link>
                  <Link to="/register" className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 hover:shadow-md transform hover:-translate-y-0.5 transition duration-200">
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;