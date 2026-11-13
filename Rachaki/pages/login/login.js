const formLogin = document.querySelector(".card-login form");
const formCadastro = document.querySelector(".card-cadastro form");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarMensagem(formulario, texto, sucesso) {
    let mensagem = formulario.querySelector(".mensagem");

    if (!mensagem) {
        mensagem = document.createElement("p");
        mensagem.classList.add("mensagem");
        formulario.appendChild(mensagem);
    }

    mensagem.textContent = texto;
    mensagem.style.color = sucesso ? "green" : "red";
}

formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome-cadastro").value.trim();
    const email = document.getElementById("email-cadastro").value.trim().toLowerCase();
    const senha = document.getElementById("senha-cadastro").value;

    if (nome === "" || email === "" || senha === "") {
        mostrarMensagem(formCadastro, "Preencha todos os campos.", false);
        return;
    }

    if (usuarios.some(usuario => usuario.email === email)) {
        mostrarMensagem(formCadastro, "Já existe uma conta com esse email.", false);
        return;
    }

    usuarios.push({ nome: nome, email: email, senha: senha });
    salvarUsuarios();

    mostrarMensagem(formCadastro, "Conta criada com sucesso! Agora faça o login.", true);
    formCadastro.reset();
});

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("email-login").value.trim().toLowerCase();
    const senha = document.getElementById("senha-login").value;

    const usuario = usuarios.find(item => item.email === email);

    if (!usuario) {
        mostrarMensagem(formLogin, "Conta não encontrada.", false);
        return;
    }

    if (usuario.senha !== senha) {
        mostrarMensagem(formLogin, "Senha incorreta.", false);
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify({ nome: usuario.nome, email: usuario.email }));
    window.location.href = "../despesas/despesas.html";
});