import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/orders/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.items) setItems(data.items);
    };

    if (user) fetchCart();
  }, [user]);

  const total = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  if (!items.length) {
    return (
        <div className="min-h-screen pt-24 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Seu carrinho está vazio 🛒</h2>
            <Link to="/" className="text-purple-600 hover:underline mt-4 block">Voltar para a Loja</Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qtd</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 flex items-center">
                                <img src={`http://localhost:5000${item.image}`} alt={item.name} className="h-10 w-10 rounded-full mr-3 object-cover" />
                                <span className="font-medium text-gray-900">{item.name}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">R$ {item.price}</td>
                            <td className="px-6 py-4 text-gray-500">{item.quantity}</td>
                            <td className="px-6 py-4 text-purple-600 font-bold">R$ {item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total: R$ {total.toFixed(2)}</span>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-lg">
                    Finalizar Compra
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;