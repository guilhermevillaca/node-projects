const express = require('express');
const { Pool } = require("pg"); // Importa Pool corretamente
const app = express();

app.use(express.static('public'));

// Criando conexão com o banco
const conexao = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "node2",
    port: 5432
});

conexao.connect()
    .then(() => {
        console.log("Conectado ao PostgreSQL!");
        inicializarBanco();
        inserirPessoa("Guilherme");
        inserirUsuario("Guilherme Villaca", "guidvillaca@gmail.com");
    })
    .catch(err => console.error("Erro de conexão:", err));

function inicializarBanco() {
    const queries = [
        `CREATE TABLE IF NOT EXISTS usuario (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS pessoa(
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL
        )`,
        `TRUNCATE TABLE usuario`,
        `TRUNCATE TABLE pessoa`
    ];

    queries.forEach(query => {
        console.log(query);
        try {
            conexao.query(query);
            console.log("Tabelas criadas com sucesso!");
        } catch (error) {
            console.error("Erro ao criar tabelas:", error);
        }
    })
}
//insert na tabela pessoa
async function inserirPessoa(nome){
    try {
        await conexao.query('INSERT INTO pessoa(nome) VALUES ($1)', [nome]);
        console.log(`Pessoa ${nome} inserido com sucesso`);        
    } catch (error) {
        console.error(error);
    }
}
//insert na tabela usuario
async function inserirUsuario(nome, email){
    try {
        await conexao.query('INSERT INTO usuario(nome, email) VALUES ($1, $2)', 
            [nome, email]);
        console.log(`Usuário ${nome} inserido com sucesso`);        
    } catch (error) {
        console.error(error);
    }
}
//select nas duas tabelas
async function buscarPessoa(){
    const {rows} = await conexao.query('SELECT * FROM pessoa');
    return rows;
}

async function buscarUsuario(){
    const {rows} = await conexao.query('SELECT * FROM usuario');
    return rows;
}

app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.get('/pessoa', async (req, res) => {
    let resposta = await buscarPessoa();
    console.log(resposta);
    res.send(resposta);
});

app.get('/usuario', async (req, res) => {
    let resposta = await buscarUsuario();
    console.log(resposta);
    res.send(resposta);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});