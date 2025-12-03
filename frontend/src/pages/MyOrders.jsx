import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/orders/myorders', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                console.error("Erro ao buscar pedidos (Backend retornou algo estranho):", data);
            }
        })
        .catch(err => console.error("Erro de conexão:", err));
    }
  }, [user]);

  if (!orders || orders.length === 0) {
    return (
        <div className="min-h-screen pt-32 text-center text-gray-600">
            <h2 className="text-xl font-bold">Nenhum pedido encontrado.</h2>
            <p className="mt-2 text-sm text-gray-400">Ou houve um erro ao carregar seus dados.</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos 📦</h1>
        
        <div className="space-y-6">
            {orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div>
                            <span className="font-bold text-gray-700">Pedido #{order.id}</span>
                            <span className="text-sm text-gray-500 ml-4">
                                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                            {order.status}
                        </span>
                    </div>
                    
                    <div className="p-6">
                        {order.OrderItems && order.OrderItems.map(item => (
                            <div key={item.id} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                                <span className="text-gray-600">
                                    {item.Product ? item.Product.name : 'Produto Indisponível'} (x{item.quantity})
                                </span>
                                <span className="font-medium text-gray-900">R$ {item.price}</span>
                            </div>
                        ))}
                        <div className="mt-4 text-right">
                            <span className="text-lg font-bold text-purple-600">
                                Total: R$ {order.OrderItems ? order.OrderItems.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2) : '0.00'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;