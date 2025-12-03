import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch('http://localhost:5000/api/orders/cart', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.items) setItems(data.items);
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
        }
    };

    if (user) fetchCart();
  }, [user]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    
    try {
        const res = await fetch('http://localhost:5000/api/orders/checkout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            alert("Compra realizada com sucesso! 🎉");
            setItems([]);
            navigate('/my-orders'); 
        } else {
            alert("Erro ao finalizar compra. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro no checkout:", error);
        alert("Erro de conexão com o servidor.");
    }
  };

  const total = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  if (!items.length) {
    return (
        <div className="min-h-screen pt-32 text-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Seu carrinho está vazio 🛒</h2>
                <p className="text-gray-500 mb-6">Parece que você ainda não adicionou nada.</p>
                <Link to="/" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                    Voltar para a Loja
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Produto</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Qtd</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                    <img 
                                        src={`http://localhost:5000${item.image}`} 
                                        alt={item.name} 
                                        className="h-full w-full object-cover"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=IMG"; }}
                                    />
                                </div>
                                <span className="ml-4 font-medium text-gray-900">{item.name}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">R$ {parseFloat(item.price).toFixed(2)}</td>
                            <td className="px-6 py-4 text-gray-500 font-medium">{item.quantity}</td>
                            <td className="px-6 py-4 text-purple-600 font-bold">R$ {parseFloat(item.total).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="px-6 py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">Total: R$ {total.toFixed(2)}</span>
                <button 
                    onClick={handleCheckout}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition duration-200"
                >
                    Finalizar Compra
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;