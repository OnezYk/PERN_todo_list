import pg from 'pg'

const pool = new pg.Pool ({
  user: "postgres",
  password: "123321",
  host: "localhost",
  port: 5432,
  database: "priorizadb"
})

export default pool;