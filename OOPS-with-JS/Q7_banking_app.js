/**
 * Q7 - Banking Application
 * 
 * This program demonstrates:
 * - Private fields using # syntax
 * - Encapsulation
 * - Error handling with try-catch
 * - Data validation
 * - Getter methods for private data
 */

class BankAccount {
  // Private field - cannot be accessed from outside the class
  #balance;

  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    this.accountNumber = this.#generateAccountNumber();
    this.#balance = initialBalance >= 0 ? initialBalance : 0;
    this.transactions = [];
  }

  /**
   * Private method to generate random account number
   */
  #generateAccountNumber() {
    return 'ACC' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  }

  /**
   * Private method to record transaction
   */
  #recordTransaction(type, amount, success, message) {
    this.transactions.push({
      type,
      amount,
      success,
      message,
      balance: this.#balance,
      timestamp: new Date().toLocaleString()
    });
  }

  /**
   * Deposit money into account
   * @param {number} amount - Amount to deposit
   */
  deposit(amount) {
    // Validate amount
    if (typeof amount !== 'number') {
      throw new Error(`Invalid amount type. Expected number, got ${typeof amount}`);
    }

    if (amount <= 0) {
      throw new Error(`Invalid deposit amount: ₹${amount}. Amount must be greater than 0`);
    }

    // Deposit the amount
    this.#balance += amount;
    this.#recordTransaction('DEPOSIT', amount, true, 'Deposit successful');
    
    return {
      success: true,
      message: `Successfully deposited ₹${amount}`,
      newBalance: this.#balance
    };
  }

  /**
   * Withdraw money from account
   * @param {number} amount - Amount to withdraw
   * @throws {Error} If insufficient balance
   */
  withdraw(amount) {
    // Validate amount
    if (typeof amount !== 'number') {
      throw new Error(`Invalid amount type. Expected number, got ${typeof amount}`);
    }

    if (amount <= 0) {
      throw new Error(`Invalid withdrawal amount: ₹${amount}. Amount must be greater than 0`);
    }

    // Check sufficient balance
    if (amount > this.#balance) {
      const error = new Error(
        `Insufficient balance! Requested: ₹${amount}, Available: ₹${this.#balance}`
      );
      this.#recordTransaction('WITHDRAWAL', amount, false, error.message);
      throw error;
    }

    // Withdraw the amount
    this.#balance -= amount;
    this.#recordTransaction('WITHDRAWAL', amount, true, 'Withdrawal successful');
    
    return {
      success: true,
      message: `Successfully withdrawn ₹${amount}`,
      newBalance: this.#balance
    };
  }

  /**
   * Get current balance (public getter for private field)
   * @returns {number} Current balance
   */
  getBalance() {
    return this.#balance;
  }

  /**
   * Display account information
   */
  displayAccountInfo() {
    console.log("\n" + "=".repeat(60));
    console.log("💳 ACCOUNT INFORMATION");
    console.log("=".repeat(60));
    console.log(`Account Holder: ${this.accountHolder}`);
    console.log(`Account Number: ${this.accountNumber}`);
    console.log(`Current Balance: ₹${this.#balance.toLocaleString('en-IN')}`);
    console.log("=".repeat(60));
  }

  /**
   * Display transaction history
   */
  displayTransactionHistory() {
    console.log("\n📜 TRANSACTION HISTORY");
    console.log("=".repeat(60));
    
    if (this.transactions.length === 0) {
      console.log("No transactions yet.");
    } else {
      this.transactions.forEach((txn, index) => {
        const status = txn.success ? '✅' : '❌';
        console.log(`\n${index + 1}. ${status} ${txn.type}`);
        console.log(`   Amount: ₹${txn.amount}`);
        console.log(`   Status: ${txn.message}`);
        console.log(`   Balance After: ₹${txn.balance}`);
        console.log(`   Time: ${txn.timestamp}`);
      });
    }
    console.log("\n" + "=".repeat(60));
  }
}

// ==================== TESTING THE BANKING APPLICATION ====================

console.log("🏦 BANKING APPLICATION");
console.log("=".repeat(60));

// Create a new bank account
const account1 = new BankAccount("Amit Kumar", 5000);
account1.displayAccountInfo();

console.log("\n\n📝 TRANSACTION TESTS");
console.log("=".repeat(60));

// ==================== TEST CASE 1: VALID DEPOSIT ====================

