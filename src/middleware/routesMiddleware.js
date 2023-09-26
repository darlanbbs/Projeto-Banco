const { contas } = require("../database/bancodedados");

function checkNewUser(req, res, next) {
  const { cpf, email } = req.body.usuario;

  for (const conta of contas) {
    if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
      return res
        .status(400)
        .send("Já existe uma conta com o cpf ou e-mail informado!");
    }
  }

  next();
}

async function checkUpdateUser(req, res, next) {
  const { id } = req.params;
  const { cpf } = req.body;

  let contaEncontrada = false;

  for (const conta of contas) {
    if (conta.numero === id) {
      if (conta.usuario.cpf === cpf) {
        contaEncontrada = true;
        break;
      } else {
        return res.status(400).send("O CPF informado já existe cadastrado!");
      }
    }
  }

  if (!contaEncontrada) {
    return res.status(400).send("Conta não encontrada!");
  }

  next();
}

function checkDeleteUser(req, res, next) {
  const { id } = req.params;
  const account = contas.find((conta) => conta.numero === id);
  if (account.saldo > 0) {
    return res
      .status(400)
      .send("A conta só pode ser removida se o saldo for zero!");
  }
  next();
}

module.exports = {
  checkNewUser,
  checkUpdateUser,
  checkDeleteUser,
};
