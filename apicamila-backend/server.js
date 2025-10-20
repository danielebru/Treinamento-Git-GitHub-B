import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { openDb, createTable } from "./database.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3001", // porta do seu React
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Cria a tabela de usuários se não existir
createTable();

// --- Rota de cadastro ---
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const db = await openDb();

  const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (userExists) return res.status(400).json({ error: "Usuário já existe" });

  const hash = await bcrypt.hash(password, 10);
  await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash]);
  res.json({ message: "Usuário cadastrado com sucesso!" });
});

// --- Rota de login ---
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login bem-sucedido!", token });
});

// --- Middleware para rotas protegidas ---
function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token ausente" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

// --- Rota de profile (protegida) ---
app.get("/profile", verifyToken, async (req, res) => {
  const db = await openDb();
  const user = await db.get("SELECT id, name, email FROM users WHERE id = ?", [req.user.id]);
  res.json({ user });
});

// --- Inicia o servidor ---
app.listen(process.env.PORT, () => console.log("🔥 Servidor APICamila rodando na porta " + process.env.PORT));