console.log("\n\n✅ TEST CASE 1: Valid Deposit");
console.log("-".repeat(60));
try {
  const result = account1.deposit(3000);
  console.log(`✓ ${result.message}`);
  console.log(`  New Balance: ₹${result.newBalance.toLocaleString('en-IN')}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ==================== TEST CASE 2: VALID WITHDRAWAL ====================

console.log("\n\n✅ TEST CASE 2: Valid Withdrawal");
console.log("-".repeat(60));
try {
  const result = account1.withdraw(2000);
  console.log(`✓ ${result.message}`);
  console.log(`  New Balance: ₹${result.newBalance.toLocaleString('en-IN')}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ==================== TEST CASE 3: INSUFFICIENT BALANCE ====================

console.log("\n\n❌ TEST CASE 3: Insufficient Balance Withdrawal");
console.log("-".repeat(60));
try {
  const result = account1.withdraw(10000);
  console.log(`✓ ${result.message}`);
  console.log(`  New Balance: ₹${result.newBalance.toLocaleString('en-IN')}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
  console.log(`💡 Current Balance: ₹${account1.getBalance().toLocaleString('en-IN')}`);
}

// ==================== TEST CASE 4: NEGATIVE DEPOSIT ====================

console.log("\n\n❌ TEST CASE 4: Invalid Deposit (Negative Amount)");
console.log("-".repeat(60));
try {
  const result = account1.deposit(-500);
  console.log(`✓ ${result.message}`);
  console.log(`  New Balance: ₹${result.newBalance.toLocaleString('en-IN')}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ==================== TEST CASE 5: ZERO WITHDRAWAL ====================

console.log("\n\n❌ TEST CASE 5: Invalid Withdrawal (Zero Amount)");
console.log("-".repeat(60));
try {
  const result = account1.withdraw(0);
  console.log(`✓ ${result.message}`);
  console.log(`  New Balance: ₹${result.newBalance.toLocaleString('en-IN')}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ==================== TEST CASE 6: MULTIPLE VALID TRANSACTIONS ====================

console.log("\n\n✅ TEST CASE 6: Multiple Valid Transactions");
console.log("-".repeat(60));

try {
  console.log("Transaction 1: Deposit ₹5000");
  account1.deposit(5000);
  console.log(`  ✓ Balance: ₹${account1.getBalance().toLocaleString('en-IN')}`);

  console.log("\nTransaction 2: Withdraw ₹1500");
  account1.withdraw(1500);
  console.log(`  ✓ Balance: ₹${account1.getBalance().toLocaleString('en-IN')}`);

  console.log("\nTransaction 3: Deposit ₹2000");
  account1.deposit(2000);
  console.log(`  ✓ Balance: ₹${account1.getBalance().toLocaleString('en-IN')}`);

  console.log("\nTransaction 4: Withdraw ₹3000");
  account1.withdraw(3000);
  console.log(`  ✓ Balance: ₹${account1.getBalance().toLocaleString('en-IN')}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// ==================== DISPLAY FINAL ACCOUNT INFO ====================

account1.displayAccountInfo();
account1.displayTransactionHistory();

// ==================== DEMONSTRATE ENCAPSULATION ====================

console.log("\n\n🔒 ENCAPSULATION DEMONSTRATION");
console.log("=".repeat(60));

console.log("\n1. Private field #balance cannot be accessed directly:");
console.log(`   account1.#balance → SyntaxError ❌`);
console.log(`   (Uncommenting the line below would cause an error)`);
// console.log(account1.#balance); // This would throw SyntaxError

console.log("\n2. Balance must be accessed through getBalance() method:");
console.log(`   account1.getBalance() → ₹${account1.getBalance().toLocaleString('en-IN')} ✓`);

console.log("\n3. Balance cannot be modified directly:");
console.log(`   account1.balance = 1000000 → No effect ❌`);
account1.balance = 1000000; // This won't affect the private #balance
console.log(`   Actual balance: ₹${account1.getBalance().toLocaleString('en-IN')}`);

console.log("\n4. Balance can only be modified through deposit() and withdraw():");
console.log(`   This ensures validation and transaction recording ✓`);

// ==================== CREATE ANOTHER ACCOUNT ====================

console.log("\n\n👤 SECOND ACCOUNT EXAMPLE");
console.log("=".repeat(60));

const account2 = new BankAccount("Priya Sharma", 10000);
account2.displayAccountInfo();

try {
  console.log("\nDepositing ₹15000...");
  account2.deposit(15000);
  
  console.log("Withdrawing ₹8000...");
  account2.withdraw(8000);
  
  console.log("Attempting to withdraw ₹30000...");
  account2.withdraw(30000);
} catch (error) {
  console.log(`❌ ${error.message}`);
}

account2.displayAccountInfo();

/**
 * PRIVATE FIELDS EXPLANATION:
 * ============================
 * 
 * 1. SYNTAX:
 *    - Declared with # prefix: #balance
 *    - Only accessible inside the class
 *    - Cannot be accessed from outside
 * 
 * 2. BENEFITS:
 *    ✓ True encapsulation
 *    ✓ Data protection
 *    ✓ Prevents direct manipulation
 *    ✓ Enforces using proper methods
 * 
 * 3. ACCESS:
 *    Inside class:  this.#balance ✓
 *    Outside class: account.#balance ❌ SyntaxError
 *    Via method:    account.getBalance() ✓
 * 
 * 4. PRIVATE METHODS:
 *    #generateAccountNumber()
 *    #recordTransaction()
 *    - Internal helper methods
 *    - Not exposed to outside world
 * 
 * 
 * ENCAPSULATION BENEFITS:
 * =======================
 * 
 * 1. DATA PROTECTION:
 *    - Balance cannot be set to negative
 *    - Cannot be modified without validation
 *    - Prevents invalid states
 * 
 * 2. CONTROLLED ACCESS:
 *    - Only through deposit() and withdraw()
 *    - All changes are validated
 *    - All transactions are recorded
 * 
 * 3. MAINTAINABILITY:
 *    - Internal implementation can change
 *    - External interface remains same
 *    - Easier to add features
 * 
 * 4. SECURITY:
 *    - Cannot bypass validation
 *    - Cannot manipulate balance directly
 *    - Audit trail through transactions
 * 
 * 
 * ERROR HANDLING:
 * ===============
 * 
 * 1. Type validation (must be number)
 * 2. Amount validation (must be > 0)
 * 3. Balance validation (sufficient funds)
 * 4. Transaction recording (success/failure)
 * 5. User-friendly error messages
 * 6. try-catch blocks for graceful handling
 */
