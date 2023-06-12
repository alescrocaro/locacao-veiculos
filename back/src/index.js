const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const server = require('./routes/server.js')
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

app.use(cors());
app.use((req, res, next) => {
  req.db = pool; // adicionando a instância do pool ao objeto request para facilitar o acesso ao banco de dados nas rotas
  next();
});
server.listen(3333, () => console.log(`Server rodando na porta 3333`));
