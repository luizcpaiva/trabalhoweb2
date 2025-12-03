import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function Home() {
  return <h1 className="text-center mt-10 text-2xl">Página da Loja (Em construção...)</h1>;
}

function Register() {
  return <h1 className="text-center mt-10 text-2xl">Página de Cadastro (Em construção...)</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;