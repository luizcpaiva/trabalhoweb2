function Footer() { 
  return ( 
    <footer className="bg-white border-t border-gray-200 mt-12 py-8"> 
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600"> 
        <p className="font-medium">🌿 Bosque Mágico - E-commerce</p> 
        <p className="text-sm mt-2"> 
          Desenvolvido por <span className="text-purple-600 font-bold">Kaique Salvador, Luiz Paiva e Sandy Maciel</span> 
        </p> 
        <p className="text-xs text-gray-400 mt-4"> 
          Projeto de Programação Web 2 - UFLA &copy; {new 
Date().getFullYear()} 
        </p> 
      </div> 
    </footer> 
  ); 
} 
 
export default Footer;