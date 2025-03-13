const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("controle_cartao", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Desativar logs do SQL no console
});

sequelize.authenticate()
    .then(() => console.log("Conectado ao MySQL"))
    .catch(err => console.error("Erro ao conectar ao MySQL:", err));

module.exports = sequelize;
