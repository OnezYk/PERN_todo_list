//-------------------------------------------
// Libraries
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // permite res.cookie
import routes from './routes.js'; // Import das rotas

//-------------------------------------------

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//-------------------------------------------
// Rotas UUID

app.use(routes.UUID); // Criação de um UUID único e coloca em um cookie ao user entrar

app.get("/UUID", routes.UUIDCheck); // Checar UUID

app.delete("/UUID", routes.UUIDDelete); // Deletar UUID

//-------------------------------------------
// Rotas DB

// Criação de um todo
app.post("/todos", routes.CreateTodo);

// Criação de uma tag
app.post("/tag", routes.CreateTag);

// GetTodos by tag
app.get("/todos", routes.GetTodos);

// Criação de uma tag
app.get("/tag", routes.GetTag);

//-------------------------------------------
// Rotas default

app.use(routes.notFound); // 404

//-------------------------------------------

app.listen(5000, () => console.log("server running on port 5000"));

