import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '', categoryId: '' });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isAdmin) {
        navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products').then(res => res.json()).then(setProducts);
    fetch('http://localhost:5000/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = { ...formData };
    if (!payload.image) payload.image = '/images/placeholder.png';

    const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        alert("Produto criado!");
        window.location.reload();
    } else {
        alert("Erro ao criar produto");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza?")) return;
    const token = localStorage.getItem('token');
    
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel Administrativo 🛠️</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nome do Produto" className="border p-2 rounded" required 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                
                <input type="number" step="0.01" placeholder="Preço (R$)" className="border p-2 rounded" required 
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />

                <select className="border p-2 rounded" required
                    value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})}>
                    <option value="">Selecione a Categoria</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <input type="text" placeholder="URL da Imagem (Ex: https://site.com/foto.jpg)" className="border p-2 rounded" 
                    value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />

                <textarea placeholder="Descrição" className="border p-2 rounded md:col-span-2" required
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>

                <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 md:col-span-2">
                    Salvar Produto
                </button>
            </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 border-b">ID</th>
                        <th className="p-4 border-b">Nome</th>
                        <th className="p-4 border-b">Preço</th>
                        <th className="p-4 border-b">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                            <td className="p-4 border-b">#{p.id}</td>
                            <td className="p-4 border-b">{p.name}</td>
                            <td className="p-4 border-b">R$ {p.price}</td>
                            <td className="p-4 border-b">
                                <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-bold">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;