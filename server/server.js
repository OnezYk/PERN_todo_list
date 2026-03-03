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
app.post("/todos", routes.createTodo);

// Criação de uma tag
app.post("/tag", routes.createTag);

// Busca de todos by tag ou get all
app.get("/todos", routes.getTodos);

// Busca de tags
app.get("/tag", routes.getTag);

// Delete de todo
app.delete("/todos", routes.deleteTodo);

// Delete de tags
app.delete("/tag", routes.deleteTag);

// Update de todo
app.patch("/todos", routes.alterTodo);

// Update de tags
app.patch("/tag", routes.alterTag);

// Append tags
app.patch("/tag/append", routes.appendTag)

// Complete todo
app.patch("/todos/concluido", routes.completeTodo)

//-------------------------------------------
// Rotas default

app.use(routes.notFound); // 404

//-------------------------------------------

app.listen(5000, () => console.log("server running on port 5000"));

