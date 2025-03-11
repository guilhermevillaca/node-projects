const express = require('express');
const app = express();

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node'
});

connection.connect(err => {
  if (err) {
    console.error('Erro de conexão:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

const query = `CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
  );`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Erro ao criar tabela", err);
    } else {
      console.log("Tabela criada com sucesso");
    }
  });
  

  const insertQuery = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";
  const values = ['João', 'joao@email.com'];
  connection.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir usuário", err);
    } else {
      console.log("Usuário inserido com sucesso");
    }
  });

  const selectQuery = "SELECT * FROM usuarios";
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários", err);
    } else {
      console.log("Usuários encontrados:", results);
    }
  });
  
  


app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
