class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    };
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction{

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction{

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("cash-money");

console.log("Account Balance:", myAccount.balance);

console.log("Trying to withdraw $20");
const t1 = new Withdrawal(20.00, myAccount);
console.log('Commit: ', t1.commit());
console.log('Current Balance: ', myAccount.balance);

console.log("Depositing $100");
const t2 = new Deposit(100.00, myAccount);
console.log('Commit: ', t2.commit());
console.log("Current Balance: ", myAccount.balance);

console.log("Withdrawing $50");
const t3 = new Withdrawal(50.00, myAccount);
console.log('Commit: ', t3.commit());
console.log("Final Account Balance", myAccount.balance);


console.log('Account Transaction History: ', myAccount.transactions);

