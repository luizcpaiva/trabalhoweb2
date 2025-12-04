import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-purple-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Página não encontrada</h2>
      <p className="text-gray-600 mt-2 mb-8">Ops! Parece que você se perdeu no bosque.</p>
      <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition shadow-lg">
        Voltar para a Loja
      </Link>
    </div>
  );
}

export default NotFound;