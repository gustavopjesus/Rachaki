const campoNome = document.getElementById("nome-participante");
const botaoParticipante = document.getElementById("botao-participante");
const listaParticipantes = document.getElementById("lista-participantes");
const selectQuemPagou = document.getElementById("quem-pagou");

const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const botaoGasto = document.getElementById("botao-gasto");

const corpoTabela = document.getElementById("corpo-tabela");

const spanTotal = document.getElementById("total");

let participantes = JSON.parse(localStorage.getItem("participantes")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];


function mostrarParticipantes() {
    listaParticipantes.innerHTML = "";
    selectQuemPagou.innerHTML = "";

    participantes.forEach(function (nome) {
        const etiqueta = document.createElement("span");
        etiqueta.textContent = nome;
        etiqueta.classList.add("etiqueta"); // adicionei
        listaParticipantes.appendChild(etiqueta);

        const opcao = document.createElement("option");
        opcao.textContent = nome;
        opcao.value = nome;
        selectQuemPagou.appendChild(opcao);
    });
}

function mostrarDespesas() {
    corpoTabela.innerHTML = "";
    let total = 0;

    despesas.forEach(function (gasto, indice) { // adicionei: o "indice"
        total = total + gasto.valor;

        const linha = document.createElement("tr");
        const celulaDescricao = document.createElement("td");
        const celulaPagou = document.createElement("td");
        const celulaValor = document.createElement("td");
        const celulaRemover = document.createElement("td"); // adicionei

        celulaDescricao.textContent = gasto.descricao;
        celulaPagou.textContent = gasto.pagou;
        celulaValor.textContent = "R$ " + gasto.valor.toFixed(2);

        const botaoRemover = document.createElement("button"); // adicionei
        botaoRemover.textContent = "Remover"; // adicionei
        botaoRemover.classList.add("remover"); // adicionei
        botaoRemover.addEventListener("click", function () { // adicionei
            despesas.splice(indice, 1); // adicionei
            localStorage.setItem("despesas", JSON.stringify(despesas)); // adicionei
            mostrarDespesas(); // adicionei
        }); // adicionei
        celulaRemover.appendChild(botaoRemover); // adicionei

        linha.appendChild(celulaDescricao);
        linha.appendChild(celulaPagou);
        linha.appendChild(celulaValor);
        linha.appendChild(celulaRemover); // adicionei

        corpoTabela.appendChild(linha);
    });
    spanTotal.textContent = total.toFixed(2);
}

botaoParticipante.addEventListener("click", function () {
    const nome = campoNome.value.trim(); // adicionei

    if (nome === "") { // adicionei
        alert("Digite o nome do participante."); // adicionei
        return; // adicionei
    } // adicionei

    if (participantes.includes(nome)) { // adicionei
        alert("Esse participante já foi adicionado."); // adicionei
        return; // adicionei
    } // adicionei

    participantes.push(nome);
    localStorage.setItem("participantes", JSON.stringify(participantes));
    mostrarParticipantes();
    campoNome.value = ""; // adicionei
});

botaoGasto.addEventListener("click", function () {
    const descricao = campoDescricao.value.trim(); // adicionei
    const valor = Number(campoValor.value); // adicionei

    if (descricao === "" || valor <= 0 || selectQuemPagou.value === "") { // adicionei
        alert("Preencha a descrição, um valor maior que zero e quem pagou."); // adicionei
        return; // adicionei
    } // adicionei

    const gasto = {
        descricao: descricao,
        valor: valor,
        pagou: selectQuemPagou.value
    };

    despesas.push(gasto);
    localStorage.setItem("despesas", JSON.stringify(despesas));
    mostrarDespesas();
    campoDescricao.value = "";
    campoValor.value = "";
});

mostrarParticipantes();
mostrarDespesas();