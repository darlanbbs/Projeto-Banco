const express = require("express");
// Controllers para contas
const {
  getAccounts,
  getAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  checkTransactionHistory,
} = require("../controllers/routesControllers");

// Controllers para transações

const {
  depositMoney,
  withDrawMoney,
  transferMoney,
} = require("../controllers/transactionsControllers");

// Middlewares para contas

const {
  checkNewUser,
  checkUpdateUser,
  checkDeleteUser,
} = require("../middleware/routesMiddleware");

// Middlewares para transações
const {
  checkValueExist,
  validateWithdrawal,
  validateTransfer,
} = require("../middleware/transactionsMiddleware");
const routes = express();

routes.get("/contas", getAccounts);
routes.get("/contas/saldo", getAccount);
routes.post("/contas", checkNewUser, addAccount);
routes.put("/contas/:id/usuario", checkUpdateUser, updateAccount);
routes.delete("/contas/:id", checkDeleteUser, deleteAccount);
routes.post("/transacoes/depositar", checkValueExist, depositMoney);
routes.post("/transacoes/sacar", validateWithdrawal, withDrawMoney);
routes.post("/transacoes/transferir", validateTransfer, transferMoney);
routes.get("/transacoes/extrato", checkTransactionHistory);
module.exports = routes;
