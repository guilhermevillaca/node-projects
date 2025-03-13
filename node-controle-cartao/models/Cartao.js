const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cartao = sequelize.define("Cartao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bandeira: {
        type: DataTypes.STRING,
        allowNull: false
    },
    limite: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    validade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vencimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "cartoes",
    timestamps: false
});

module.exports = Cartao;
