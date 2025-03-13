require("dotenv").config();
const express = require("express");

const cartaoRoutes = require("./routes/cartaoRoutes");
const gastoRoutes = require("./routes/gastoRoutes");

const sequelize = require("./config/database");
const Cartao = require("./models/Cartao");
const Gasto = require("./models/Gasto");

sequelize.sync()
    .then(() => console.log("Tabelas sincronizadas com sucesso!"))
    .catch(err => console.error("Erro ao sincronizar tabelas:", err));


const app = express();
app.use(express.json());
app.use(express.static('public'));

// Rota básica para testar
app.get("/", (req, res) => {
  res.send("API de Controle de Fatura de Cartão de Crédito");
});

app.use("/cartoes", cartaoRoutes);
app.use("/gastos", gastoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
