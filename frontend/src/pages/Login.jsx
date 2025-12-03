import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
    navigate('/'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-500 to-teal-400">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Bem-vindo de volta!</h2>
          <p className="text-gray-500 mt-2">Acesse sua conta na Bosque Mágico</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-purple-600 font-semibold hover:text-purple-800 hover:underline">
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;