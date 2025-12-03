import { useEffect, useState } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar produtos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-purple-600">Carregando produtos...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Destaques da Semana ✨
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl group">
              {/* Imagem do Produto */}
              <div className="h-64 overflow-hidden bg-gray-200 relative">
                <img 
                  src={`http://localhost:5000${product.image}`} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:opacity-90 transition"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Sem+Imagem"; }} 
                />
                {!product.available && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Esgotado
                  </span>
                )}
              </div>

              {/* Informações */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">
                    R$ {product.price}
                  </span>
                  <button className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;