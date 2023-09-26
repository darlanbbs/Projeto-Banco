const { contas } = require("../database/bancodedados");
function checkValueExist(req, res, next) {
  const { numero, valor } = req.body;
  if (!valor) {
    return res
      .status(400)
      .send("O número da conta e o valor são obrigatórios!");
  }

  if (valor <= 0) {
    return res
      .status(400)
      .send("O número da conta e o valor devem ser positivos!");
  }

  if (!numero) {
    return res.status(400).send("O número da conta é obrigatório!");
  }

  next();
}

function validateWithdrawal(req, res, next) {
  const { numero, valor, senha } = req.body;

  const account = contas.find((conta) => conta.numero == numero);

  if (!account) {
    return res.status(400).send("Conta não encontrada");
  }

  if (valor <= 0) {
    return res.status(400).send("O valor não pode ser menor que zero!");
  }

  if (valor > account.saldo) {
    return res.status(400).send("O valor não pode ser maior que o saldo");
  }

  if (senha !== account.usuario.senha) {
    return res.status(400).send("Senha inválida");
  }

  next();
}

function validateTransfer(req, res, next) {
  const { numero_origem, numero_destino, valor, senha } = req.body;

  const contaOrigem = contas.find((conta) => conta.numero == numero_origem);
  const contaDestino = contas.find((conta) => conta.numero == numero_destino);

  if (!contaOrigem || !contaDestino) {
    return res.status(400).send("Contas de origem e/ou destino inválidas.");
  }

  if (contaOrigem.saldo < valor) {
    return res.status(400).send("Saldo insuficiente!");
  }
  if (contaOrigem.usuario.senha !== senha) {
    return res.status(400).send("Senha incorreta.");
  }

  next();
}

module.exports = {
  validateWithdrawal,
  checkValueExist,
  validateTransfer,
};
