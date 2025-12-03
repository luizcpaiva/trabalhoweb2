# Bosque Mágico - E-commerce Full Stack 
Este projeto é um sistema de E-commerce completo desenvolvido como trabalho final da 
disciplina de **Programação Web 2** na **UFLA**. 
O objetivo foi reimplementar um sistema anteriormente feito em Django (Python), migrando 
totalmente para uma arquitetura **Full Stack JavaScript** (Stack MERN adaptada com 
SQL). 

## Tecnologias Utilizadas 

O projeto foi construído utilizando as seguintes tecnologias: 
### Backend (API) 
* **Node.js** & **Express**: Servidor e rotas da API. 
* **SQLite**: Banco de dados relacional (simples e sem configuração extra). 
* **Sequelize**: ORM para gerenciamento do banco de dados e relacionamentos. 
* **JWT (JSON Web Tokens)**: Autenticação segura. 
* **Bcrypt.js**: Criptografia de senhas. 
* **Multer**: Upload de imagens dos produtos. 
### Frontend (Interface) 
* **React.js (Vite)**: Biblioteca para construção da interface (SPA). 
* **Tailwind CSS**: Estilização moderna e responsiva. 
* **Context API**: Gerenciamento de estado global (Autenticação e Carrinho). 
* **React Router Dom**: Navegação entre páginas. 

## Funcionalidades 

### Área Pública 
* Visualização de produtos em destaque. 
* Barra de busca em tempo real. 
* Filtro de produtos por categorias. 
###  Área do Cliente 
* Cadastro e Login de usuários (com validação de e-mail único e senha segura). 
* Adicionar produtos ao Carrinho de Compras. 
* Contador dinâmico de itens no menu. 
* Finalizar compra (Checkout simulado). 
* Visualizar histórico de pedidos ("Meus Pedidos"). 
### Área Administrativa (Protegida) 
* Painel exclusivo para administradores. 
* **CRUD de Produtos:** Criar, Editar e Excluir produtos. 
* **Upload de Imagens:** Envio de fotos reais para os produtos. 
* **Gestão de Categorias:** Criar e excluir categorias (com validação de integridade). 
 
## Pré-requisitos 
 
Antes de começar, certifique-se de ter instalado em sua máquina: 
* [Node.js](https://nodejs.org/) (Versão 16 ou superior) 
* [Git](https://git-scm.com/) 
 
## Como Rodar o Projeto 
 
Este projeto é dividido em duas partes: **Backend** (Servidor) e **Frontend** (Interface). 
Você precisará de **dois terminais** abertos. 
 
### Passo 1: Configurar o Backend 
 
1.  Abra o terminal e entre na pasta do backend: 
    ```bash 
    cd backend 
    ``` 
2.  Instale as dependências: 
    ```bash 
    npm install 
    ``` 
3.  **IMPORTANTE:** Crie as pastas para salvar as imagens (se não existirem): 
    * Crie uma pasta chamada `public` dentro de `backend`. 
    * Crie uma pasta chamada `images` dentro de `public`. 
4.  Popule o banco de dados com dados iniciais e crie o usuário Admin: 
    ```bash 
    npm run seed 
    ``` 
5.  Inicie o servidor: 
    ```bash 
    npm run dev 
    ``` 
    *O servidor rodará em: `http://localhost:5000`* 
 
### Passo 2: Configurar o Frontend 
 
1.  Abra um **novo terminal** (mantenha o anterior rodando) e entre na pasta do frontend: 
    ```bash 
    cd frontend 
    ``` 
2.  Instale as dependências: 
    ```bash 
    npm install 
    ``` 
3.  Inicie a aplicação React: 
    ```bash 
    npm run dev 
    ``` 
4.  Acesse o link mostrado no terminal (geralmente `http://localhost:5173`) no seu 
navegador. 
 
## Acesso Administrativo 
 
Para testar as funcionalidades de Admin (criar produtos, categorias, etc), utilize a conta 
criada automaticamente pelo comando `seed`: 
 
* **Email:** `admin@loja.com` 
* **Senha:** `123456` 
 
*Nota: Usuários criados pelo formulário de cadastro do site serão Clientes comuns e não 
terão acesso ao painel admin.* 
 --- 
 
## Estrutura de Pastas 
 
```text 
/ 
├── backend/            # Servidor Node.js 
│   ├── controllers/    # Lógica de negócio (Produtos, Usuários, Pedidos) 
│   ├── models/         # Definição das tabelas do Banco de Dados 
│   ├── routes/         # Rotas da API e Configuração de Upload 
│   ├── middleware/     # Proteção de rotas (Auth, Admin) 
│   ├── public/images/  # Onde as fotos dos produtos são salvas 
│   └── database.sqlite # Arquivo do banco de dados 
│ 
└── frontend/           # Interface React 
    ├── src/ 
    │   ├── components/ # Navbar, Cards, etc. 
    │   ├── context/    # Estados globais (AuthContext, CartContext) 
    │   ├── pages/      # Telas (Home, Login, AdminDashboard, Cart...) 
    │   └── App.jsx     # Configuração de rotas 
 
## Autores 
 
Kaique Inácio Salvador 
Luiz Carlos de Paiva Silva 
Sandy K. Maciel 