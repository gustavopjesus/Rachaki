# Rachaki

Aplicação web para gerenciamento e divisão de despesas compartilhadas. Cadastre participantes, registre pagamentos e descubra quanto cada pessoa deve pagar ou receber.

Desenvolvido como projeto acadêmico para o Trabalho de PW1 da disciplina de Desenvolvimento Web, ministrada pelo professor Henrique Dias Pastor.

O projeto utiliza HTML, CSS e JavaScript puro, sem frameworks ou banco de dados.

## O problema

Em um grupo de amigos, uma pessoa paga o combustível, outra paga o mercado e outra fica responsável pelo pedágio. No final, pode ser difícil descobrir quanto cada participante realmente deve.

O Rachaki simplifica esse processo, reunindo os gastos, calculando a divisão entre os participantes e mostrando o saldo individual de cada pessoa.

## Funcionalidades

- Cadastro de participantes.
- Registro e remoção de despesas.
- Identificação de quem realizou cada pagamento.
- Cálculo automático do total gasto.
- Divisão igualitária das despesas.
- Relatório com o saldo de cada participante.
- Armazenamento dos dados no navegador.

## Páginas

| Página               | Descrição                                            |
| -------------------- | ---------------------------------------------------- |
| `index.html`         | Página inicial com apresentação e navegação do site. |
| `login.html`         | Tela para entrar ou criar uma conta.                 |
| `despesas.html`      | Cadastro de participantes e despesas.                |
| `relatorio.html`     | Resumo financeiro e saldo de cada participante.      |
| `como-funciona.html` | Explicação do funcionamento e do cálculo utilizado.  |

## Como funciona o cálculo

Cada participante possui uma parte igual do valor total das despesas.

O saldo individual é calculado pela diferença entre o valor pago e a parte que deveria pagar.

**Exemplo com quatro participantes:**

| Despesa     | Pagador |     Valor |
| ----------- | ------- | --------: |
| Combustível | Gustavo | R$ 200,00 |
| Mercado     | João    | R$ 250,00 |
| Pedágio     | Lucas   | R$ 150,00 |

**Total gasto:** R$ 600,00

**Divisão por participante:** R$ 150,00

| Participante | Valor pago |      Saldo |
| ------------ | ---------: | ---------: |
| Gustavo      |  R$ 200,00 |  +R$ 50,00 |
| João         |  R$ 250,00 | +R$ 100,00 |
| Lucas        |  R$ 150,00 |    R$ 0,00 |
| Paulo        |    R$ 0,00 | -R$ 150,00 |

Saldos positivos representam valores a receber. Saldos negativos representam valores a pagar.

O sistema permite gerenciar um racha por vez. Ao selecionar a opção "Novo racha", os dados anteriores são apagados e um novo controle de despesas pode ser iniciado.

## Tecnologias utilizadas

- **HTML5:** estrutura das páginas.
- **CSS3:** estilização e organização visual.
- **JavaScript:** funcionalidades, validações, cálculos e manipulação do DOM.
- **LocalStorage:** armazenamento de usuários, participantes e despesas no navegador.

Os elementos da interface, como listas, etiquetas e tabelas, são criados dinamicamente utilizando `createElement` e `appendChild`.

## Como executar

Não é necessário instalar dependências ou configurar um servidor.

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Execute o arquivo `index.html` no navegador.

Os dados ficam armazenados no navegador utilizado. Ao abrir o projeto em outro navegador ou limpar os dados do site, as informações não serão mantidas.

## Limitações

- Gerenciamento de um racha por vez.
- Divisão de despesas sempre igualitária.
- Não possui integração com banco de dados ou servidor.
- O login funciona apenas localmente, sem autenticação segura.
- Os dados não são sincronizados entre diferentes navegadores ou dispositivos.

## Autores

- Gustavo Paulo de Jesus
- Apolo Marcus Pereira
