/**
 * Q3: Library Management System
 * This program demonstrates book management with classes and object methods
 */

// Book class definition
class Book {
  constructor(title, author, ISBN, isIssued = false) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.isIssued = isIssued;
  }

  // Method to issue a book
  issueBook() {
    if (this.isIssued) {
      console.log(`❌ Book "${this.title}" is already issued.`);
      return false;
    } else {
      this.isIssued = true;
      console.log(`✅ Book "${this.title}" has been issued successfully.`);
      return true;
    }
  }

  // Method to return a book
  returnBook() {
    if (!this.isIssued) {
      console.log(`❌ Book "${this.title}" was not issued.`);
      return false;
    } else {
      this.isIssued = false;
      console.log(`✅ Book "${this.title}" has been returned successfully.`);
      return true;
    }
  }

  // Method to display book details
  displayDetails() {
    const status = this.isIssued ? "Issued" : "Available";
    return `📚 ${this.title} by ${this.author} | ISBN: ${this.ISBN} | Status: ${status}`;
  }
}

// Create an array of book objects
const library = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0-7432-7356-5"),
  new Book("To Kill a Mockingbird", "Harper Lee", "978-0-06-112008-4"),
  new Book("1984", "George Orwell", "978-0-452-28423-4", true), // Already issued
  new Book("Pride and Prejudice", "Jane Austen", "978-0-14-143951-8"),
  new Book("The Catcher in the Rye", "J.D. Salinger", "978-0-316-76948-0"),
  new Book("Animal Farm", "George Orwell", "978-0-452-28424-1"),
  new Book("Brave New World", "Aldous Huxley", "978-0-06-085052-4", true), // Already issued
  new Book("The Hobbit", "J.R.R. Tolkien", "978-0-547-92822-7"),
  new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "978-0-439-70818-8"),
  new Book("The Lord of the Rings", "J.R.R. Tolkien", "978-0-544-00341-5")
];

// Function to display all books in the library
function displayAllBooks() {
  console.log("\n=== All Books in Library ===");
  library.forEach((book, index) => {
    console.log(`${index + 1}. ${book.displayDetails()}`);
  });
}

// Function to display all available books (not issued)
function displayAvailableBooks() {
  console.log("\n=== Available Books ===");
  const availableBooks = library.filter(book => !book.isIssued);
  
  if (availableBooks.length === 0) {
    console.log("No books available at the moment.");
  } else {
    availableBooks.forEach((book, index) => {
      console.log(`${index + 1}. ${book.displayDetails()}`);
    });
  }
  
  return availableBooks;
}

// Function to search and issue a book by ISBN
function issueBookByISBN(isbn) {
  console.log(`\n=== Searching for ISBN: ${isbn} ===`);
  const book = library.find(book => book.ISBN === isbn);
  
  if (!book) {
    console.log(`❌ No book found with ISBN: ${isbn}`);
    return false;
  }
  
  return book.issueBook();
}

// Function to search and return a book by ISBN
function returnBookByISBN(isbn) {
  console.log(`\n=== Returning book with ISBN: ${isbn} ===`);
  const book = library.find(book => book.ISBN === isbn);
  
  if (!book) {
    console.log(`❌ No book found with ISBN: ${isbn}`);
    return false;
  }
  
  return book.returnBook();
}

// Main execution
console.log("📖 LIBRARY MANAGEMENT SYSTEM 📖");

// Display all books
displayAllBooks();

// Display available books
displayAvailableBooks();

// Example: Issue a book
issueBookByISBN("978-0-14-143951-8"); // Pride and Prejudice

// Display available books after issuing
displayAvailableBooks();

// Try to issue an already issued book
issueBookByISBN("978-0-452-28423-4"); // 1984 (already issued)

// Return a book
returnBookByISBN("978-0-452-28423-4"); // Return 1984

// Display available books after returning
displayAvailableBooks();

// Try to return a book that wasn't issued
returnBookByISBN("978-0-547-92822-7"); // The Hobbit (not issued)

// Example: Issue another book
issueBookByISBN("978-0-439-70818-8"); // Harry Potter

// Final status
displayAllBooks();
