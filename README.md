# APICamila

API e Frontend para gerenciamento de usuários com registro, login e perfil protegido usando JWT.

---

## Tecnologias

- **Backend:** Node.js, Express, SQLite, bcrypt, JSON Web Token (JWT), dotenv, CORS  
- **Frontend:** React  
- **Ferramentas:** Thunder Client (teste de API)

---


# APICamila

API e Frontend para gerenciamento de usuários com registro, login e perfil protegido usando JWT.

---

## Tecnologias

- **Backend:** Node.js, Express, SQLite, bcrypt, JSON Web Token (JWT), dotenv, CORS  
- **Frontend:** React  
- **Ferramentas:** Thunder Client (teste de API)


## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/camilaluizamachado/api.git
cd api

Backend:
cd apicamila-backend
npm install

Frontend:
cd ../apicamila-frontend
npm install

Configuração do .env (Backend)

Crie um arquivo .env dentro de apicamila-backend:

JWT_SECRET=APICamilaLab2025
PORT=3000

Rodando a aplicação
Backend
cd apicamila-backend
node server.js


Servidor rodando em http://localhost:3000.

Frontend
cd apicamila-frontend
npm start


Frontend rodando em http://localhost:3001.

Rotas da API
Cadastro de usuário
POST /register


Body JSON:

{
  "name": "Camila",
  "email": "camila@example.com",
  "password": "123456"
}

Login
POST /login


Body JSON:

{
  "email": "camila@example.com",
  "password": "123456"
}


Resposta (token JWT):

{
  "message": "Login bem-sucedido!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Perfil (rota protegida)
GET /profile


Header:

Authorization: Bearer <token>


Resposta JSON:

{
  "user": {
    "id": 1,
    "name": "Camila",
    "email": "camila@example.com"
  }
}

Testando a API

Use Thunder Client, Postman ou curl:

curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"name":"Teste","email":"teste@example.com","password":"123456"}'





