import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth(); 

  const refreshCart = async () => {
    if (!user) {
        setCartCount(0);
        return;
    }

    const token = localStorage.getItem('token');
    try {
        const res = await fetch('http://localhost:5000/api/orders/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.items) {
            const count = data.items.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(count);
        } else {
            setCartCount(0);
        }
    } catch (error) {
        console.error("Erro ao atualizar contador:", error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);