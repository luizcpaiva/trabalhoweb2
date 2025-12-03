import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Navbar() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500 hover:opacity-80 transition">
            Bosque Mágico
          </Link>

          <div className="flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition">Loja</Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-purple-600 transition">
              Carrinho
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">0</span>
            </Link>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-800 font-medium">Olá, {user.username}!</span>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-500 px-3 py-1 rounded-full hover:bg-red-50 transition">
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-purple-600 font-medium">Entrar</Link>
                  <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Cadastrar</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;