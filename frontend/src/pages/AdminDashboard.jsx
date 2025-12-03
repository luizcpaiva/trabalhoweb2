import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [productForm, setProductForm] = useState({ name: '', price: '', description: '', image: '', categoryId: '' });
  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isAdmin) {
        navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/products').then(res => res.json()).then(setProducts);
    fetch('http://localhost:5000/api/categories').then(res => res.json()).then(setCategories);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const slug = categoryName.toLowerCase().replace(/ /g, '-');

    const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: categoryName, slug })
    });

    if (res.ok) {
        alert("Categoria criada!");
        setCategoryName('');
        fetchData();
    } else {
        alert("Erro ao criar categoria");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Tem certeza? Produtos nessa categoria podem ficar sem classificação.")) return;
    
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        fetchData();
    } else {
        alert("Erro ao excluir categoria.");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = { ...productForm };
    if (!payload.image) payload.image = '/images/placeholder.png';

    let url = 'http://localhost:5000/api/products';
    let method = 'POST';

    if (editingId) {
        url = `http://localhost:5000/api/products/${editingId}`;
        method = 'PUT';
    }

    const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        alert(editingId ? "Produto atualizado!" : "Produto criado!");
        setProductForm({ name: '', price: '', description: '', image: '', categoryId: '' });
        setEditingId(null);
        fetchData();
    } else {
        alert("Erro ao salvar produto");
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setProductForm({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        categoryId: product.CategoryId
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setProductForm({ name: '', price: '', description: '', image: '', categoryId: '' });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 space-y-8">
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-lg font-bold mb-4 text-gray-700">Categorias</h2>
                
                <form onSubmit={handleCreateCategory} className="flex gap-2 mb-4">
                    <input 
                        type="text" 
                        placeholder="Nova Categoria" 
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 font-bold">+</button>
                </form>

                <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map(c => (
                        <li key={c.id} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm hover:bg-gray-100 transition">
                            <span className="text-gray-700 font-medium">{c.name}</span>
                            <button 
                                onClick={() => handleDeleteCategory(c.id)} 
                                className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center transition"
                                title="Excluir Categoria"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 relative overflow-hidden">
                {editingId && <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>}
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-700">
                        {editingId ? 'Editar Produto' : 'Novo Produto'}
                    </h2>
                    {editingId && (
                        <button onClick={handleCancelEdit} className="text-xs text-gray-500 hover:text-red-500 underline">
                            Cancelar
                        </button>
                    )}
                </div>

                <form onSubmit={handleProductSubmit} className="flex flex-col gap-3">
                    <input type="text" placeholder="Nome" className="border p-2 rounded" required 
                        value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
                    
                    <div className="flex gap-2">
                        <input type="number" step="0.01" placeholder="Preço" className="border p-2 rounded w-1/2" required 
                            value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                        
                        <select className="border p-2 rounded w-1/2 bg-white" required
                            value={productForm.categoryId} onChange={e => setProductForm({...productForm, categoryId: e.target.value})}>
                            <option value="">Categoria</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <input type="text" placeholder="URL da Imagem" className="border p-2 rounded" 
                        value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} />

                    <textarea placeholder="Descrição" className="border p-2 rounded" rows="3" required
                        value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})}></textarea>

                    <button type="submit" className={`py-2 px-4 rounded font-bold text-white transition shadow-md ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-purple-600 hover:bg-purple-700'}`}>
                        {editingId ? 'Atualizar Produto' : 'Salvar Produto'}
                    </button>
                </form>
            </div>
        </div>

        <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-700">Produtos Cadastrados ({products.length})</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="p-4 border-b">Produto</th>
                                <th className="p-4 border-b">Cat.</th>
                                <th className="p-4 border-b">Preço</th>
                                <th className="p-4 border-b text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map(p => (
                                <tr key={p.id} className={`hover:bg-gray-50 transition ${editingId === p.id ? 'bg-yellow-50' : ''}`}>
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={`http://localhost:5000${p.image}`} className="w-8 h-8 rounded object-cover border" onError={(e) => e.target.src='https://via.placeholder.com/50'} />
                                        <span className="font-medium text-gray-800 text-sm">{p.name}</span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {categories.find(c => c.id === p.CategoryId)?.name || '-'}
                                    </td>
                                    <td className="p-4 text-green-600 font-bold text-sm">R$ {p.price}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button 
                                            onClick={() => handleEditClick(p)} 
                                            className="text-yellow-600 hover:text-yellow-800 border border-yellow-200 hover:bg-yellow-100 px-2 py-1 rounded text-xs font-bold transition"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteProduct(p.id)} 
                                            className="text-red-500 hover:text-red-700 border border-red-200 hover:bg-red-100 px-2 py-1 rounded text-xs font-bold transition"
                                        >
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

      </div>
    </div>
  );
}

export default AdminDashboard;