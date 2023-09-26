const database = require("./../database/bancodedados");
let contas = database.contas;
let depositos = database.depositos;
let transferenciasEnviadas = database.transferenciasEnviadas;
let transferenciasRecebidas = database.transferenciasRecebidas;

let saques = database.saques;
const uuid = require("uuid");
function getAccounts(req, res) {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(400).send("É nescessário informar a senha do banco!");
  }

  if (senha_banco === "Bank") {
    return res.status(200).send(contas);
  }
  return res.status(400).send("A senha do banco informada é inválida!");
}

function getAccount(req, res) {
  const account = contas.find(
    (conta) => conta.numero == req.query.numero_conta
  );
  if (!account) return res.status(404).send("Conta bancária não encontada!");
  if (account.usuario.senha !== req.query.senha)
    return res.status(401).send("Senha inválida");
  return res.status(200).send({
    saldo: account.saldo,
  });
}

function addAccount(req, res) {
  const {
    usuario: { nome, cpf, data_nascimento, telefone, email, senha },
  } = req.body;

  const newAccount = {
    numero: uuid.v4(),
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  contas.push(newAccount);
  res.status(201).send("Conta criada com sucesso!");
}

function updateAccount(req, res) {
  const { nome, data_nascimento, telefone, email, senha } = req.body;
  const { id } = req.params;

  const AccountIndex = contas.findIndex(
    (conta) => conta.numero == req.params.id
  );

  if (!id) return res.status(404).send("Conta não encontrada");

  if (nome) contas[AccountIndex].usuario.nome = nome;

  if (data_nascimento)
    contas[AccountIndex].usuario.data_nascimento = data_nascimento;

  if (telefone) contas[AccountIndex].usuario.telefone = telefone;

  if (email) contas[AccountIndex].usuario.email = email;

  if (senha) contas[AccountIndex].usuario.senha = senha;

  res.status(200).send("Conta atualizada com sucesso!");
}

function deleteAccount(req, res) {
  const accountId = req.params.id;

  const account = contas.find((conta) => conta.numero == accountId);
  let accounts = contas.filter((conta) => conta.numero !== account.numero);
  contas = accounts;
  res.status(200).send("Conta deletada com sucesso!");
}

function checkTransactionHistory(req, res) {
  const { numero_conta, senha } = req.query;
  let depositosExtract = [];
  let saquesExtract = [];
  let transferRecebidasExtract = [];
  let transferEnviadasExtract = [];

  const contaEncontrada = contas.find(
    (conta) => conta.numero === numero_conta && conta.usuario.senha === senha
  );

  if (!contaEncontrada) {
    return res.status(404).send("Conta não encontrada ou senha inválida");
  }

  for (const deposito of depositos) {
    if (deposito.numero_conta === numero_conta) {
      depositosExtract.push(deposito);
    }
  }

  for (const saque of saques) {
    if (saque.numero_conta === numero_conta) {
      saquesExtract.push(saque);
    }
  }

  for (const transferenciaEnviada of transferenciasEnviadas) {
    console.log(transferenciaEnviada);
    if (transferenciaEnviada.numero_conta_origem === numero_conta) {
      transferEnviadasExtract.push(transferenciaEnviada);
    }
  }

  for (const transferenciasRecebida of transferenciasRecebidas) {
    if (transferenciasRecebida.numero_conta_destino === numero_conta) {
      transferRecebidasExtract.push(transferenciasRecebida);
    }
  }

  return res.status(200).send({
    depositos: depositosExtract,
    saques: saquesExtract,
    transferenciasEnviadas: transferEnviadasExtract,
    transferenciasRecebidas: transferRecebidasExtract,
  });
}

module.exports = {
  getAccounts,
  getAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  checkTransactionHistory,
};
