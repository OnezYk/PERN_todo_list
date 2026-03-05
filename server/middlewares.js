import pool from './db.js'

const UUIDCheck = async (UUID) => {

  const UUIDexistsQuery = await pool.query(`SELECT EXISTS (SELECT 1 FROM todoUsers WHERE uuid = $1)`,[UUID]);
  const UUIDexists = UUIDexistsQuery.rows[0].exists;

  if (!UUIDexists) {

    await pool.query("INSERT INTO todousers (uuid) VALUES ($1)", [UUID]);
    console.log("User registrado!");

  }

}

const treatArr = (arr) => {

  if (!arr) return null

    return arr.map(nome => nome.charAt(0).toUpperCase() + nome.slice(1));
  
}

const treatStr = (name) => {

  if (!name) return null

  return name.charAt(0).toUpperCase() + name.slice(1);

}

export default {UUIDCheck, treatArr, treatStr}