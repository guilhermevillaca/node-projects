const express = require("express");
const router = express.Router();
const Gasto = require("../models/Gasto");
const Cartao = require("../models/Cartao");

// Criar um novo gasto
router.post("/", async (req, res) => {
    try {
        const { cartaoId, descricao, dataCompra, valorTotal, parcelas } = req.body;
        console.log(cartaoId);
        const valorParcela = valorTotal / parcelas;
        const novoGasto = await Gasto.create({ 
            cartaoId, 
            descricao, 
            dataCompra, 
            valorTotal, 
            parcelas, 
            valorParcela 
        });

        res.status(201).json(novoGasto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao cadastrar o gasto" });
    }
});

// Listar todos os gastos
router.get("/", async (req, res) => {
    try {
        const gastos = await Gasto.findAll();
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar gastos" });
    }
});

module.exports = router;
