function buscarPessoas() {
    fetch('/pessoa')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.pessoas');
            container.innerHTML = ''; // Limpa o conteúdo antes de inserir novos dados

            if (data.length === 0) {
                container.innerHTML = '<p>Nenhuma pessoa encontrada.</p>';
                return;
            }

            data.forEach(pessoa => {
                const div = document.createElement('div');
                div.classList.add('pessoa-item'); // Classe para estilização
                div.innerHTML = `
                    <p><strong>ID:</strong> ${pessoa.id} - 
                    <strong>Nome:</strong> ${pessoa.nome}</p>
                    <button onclick="buscarPessoaPorId(${pessoa.id})">Buscar</button>                    
                    <a href="/pessoa/form.html?id=${pessoa.id}">Editar</button>
                    <button onclick="deletarPessoa(${pessoa.id})">Deletar</button>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao buscar pessoas:', error));
}

function buscarPessoaPorId(id) {
    fetch(`/pessoa/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const container = document.querySelector('.pessoa');
            container.innerHTML = ''; // Limpa o conteúdo antes de inserir novos dados

            if (!data) {
                container.innerHTML = `<p>Nenhuma pessoa encontrada com ID ${id}.</p>`;
                return;
            }

            const div = document.createElement('div');
            div.classList.add('pessoa-item');
            div.innerHTML = `<p><strong>ID:</strong> ${data.id} - <strong>Nome:</strong> ${data.nome}</p>`;
            container.appendChild(div);

        })
        .catch(error => console.error(`Erro ao buscar pessoa com ID ${id}:`, error));
}

function verificarIdPessoa() {

    // Captura a URL atual
    const urlParams = new URLSearchParams(window.location.search);

    // Obtém o valor do parâmetro "id"
    const id = urlParams.get("id");

    console.log(id);

    if(id){
        fetch(`/pessoa/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const id = document.querySelector('#id');
            id.value = data.id;

            const nome = document.querySelector('#nome');
            nome.value = data.nome;

        })
        .catch(error => console.error(`Erro ao buscar pessoa com ID ${id}:`, error));
    }


}

function salvarPessoa(){
    var nome = document.querySelector("#nome").value;
    var id = document.querySelector("#id").value;

    if(id){
        atualizarPessoa(id, nome);
    }else{
        inserirPessoa(nome);
    }
}

function inserirPessoa(nome) {    
    fetch('/pessoa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Erro ao inserir pessoa:', error));
}

function atualizarPessoa(id, novoNome) {
    fetch(`/pessoa/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: novoNome })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(`Erro ao atualizar pessoa com ID ${id}:`, error));
}

function deletarPessoa(id) {
    fetch(`/pessoa/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(`Erro ao deletar pessoa com ID ${id}:`, error));
}


function buscarUsuarios() {
    fetch('/usuario')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.usuarios');
            container.innerHTML = ''; // Limpa o conteúdo antes de inserir novos dados

            if (data.length === 0) {
                container.innerHTML = '<p>Nenhum usuário encontrado.</p>';
                return;
            }

            data.forEach(usuario => {
                const div = document.createElement('div');
                div.classList.add('usuario-item'); // Classe para estilização
                div.innerHTML = `
                    <p><strong>ID:</strong> ${usuario.id} - 
                    <strong>Nome:</strong> ${usuario.nome}</p>
                    <strong>E-mail:</strong> ${usuario.email}</p>
                    <button onclick="buscarUsuarioPorId(${usuario.id})">Buscar</button>                  
                    <a href="/usuario/form.html?id=${usuario.id}">Editar</button>
                    <button onclick="deletarUsuario(${usuario.id})">Deletar</button>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao buscar usuarios:', error));
}

function buscarUsuarioPorId(id) {
    fetch(`/usuario/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const container = document.querySelector('.usuario');
            container.innerHTML = ''; // Limpa o conteúdo antes de inserir novos dados

            if (!data) {
                container.innerHTML = `<p>Nenhum usuário encontrado com ID ${id}.</p>`;
                return;
            }

            const div = document.createElement('div');
            div.classList.add('usuario-item');
            div.innerHTML = `<p><strong>ID:</strong> ${data.id} - <strong>Nome:</strong> ${data.nome} 
            - <strong>E-mail:</strong> ${data.email}</p>`;
            container.appendChild(div);

        })
        .catch(error => console.error(`Erro ao buscar usuário com ID ${id}:`, error));
}


function verificarIdUsuario() {

    // Captura a URL atual
    const urlParams = new URLSearchParams(window.location.search);

    // Obtém o valor do parâmetro "id"
    const id = urlParams.get("id");

    console.log(id);

    if(id){
        fetch(`/usuario/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const id = document.querySelector('#id');
            id.value = data.id;

            const nome = document.querySelector('#nome');
            nome.value = data.nome;

            const email = document.querySelector('#email');
            email.value = data.email;

        })
        .catch(error => console.error(`Erro ao buscar usuário com ID ${id}:`, error));
    }


}

function salvarUsuario(){
    var nome = document.querySelector("#nome").value;
    var id = document.querySelector("#id").value;
    var email = document.querySelector("#email").value;

    if(id){
        atualizarUsuario(id, nome, email);
    }else{
        inserirUsuario(nome, email);
    }
}


function inserirUsuario() {
    var nome = document.querySelector("#nome").value;
    var email = document.querySelector("#email").value;
    console.log(nome);
    fetch('/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Erro ao inserir pessoa:', error));
}

function atualizarUsuario(id, nome, email) {
    fetch(`/usuario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(`Erro ao atualizar pessoa com ID ${id}:`, error));
}

function deletarUsuario(id) {
    fetch(`/usuario/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(`Erro ao deletar usuário com ID ${id}:`, error));
}

/**
 * Como usar
 * buscarPessoas(); // Lista todas as pessoas
buscarPessoaPorId(1); // Busca pessoa com ID 1
inserirPessoa('Carlos'); // Insere uma nova pessoa chamada Carlos
atualizarPessoa(2, 'Ana Clara'); // Atualiza pessoa com ID 2 para o nome Ana Clara
deletarPessoa(3); // Deleta pessoa com ID 3
 */