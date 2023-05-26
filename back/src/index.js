const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const routes = require('./routes');

const app = express();
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.db = pool; // adicionando a instância do pool ao objeto request para facilitar o acesso ao banco de dados nas rotas
  next();
});
app.use(routes);

app.listen(3333);
