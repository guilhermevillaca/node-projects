const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cartao = require("./Cartao");

const Gasto = sequelize.define("Gasto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valorParcela: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    parcelas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cartaoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cartao,
            key: "id"
        },
        allowNull: false
    }
}, {
    tableName: "gastos",
    timestamps: false
});

// Criar relação entre Cartão e Gasto
Cartao.hasMany(Gasto, { foreignKey: "cartaoId" });
Gasto.belongsTo(Cartao, { foreignKey: "cartaoId" });

module.exports = Gasto;
