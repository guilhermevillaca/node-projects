module.exports = {
    development: {
      username: 'root',  // Usuário do banco de dados
      password: 'root',  // Senha do banco de dados
      database: 'controle_cartao',  // Nome do banco de dados
      host: '127.0.0.1',
      dialect: 'mysql',  // Dialeto do banco de dados (pode ser mysql, postgres, etc.)
    },
    test: {
      username: 'root',
      password: 'senha',
      database: 'nome_do_banco_test',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: 'root',
      password: 'senha',
      database: 'nome_do_banco_prod',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
  