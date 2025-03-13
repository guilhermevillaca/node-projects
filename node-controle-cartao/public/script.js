document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cartaoForm")) {
        document.getElementById("cartaoForm").addEventListener("submit", async function (e) {
            e.preventDefault();
            const cartao = {
                nome: document.getElementById("nome").value,
                bandeira: document.getElementById("bandeira").value,
                limite: parseFloat(document.getElementById("limite").value),
                validade: document.getElementById("validade").value,
                fechamento: parseInt(document.getElementById("fechamento").value),
                vencimento: parseInt(document.getElementById("vencimento").value)
            };

            const response = await fetch("/cartoes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartao)
            });

            if (response.ok) {
                alert("Cartão cadastrado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao cadastrar cartão.");
            }
        });

        // Listar cartões cadastrados
        fetch("/cartoes")
            .then(response => response.json())
            .then(cartoes => {
                const lista = document.getElementById("listaCartoes");
                lista.innerHTML = ""; // Limpar antes de inserir novos
                cartoes.forEach(cartao => {
                    const li = document.createElement("li");
                    li.textContent = `${cartao.nome} - ${cartao.bandeira} (Limite: R$${cartao.limite.toFixed(2)})`;
                    lista.appendChild(li);
                });
            })
            .catch(error => console.error("Erro ao buscar cartões:", error));
    }

    if (document.getElementById("gastoForm")) {
        // Carregar cartões no select de gastos
        fetch("/cartoes")
            .then(response => response.json())
            .then(cartoes => {
                const select = document.getElementById("cartao");
                select.innerHTML = ""; // Limpar antes de inserir novos
                cartoes.forEach(cartao => {
                    const option = document.createElement("option");
                    option.value = cartao.id; // Usando `id` correto do MySQL
                    option.textContent = cartao.nome;
                    select.appendChild(option);
                });
            })
            .catch(error => console.error("Erro ao carregar cartões:", error));

        document.getElementById("gastoForm").addEventListener("submit", async function (e) {
            e.preventDefault();
            const gasto = {
                cartaoId: parseInt(document.getElementById("cartao").value), // Alterado para cartaoId
                descricao: document.getElementById("descricao").value,
                valorTotal: parseFloat(document.getElementById("valorTotal").value),
                parcelas: parseInt(document.getElementById("parcelas").value),
                dataCompra: document.getElementById("dataCompra").value
            };

            const response = await fetch("/gastos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gasto)
            });

            if (response.ok) {
                alert("Gasto cadastrado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao cadastrar gasto.");
            }
        });
    }
});
