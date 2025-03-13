const express = require("express");
const router = express.Router();
const Cartao = require("../models/Cartao");

// Criar um novo cartão
router.post("/", async (req, res) => {
  try {
    const { nome, bandeira, limite, validade, fechamento, vencimento } = req.body;
    
    const novoCartao = await Cartao.create({
      nome,
      bandeira,
      limite,
      validade,
      fechamento,
      vencimento,
    });

    res.status(201).json(novoCartao);
  } catch (error) {
    console.error("Erro ao cadastrar o cartão:", error);
    res.status(500).json({ error: "Erro ao cadastrar o cartão" });
  }
});

// Listar todos os cartões
router.get("/", async (req, res) => {
  try {
    const cartoes = await Cartao.findAll();
    res.json(cartoes);
  } catch (error) {
    console.error("Erro ao buscar cartões:", error);
    res.status(500).json({ error: "Erro ao buscar cartões" });
  }
});

module.exports = router;
