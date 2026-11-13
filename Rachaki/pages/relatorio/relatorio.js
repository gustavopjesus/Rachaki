// 1. PEGAR OS ELEMENTOS DA PÁGINA
const textoTotalGasto = document.getElementById("total-gasto");
const textoTotalParticipantes = document.getElementById("total-participantes");
const textoPorPessoa = document.getElementById("por-pessoa");
const corpoTabela = document.getElementById("corpo-tabela");
const botaoNovoRacha = document.getElementById("novo-racha");

// 2. LER O QUE FOI SALVO NA PÁGINA DESPESAS
let participantes = JSON.parse(localStorage.getItem("participantes")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

// 3. SOMAR TODOS OS GASTOS
let total = 0;

despesas.forEach(function (gasto) {
    total = total + gasto.valor;
});

// 4. CALCULAR QUANTO CADA UM DEVERIA PAGAR
let porPessoa = 0;

if (participantes.length > 0) {
    porPessoa = total / participantes.length;
}

// 5. MOSTRAR OS TRÊS CARTÕES DO RESUMO
textoTotalGasto.textContent = "R$ " + total.toFixed(2);
textoTotalParticipantes.textContent = participantes.length;
textoPorPessoa.textContent = "R$ " + porPessoa.toFixed(2);

// 6. MONTAR A TABELA: UMA LINHA PARA CADA PARTICIPANTE
participantes.forEach(function (nome) {

    // quanto essa pessoa pagou no total
    let pagou = 0;

    despesas.forEach(function (gasto) {
        if (gasto.pagou === nome) {
            pagou = pagou + gasto.valor;
        }
    });

    // saldo = o que pagou menos a parte dela (arredondado em 2 casas)
    const saldo = Math.round((pagou - porPessoa) * 100) / 100;

    // criar a linha e as células
    const linha = document.createElement("tr");
    const celulaNome = document.createElement("td");
    const celulaPagou = document.createElement("td");
    const celulaSaldo = document.createElement("td");

    celulaNome.textContent = nome;
    celulaPagou.textContent = "R$ " + pagou.toFixed(2);

    // saldo positivo recebe (verde), negativo deve (coral), zero fica cinza
    const etiquetaSaldo = document.createElement("span");

    if (saldo > 0) {
        etiquetaSaldo.textContent = "+R$ " + saldo.toFixed(2);
        etiquetaSaldo.classList.add("saldo-positivo");
    } else if (saldo < 0) {
        etiquetaSaldo.textContent = "-R$ " + Math.abs(saldo).toFixed(2);
        etiquetaSaldo.classList.add("saldo-negativo");
    } else {
        etiquetaSaldo.textContent = "R$ 0.00";
        etiquetaSaldo.classList.add("saldo-zero");
    }

    celulaSaldo.appendChild(etiquetaSaldo);

    // colocar as células na linha e a linha na tabela
    linha.appendChild(celulaNome);
    linha.appendChild(celulaPagou);
    linha.appendChild(celulaSaldo);

    corpoTabela.appendChild(linha);
});

// 7. BOTÃO NOVO RACHA: APAGA TUDO E RECOMEÇA
botaoNovoRacha.addEventListener("click", function () {
    const certeza = confirm("Apagar todos os participantes e gastos?");

    if (certeza) {
        localStorage.removeItem("participantes");
        localStorage.removeItem("despesas");
        location.reload();
    }
});