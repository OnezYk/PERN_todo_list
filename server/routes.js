//-------------------------------------------
// Imports

import pool from './db.js'
import { v4 as uuidv4 } from 'uuid'; // universally unique identifier para um ID de sessão
import middlewares from './middlewares.js';

//-------------------------------------------
// UUID routes



// Geração de UUID e storing dele no cookie
const UUID = (req, res, next) => {

  let userId = req.cookies.userId;
  
  if (!userId) {

    //gera um UUID em string em req.cookies.userId
    userId = uuidv4();

    //aplica a string 
    res.cookie("userId", userId, {

      maxAge: 30 * 25 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
      
    });
  };
  
  req.userId = userId;
  next();
}

// Checkagem do UUID
const UUIDCheck = (req,res) => {
  res.send(req.userId)
}

// Delete da cookie
const UUIDDelete = async (req,res) => {

  const deleteUUID = pool.query("DELETE FROM todousers WHERE uuid = $1", [req.userId])

  res.clearCookie('userId', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  res.send({"Success": "Cookie limpada e UUID e seus registros deletados da DB"});
}

//-------------------------------------------
// Queries routes

// Criar um todo
const CreateTodo = async (req, res) => {
  try {
    const { name, description, tags = [] } = req.body;

    await middlewares.UUIDCheck(req.userId)

    const { rows: [{ id: todoId }] } = await pool.query(
      "INSERT INTO todos (name, description, user_uuid) VALUES ($1, $2, $3) RETURNING id",
      [name, description, req.userId]
    );

    if (tags.length > 0) {
      // insere todas as tags de uma vez, ignora duplicatas
      await pool.query(
        "INSERT INTO tags (name, user_uuid) SELECT UNNEST($1::text[]), $2 ON CONFLICT (name, user_uuid) DO NOTHING",
        [tags, req.userId]
      );

      // busca os ids de todas as tags
      const { rows: tagRows } = await pool.query(
        "SELECT id FROM tags WHERE name = ANY($1) AND user_uuid = $2",
        [tags, req.userId]
      );

      // insere todas as relações de uma vez
      const tagValues = tagRows.map(t => t.id);
      await pool.query(
        "INSERT INTO todo_tags (todo_id, tag_id) SELECT $1, UNNEST($2::int[])",
        [todoId, tagValues]
      );
    }

    res.send(`Todo criado! ${name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar todo");
  }
};

// Criar uma tag
const CreateTag = async (req, res) => {

  const { name } = req.body;

  middlewares.UUIDCheck(req.userId)

  const newTodo = await pool.query("INSERT INTO tags (name, user_uuid) VALUES ($1, $2) RETURNING *", [name, req.userId]);

  res.send (`tag criada! ${name}`);

}

// GetAllTags
const GetTag = async (req, res) => {

  middlewares.UUIDCheck(req.userId)

  const tags = await pool.query("SELECT name FROM tags WHERE user_uuid = $1", [req.userId]);

  if (tags.rows.length === 0) {
    res.send({"Erro": "Você não criou nenhuma tag ainda"});
    return
  }

  res.send(tags.rows);

}

// GetAllTodos
const GetTodos = async (req, res) => {

  const { tag } = req.query;

  const result = await pool.query(
    `
    SELECT todos.*
    FROM todos
    JOIN todo_tags ON todo_tags.todo_id = todos.id
    JOIN tags ON tags.id = todo_tags.tag_id
    WHERE todos.user_uuid = $1
    AND tags.name = $2;
    `,
    [req.userId, tag]
  );
  
  if (tag) {
    
        if (result.rows.length === 0) {
          res.send({"Erro": "Nenhum afazer encontrado com esses filtros!"});
          return
        }

    res.send(result)
    
    return;  
  } else {
    
    const result = await pool.query("SELECT * FROM todos WHERE user_uuid = $1", [req.userId]);
    
    if (result.rows.length === 0) {
      res.send({"Erro": "Você ainda não criou nenhum afazer!"});
    }

    res.send(result)

  }

}

// Deletar todo

// Deletar tag

// Alterar todo

// Alterar tag

//-------------------------------------------
//Others...

//Not found route
const notFound = (req,res) => {
  res.status(404).send("No route found")
}

export default {UUID, UUIDCheck, UUIDDelete,CreateTodo , notFound, GetTodos, CreateTag, GetTag}

