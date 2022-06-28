const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const addBookBtn = document.querySelector('#addBtn');

class Book {
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
    this.books = [];
    this.booksElement = document.querySelector('.books');
  }

    generateRandomId = () => Math.random().toString(20).substr(2, 20);

    getExistingBooks = () => JSON.parse(localStorage.getItem('books'));

    saveToLocalStorage = (books) => {
      localStorage.setItem('books', JSON.stringify(books));
    }

    addBooks() {
      const newBook = {
        title: this.title,
        author: this.author,
        id: this.generateRandomId(),
      };

      if (this.getExistingBooks()) {
        this.getExistingBooks().forEach((existingBook) => {
          this.books.push(existingBook);
        });
      }

      this.books.push(newBook);

      this.saveToLocalStorage(this.books);
      this.books = [];
    }

    removeBook(bookId) {
      const filterBooks = this.getExistingBooks().filter(
        (existingBook) => existingBook.id !== bookId,
      );

      this.saveToLocalStorage(filterBooks);
      window.location.reload();
    }

    displayBooks() {
      if (this.getExistingBooks()) {
        this.getExistingBooks().forEach((book) => {
          const textHtml = `
        <div class="book">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <button class="remove-btn" data-id=${book.id}>Remove</button>
        </div>`;

          this.booksElement.insertAdjacentHTML('afterbegin', textHtml);
        });
      }
    }
}

const book = new Book();

book.displayBooks();

// Array.from(document.querySelectorAll('.remove-btn')).forEach((btn) => btn.addEventListener('click', () => {
//   removeBook(btn.dataset.id);
// }));
