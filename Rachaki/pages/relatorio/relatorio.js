
const textoTotalGasto = document.getElementById("total-gasto");
const textoTotalParticipantes = document.getElementById("total-participantes");
const textoPorPessoa = document.getElementById("por-pessoa");
const corpoTabela = document.getElementById("corpo-tabela");
const botaoNovoRacha = document.getElementById("novo-racha");


let participantes = JSON.parse(localStorage.getItem("participantes")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];


let total = 0;

despesas.forEach(function (gasto) {
    total = total + gasto.valor;
});


let porPessoa = 0;

if (participantes.length > 0) {
    porPessoa = total / participantes.length;
}


textoTotalGasto.textContent = "R$ " + total.toFixed(2);
textoTotalParticipantes.textContent = participantes.length;
textoPorPessoa.textContent = "R$ " + porPessoa.toFixed(2);


participantes.forEach(function (nome) {

    
    let pagou = 0;

    despesas.forEach(function (gasto) {
        if (gasto.pagou === nome) {
            pagou = pagou + gasto.valor;
        }
    });

    
    const saldo = Math.round((pagou - porPessoa) * 100) / 100;

    
    const linha = document.createElement("tr");
    const celulaNome = document.createElement("td");
    const celulaPagou = document.createElement("td");
    const celulaSaldo = document.createElement("td");

    celulaNome.textContent = nome;
    celulaPagou.textContent = "R$ " + pagou.toFixed(2);

    
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

   
    linha.appendChild(celulaNome);
    linha.appendChild(celulaPagou);
    linha.appendChild(celulaSaldo);

    corpoTabela.appendChild(linha);
});


botaoNovoRacha.addEventListener("click", function () {
    const certeza = confirm("Apagar todos os participantes e gastos?");

    if (certeza) {
        localStorage.removeItem("participantes");
        localStorage.removeItem("despesas");
        location.reload();
    }
});