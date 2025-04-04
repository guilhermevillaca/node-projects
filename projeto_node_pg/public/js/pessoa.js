class Pessoa {

    buscar() {
        
        var url = '/pessoa';
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
        
    }
    
    buscarPorId() {
        const id = 1; // Substituir pelo ID desejado
        fetch(`http://localhost:3000/pessoa/${id}`)
        .then(response => response.json())
        .then(data => console.log("Pessoa encontrada:", data))
        .catch(error => console.error("Erro ao buscar pessoa:", error));
        
    }
    
    inserir() {
        
        const novaPessoa = { nome: "João Silva" };
        
        fetch("http://localhost:3000/pessoa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaPessoa)
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Erro ao inserir pessoa:", error));
        
        
    }
    
    atualizar() {
        const id = 1; // Substituir pelo ID desejado
        const pessoaAtualizada = { nome: "Maria Souza" };
        
        fetch(`http://localhost:3000/pessoa/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pessoaAtualizada)
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Erro ao atualizar pessoa:", error));
        
    }
    
    deletar() {
        const id = 1; // Substituir pelo ID desejado
        
        fetch(`http://localhost:3000/pessoa/${id}`, {
            method: "DELETE"
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Erro ao deletar pessoa:", error));
        
    }
}

export default Pessoa;
