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
  res.send({Sucesso: req.userId})
}

// Delete da cookie
const UUIDDelete = async (req,res) => {

  const deleteUUID = pool.query("DELETE FROM todousers WHERE uuid = $1", [req.userId])

  res.clearCookie('userId', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  res.send({Sucesso: "Cookie limpada e UUID e seus registros deletados da DB"});
}

//-------------------------------------------
// Queries routes

// Criar todo
const createTodo = async (req, res) => {
  try {
    const { name, description, tags = [], date, time } = req.body;

    const hasTime = time !== null ? true : false
    
    const treatedName = middlewares.treatStr(name)
    const treatedDesc = middlewares.treatStr(description)
    const treatedTags = middlewares.treatArr(tags)
    
    if (treatedName === null) {
      res.send({Erro: "Necessário preencher o campo de nome"})
    }
    
    await middlewares.UUIDCheck(req.userId)


    const { rows: [{ id: todoId }] } = await pool.query(
      `INSERT INTO todos (name, description, user_uuid, date ${hasTime ? ", time" : ""}) VALUES ($1, $2, $3, $4 ${hasTime ? ", $5" : ""}) RETURNING id`,
      hasTime? [treatedName, treatedDesc, req.userId, date, time] : [treatedName, treatedDesc, req.userId, date]
    );

    if (treatedTags.length > 0) {
      // insere todas as tags de uma vez, ignora duplicatas
      await pool.query(
        "INSERT INTO tags (name, user_uuid) SELECT UNNEST($1::text[]), $2 ON CONFLICT (name, user_uuid) DO NOTHING",
        [treatedTags, req.userId]
      );

      // busca os ids de todas as tags
      const { rows: tagRows } = await pool.query(
        "SELECT id FROM tags WHERE name = ANY($1) AND user_uuid = $2",
        [treatedTags, req.userId]
      );

      // insere todas as relações de uma vez
      const tagValues = tagRows.map(t => t.id);
      await pool.query(
        "INSERT INTO todo_tags (todo_id, tag_id) SELECT $1, UNNEST($2::int[])",
        [todoId, tagValues]
      );
    }

    res.send({sucesso: `Todo: ${treatedName} criado na UUID: ${req.userId}`});
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar todo");
  }
};

// Criar uma tag
const createTag = async (req, res) => {

  const { name = [] } = req.body;

  const treatedName = middlewares.treatArr(name)
  middlewares.UUIDCheck(req.userId)

  const newTodo = await pool.query("INSERT INTO tags (name, user_uuid) SELECT UNNEST($1::text[]), $2 ON CONFLICT (name, user_uuid) DO NOTHING RETURNING *", [treatedName, req.userId]);
  

  if (newTodo.rows.length === 0) {
    res.send({Erro: `${treatedName.length > 1 ? "Essas tags" : "Essa tag"} já existe.`})
    return;
  }

  res.send({sucesso: `${treatedName.length > 1 ? "Tags criadas!" : "Tag criada!"}`, tags: treatedName});

}

// GetAllTags
const getTag = async (req, res) => {

  middlewares.UUIDCheck(req.userId)

  const tags = await pool.query("SELECT name, id FROM tags WHERE user_uuid = $1", [req.userId]);

  if (tags.rows.length === 0) {
    res.send({Erro: "Você não criou nenhuma tag ainda"});
    return
  }

  res.send(tags.rows);

}

// GetAllTodos
const getTodos = async (req, res) => {
  const { tag, name } = req.query;

  try {
    const tags = tag ? (Array.isArray(tag) ? tag : [tag]) : null;
    const values = [req.userId];
    let i = 2;

    let having = '';
    if (tags) {
      having = `HAVING array_agg(tags.name) @> $${i++}::text[]`;
      values.push(tags);
    }

    let where = `WHERE todos.user_uuid = $1`;
    if (name) {
      where += ` AND todos.name ILIKE $${i++}`;
      values.push(`%${name}%`);
    }

    const result = await pool.query(
      `
      SELECT todos.*, json_agg(tags.name) as tags
      FROM todos
      LEFT JOIN todo_tags ON todo_tags.todo_id = todos.id
      LEFT JOIN tags ON tags.id = todo_tags.tag_id
      ${where}
      GROUP BY todos.id
      ${having}
      ORDER BY date, time, created_at ASC`,
      values
    );

    if (result.rows.length === 0) {
      return res.send({ erro: "Nenhum afazer encontrado!" });
    }

    res.send(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: "Erro interno ao buscar afazeres." });
  }
};

