import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erro categorias:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = 'http://localhost:5000/api/products?';
    if (searchTerm) url += `search=${searchTerm}&`;
    if (selectedCategory) url += `category=${selectedCategory}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro produtos:", err);
        setLoading(false);
      });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = async (productId) => {
    if (!user) {
        navigate('/login');
        return;
    }
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/orders/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productId, quantity: 1 })
    });
    if (response.ok) alert("Produto adicionado!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* === COLUNA DA ESQUERDA: FILTROS === */}
        <aside className="w-full md:w-1/4">
            {/* Barra de Busca */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                <h3 className="font-bold text-gray-700 mb-4">Buscar</h3>
                <input 
                    type="text" 
                    placeholder="O que você procura?" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Lista de Categorias */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-gray-700 mb-4">Categorias</h3>
                <ul className="space-y-2">
                    <li>
                        <button 
                            onClick={() => setSelectedCategory('')}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${selectedCategory === '' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Todas
                        </button>
                    </li>
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <button 
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition ${selectedCategory === cat.slug ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>

        {/* === COLUNA DA DIREITA: PRODUTOS === */}
        <main className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {selectedCategory ? `Categoria: ${selectedCategory}` : 'Destaques da Semana ✨'}
            </h1>

            {loading ? (
                <p className="text-center text-purple-600">Carregando...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl group">
                    <div className="h-56 overflow-hidden bg-gray-200 relative">
                        <img 
                        src={`http://localhost:5000${product.image}`} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:opacity-90 transition"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Sem+Imagem"; }} 
                        />
                    </div>

                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">{product.description}</p>
                        <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">R$ {product.price}</span>
                        <button 
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>
                )) : (
                    <p className="col-span-3 text-center text-gray-500 mt-10">Nenhum produto encontrado. 😢</p>
                )}
                </div>
            )}
        </main>

      </div>
    </div>
  );
}

export default Home;