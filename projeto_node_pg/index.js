const express = require('express');
const { Pool } = require("pg"); // Importa Pool corretamente
const app = express();

app.use(express.static('public'));
app.use(express.json()); // Adiciona suporte para JSON no body das requisições

// Criando conexão com o banco
const conexao = new Pool({
    host: "localhost",
    user: "postgres",
    password: "123456",
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
        `TRUNCATE TABLE usuario RESTART IDENTITY`,
        `TRUNCATE TABLE pessoa RESTART IDENTITY`
    ];

    queries.forEach(async (query) => {
        console.log(query);
        try {
            await conexao.query(query);
            console.log("Tabelas criadas com sucesso!");
        } catch (error) {
            console.error("Erro ao criar tabelas:", error);
        }
    });
}

// Inserção na tabela pessoa
async function inserirPessoa(nome) {
    try {
        await conexao.query('INSERT INTO pessoa(nome) VALUES ($1)', [nome]);
        console.log(`Pessoa ${nome} inserida com sucesso`);
    } catch (error) {
        console.error(error);
    }
}

// Inserção na tabela usuario
async function inserirUsuario(nome, email) {
    try {
        await conexao.query('INSERT INTO usuario(nome, email) VALUES ($1, $2)', [nome, email]);
        console.log(`Usuário ${nome} inserido com sucesso`);
    } catch (error) {
        console.error(error);
    }
}

// Busca todos os registros
async function buscarPessoa() {
    const { rows } = await conexao.query('SELECT * FROM pessoa');
    return rows;
}

async function buscarUsuario() {
    const { rows } = await conexao.query('SELECT * FROM usuario');
    return rows;
}

// Busca por ID
async function buscarPessoaPorId(id) {
    const { rows } = await conexao.query('SELECT * FROM pessoa WHERE id = $1', [id]);
    return rows[0];
}

async function buscarUsuarioPorId(id) {
    const { rows } = await conexao.query('SELECT * FROM usuario WHERE id = $1', [id]);
    return rows[0];
}

// Atualiza registros
async function atualizarPessoa(id, nome) {
    await conexao.query('UPDATE pessoa SET nome = $1 WHERE id = $2', [nome, id]);
    console.log(`Pessoa ${id} atualizada para ${nome}`);
}

async function atualizarUsuario(id, nome, email) {
    await conexao.query('UPDATE usuario SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
    console.log(`Usuário ${id} atualizado para ${nome}, ${email}`);
}

// Deleta registros
async function deletarPessoa(id) {
    await conexao.query('DELETE FROM pessoa WHERE id = $1', [id]);
    console.log(`Pessoa ${id} deletada`);
}

async function deletarUsuario(id) {
    await conexao.query('DELETE FROM usuario WHERE id = $1', [id]);
    console.log(`Usuário ${id} deletado`);
}

// Rotas
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.get('/pessoa', async (req, res) => {
    let resposta = await buscarPessoa();
    res.json(resposta);
});

app.get('/usuario', async (req, res) => {
    let resposta = await buscarUsuario();
    res.json(resposta);
});

app.get('/pessoa/:id', async (req, res) => {
    let resposta = await buscarPessoaPorId(req.params.id);
    res.json(resposta);
});

app.get('/usuario/:id', async (req, res) => {
    let resposta = await buscarUsuarioPorId(req.params.id);
    res.json(resposta);
});

app.post('/pessoa', async (req, res) => {
    await inserirPessoa(req.body.nome);
    res.send('Pessoa inserida com sucesso!');
});

app.post('/usuario', async (req, res) => {
    await inserirUsuario(req.body.nome, req.body.email);
    res.send('Usuário inserido com sucesso!');
});

app.put('/pessoa/:id', async (req, res) => {
    await atualizarPessoa(req.params.id, req.body.nome);
    res.send('Pessoa atualizada com sucesso!');
});

app.put('/usuario/:id', async (req, res) => {
    await atualizarUsuario(req.params.id, req.body.nome, req.body.email);
    res.send('Usuário atualizado com sucesso!');
});

app.delete('/pessoa/:id', async (req, res) => {
    await deletarPessoa(req.params.id);
    res.send('Pessoa deletada com sucesso!');
});

app.delete('/usuario/:id', async (req, res) => {
    await deletarUsuario(req.params.id);
    res.send('Usuário deletado com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