// Deletar todo
const deleteTodo = async (req, res) => {

  const id = req.body.id;

  try {

    const deletion = await pool.query("DELETE FROM todos WHERE user_uuid = $1 and id = $2", [req.userId, id]);
    
    if (deletion.rowCount === 0) {
      return res.status(404).send({erro: "Todo não encontrada."})
    }

    res.send({Sucesso: "Todo deletada!"});

  }
    
  catch (err) {
    console.error(err);
    res.status(500).send({ erro: "Erro interno ao deletar a todo." });
  }

};

// Deletar tag
const deleteTag = async (req, res) => {

  const id = req.body.id;
  console.log(id)

  try {

    const deletion = await pool.query("DELETE FROM tags WHERE user_uuid = $1 and id = $2 RETURNING name", [req.userId, id]);
    res.send({sucesso: `Tag ${deletion.rows[0].name} deletada!`})

    if (deletion.rowCount === 0) {
      res.status(404).send({ notFound: "Nenhuma tag deletada"})
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: "Erro interno ao deletar tag"})
  }

};

// Alterar todo
const alterTodo = async (req, res) => {
  const { id, name, description, concluido } = req.body;

  const fields = [];
  const values = [];
  let i = 1;

  if (name) {
    fields.push(`name = $${i++}`);
    values.push(name);
  }
  if (description) {
    fields.push(`description = $${i++}`);
    values.push(description);
  }
  if (concluido) {
    fields.push(`concluido = $${i++}`);
    values.push(concluido);
  }

  if (fields.length === 0) {
    return res.status(400).send({ erro: "Nenhum campo para alterar!" });
  }

  values.push(req.userId, id);

  const query = `
    UPDATE todos 
    SET ${fields.join(", ")} 
    WHERE user_uuid = $${i++} AND id = $${i}
  `;

  const result = await pool.query(query, values);

  res.send({sucesso: "Todo atualizado"})
}

// Alterar tag
const alterTag = async (req, res) => {

  const { name, id } = req.body

  if (name) {
    res.send({erro: "Nenhuma alteração feita"})
  }

  const result = pool.query("UPDATE tags SET name = $1 WHERE id = $2 AND user_uuid = $3", [name, id, req.userId])
  res.send("Alteração realizada!")

}

// Complete todo
const completeTodo = async (req, res) => {

  const { todoId } = req.body

  const result = await pool.query("UPDATE todos SET concluido = NOT concluido WHERE id = $1 AND user_uuid = $2", [todoId, req.userId])

  res.send({Sucesso: "Todo checked/unchecked"})

}

// Append tags
const appendTag = async (req, res) => {
  
  const { tags = [], todoId, name } = req.body;

  if (tags.length === 0) {
    res.send({erro: "Dê um nome à tag"})
  }

  const tagCreate = await pool.query("INSERT INTO tags (name, user_uuid) SELECT UNNEST($1::text[]), $2 ON CONFLICT (name, user_uuid) DO NOTHING",
  [tags, req.userId]);

  const tagsIdObj = await pool.query("SELECT id FROM tags WHERE user_uuid = $1 AND name = ANY($2::text[])", [req.userId, tags])
  const tagsIdArr = tagsIdObj.rows.map(obj => obj.id);

  const result = await pool.query("INSERT INTO todo_tags (todo_id, tag_id) SELECT $1, UNNEST($2::int[]) ON CONFLICT (todo_id, tag_id) DO NOTHING", [todoId, tagsIdArr])

  res.send({sucesso: `${tags.length > 1 ? "Tags" : "Tag"} ${tags.join(", ")} associada a ${name}`})

}

//-------------------------------------------
//Others...

//Not found route
const notFound = (req,res) => {
  res.status(404).send({Erro: "Rota não encontrada"})
}

export default {UUID, UUIDCheck, UUIDDelete, notFound, createTodo , getTodos, deleteTodo, alterTodo, createTag, getTag, deleteTag, alterTag, appendTag, completeTodo}

