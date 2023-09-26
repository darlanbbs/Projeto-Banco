const database = require("./../database/bancodedados");
let depositos = database.depositos;
let transferenciasEnviadas = database.transferenciasEnviadas;
let transferenciasRecebidas = database.transferenciasRecebidas;
let saques = database.saques;
let contas = database.contas;
function depositMoney(req, res) {
  const numero_conta = req.body.numero;
  const saldo = req.body.valor;

  const now = new Date();

  depositos.push({
    numero_conta,
    saldo,
    data: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
  });

  const account = database.contas.find((conta) => conta.numero == numero_conta);
  if (!account) {
    return res.status(400).send("Conta não encontrada!");
  }
  account.saldo += saldo;
  res.status(200).send("Depósito realizado com sucesso!");
}

function withDrawMoney(req, res) {
  const now = new Date();
  const numero_conta = req.body.numero;
  const saldo = req.body.valor;

  saques.push({
    numero_conta,
    saldo,
    data: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
  });

  let account = database.contas.find((conta) => conta.numero == numero_conta);
  account.saldo -= saldo;
  res.status(200).send("Saque realizado com sucesso!");
}
function transferMoney(req, res) {
  const now = new Date();
  const { numero_origem, numero_destino, valor } = req.body;

  const contaOrigem = contas.find((conta) => conta.numero === numero_origem);
  const contaDestino = contas.find((conta) => conta.numero === numero_destino);

  if (!contaOrigem) {
    return res
      .status(404)
      .send("Conta de origem não encontrada ou senha inválida");
  }

  if (!contaDestino) {
    return res.status(404).send("Conta bancária não encontada!");
  }

  if (contaOrigem.saldo < valor) {
    return res
      .status(400)
      .send("Saldo insuficiente para realizar a transferência");
  }

  contaOrigem.saldo -= valor;

  contaDestino.saldo += valor;

  transferenciasEnviadas.push({
    data: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
    numero_conta_origem: numero_origem,
    numero_conta_destino: numero_destino,
    valor: valor,
  });
  transferenciasRecebidas.push({
    data: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
    numero_conta_origem: numero_destino,
    numero_conta_destino: numero_origem,
    valor: valor,
  });

  res.status(200).send("Transferência realizada com sucesso!");
}

module.exports = {
  depositMoney,
  withDrawMoney,
  transferMoney,
};
