const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Configuração do banco de dados
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
    inicializarBanco();
  }
});

// Função para criar tabelas e limpar dados ao iniciar
function inicializarBanco() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS pessoas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL
    )`,
    `TRUNCATE TABLE usuarios`,
    `TRUNCATE TABLE pessoas`
  ];

  queries.forEach(query => {
    connection.query(query, (err) => {
      if (err) {
        console.error("Erro ao executar query:", err);
      }
    });
  });

  console.log("Banco de dados inicializado!");
}

// Função genérica para executar queries
function executarQuery(query, params = [], callback = () => {}) {
  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro ao executar query:", err);
    } else {
      callback(results);
    }
  });
}

// Inserção de dados
function inserirUsuario(nome, email) {
  executarQuery('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], () => {
    console.log(`Usuário ${nome} inserido com sucesso!`);
  });
}

function inserirPessoa(nome) {
  executarQuery('INSERT INTO pessoas (nome) VALUES (?)', [nome], () => {
    console.log(`Pessoa ${nome} inserida com sucesso!`);
  });
}

// Busca de dados
function buscarUsuarios(callback) {
  executarQuery('SELECT * FROM usuarios', [], callback);
}

function buscarPessoas(callback) {
  executarQuery('SELECT * FROM pessoas', [], callback);
}

// Rotas
app.get('/listarPessoas', (req, res) => {
  buscarPessoas((pessoas) => {
    let resposta = '<h1>Lista de Pessoas:</h1><ul>';
    pessoas.forEach(pessoa => {
      resposta += `<li>${pessoa.id}: ${pessoa.nome}</li>`;
    });
    resposta += '</ul>';
    res.send(resposta);
  });
});

app.get('/listarUsuarios', (req, res) => {
  buscarUsuarios((usuarios) => {
    let resposta = '<h1>Lista de Usuários:</h1><ul>';
    usuarios.forEach(usuario => {
      resposta += `<li>${usuario.id}: ${usuario.nome}</li>`;
    });
    resposta += '</ul>';
    res.send(resposta);
  });
});

app.get('/', (req, res) => {
  inserirPessoa('João');
  inserirPessoa('Maria');
  inserirUsuario('João', 'joao@gmail.com');
  inserirUsuario('Maria', 'maria@gmail.com');
  
  res.send('Banco de dados inicializado e dados inseridos!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
