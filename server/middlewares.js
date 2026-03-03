import pool from './db.js'

const UUIDCheck = async (UUID) => {

  const UUIDexistsQuery = await pool.query(`SELECT EXISTS (SELECT 1 FROM todoUsers WHERE uuid = $1)`,[UUID]);
  const UUIDexists = UUIDexistsQuery.rows[0].exists;

  if (!UUIDexists) {

    const userUUID = await pool.query("INSERT INTO todousers (uuid) VALUES ($1)", [UUID]);
    console.log("User registrado!");

  }

}

export default {UUIDCheck}