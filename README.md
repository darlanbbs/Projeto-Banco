# Banco Virtual - Backend Project

Este projeto consiste em um sistema de banco virtual que oferece diversas funcionalidades para gerenciamento de contas bancárias. Abaixo estão listadas as principais funcionalidades implementadas:

1. **Criar conta bancária**
   - Método: `POST`
   - Rota: `/contas`
   - Endpoint: `addAccount`
   - Body da Requisição:
     ```json
     {
       "usuario": {
         "nome": "Darlan",
         "cpf": "000000000-00",
         "data_nascimento": "15-01-2004",
         "telefone": "71999998888",
         "email": "darlanbs05@gmail.com",
         "senha": "1234"
       }
     }
     ```

2. **Listar contas bancárias**
   - Método: `GET`
   - Rota: `/contas`
   - Endpoint: `getAccounts`
   - Parâmetros de Query (Para listar todas as contas, informe a senha do banco):
     - `senha`: Bank

3. **Atualizar os dados do usuário da conta bancária**
   - Método: `PUT`
   - Rota: `/contas/:id/usuario`
   - Endpoint: `updateAccount`
   - Parâmetros de Query:
     - `id`: ID da conta a ser atualizada
   - Body da Requisição:
     ```json
     {
       "cpf": "000000000-00",
       "valor": 1000
     }
     ```

4. **Excluir uma conta bancária**
   - Método: `DELETE`
   - Rota: `/contas/:id`
   - Endpoint: `deleteAccount`
   - Parâmetros de Query:
     - `id`: ID da conta a ser excluída

5. **Consultar saldo da conta bancária**
   - Método: `GET`
   - Rota: `/contas/saldo`
   - Endpoint: `getAccount`
   - Parâmetros de Query:
     - `id`: ID da conta a ser consultada
     - `senha`: Senha da conta

6. **Depositar em uma conta bancária**
   - Método: `POST`
   - Rota: `/transacoes/depositar`
   - Endpoint: `depositMoney`
   - Body da Requisição:
     ```json
     {
       "numero_conta": 12345,
       "valor": 100
     }
     ```

7. **Sacar de uma conta bancária**
   - Método: `POST`
   - Rota: `/transacoes/sacar`
   - Endpoint: `withDrawMoney`
   - Body da Requisição:
     ```json
     {
       "senha": "1234",
       "numero_conta": 12345,
       "valor": 50
     }
     ```

8. **Transferir valores entre contas bancárias**
   - Método: `POST`
   - Rota: `/transacoes/transferir`
   - Endpoint: `transferMoney`
   - Body da Requisição:
     ```json
     {
       "numero_conta_origem": 12345,
       "numero_conta_destino": 54321,
       "senha": "1234",
       "valor": 50
     }
     ```

9. **Emitir extrato bancário**
   - Método: `GET`
   - Rota: `/transacoes/extrato`
   - Endpoint: `checkTransactionHistory`
   - Parâmetros de Query:
     - `numero_conta`: Número da conta para a qual deseja emitir o extrato
     - `senha`: Senha da conta

---

## Instruções de Uso

### Instalação

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.

2. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/banco-virtual-backend.git
   ```
   
3. Instale as dependências do projeto:
   ```bash
    npm install
   ```
# Iniciando servidor

  Para iniciar o servidor, utilize o seguinte comando:
   ```bash
  node src/index.js
   ```

# Utilizando as rotas

- POST /contas - Cria uma nova conta bancária.
- GET /contas - Lista todas as contas bancárias.
- PUT /contas/:id/usuario - Atualiza os dados do usuário da conta bancária.
- DELETE /contas/:id - Exclui uma conta bancária.
- POST /transacoes/depositar - Realiza um depósito em uma conta bancária.
- POST /transacoes/sacar - Realiza um saque de uma conta bancária.
- POST /transacoes/transferir - Realiza uma transferência entre contas bancárias.
- GET /contas/saldo - Consulta o saldo de uma conta bancária.
- GET /transacoes/extrato - Emite o extrato bancário.
 
  
