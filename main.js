const booksElement =  document.querySelector('.books');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const AddBtn = document.querySelector('#addbtn');

let books = [];

const saveToLocalStorage = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
};

const getExistingBooks = () => JSON.parse(localStorage.getItem('books'));

function generateRandomId(){
    return Math.random.toString(20).substr(2, 20);
}

const addBooks =() =>{
    const title = titleInput.value;
    const author = authorInput.value;
    const id = generateRandomId();

    const newBook = { title , author, id};

    if(getExistingBooks()){
        getExistingBooks().forEach((existingBook) => {
            books.push(existingBook);
        });
    }

    books.push(newBook);

    saveToLocalStorage(books);
    books= [];

    titleInput.value = "";
    authorInput.value = "";
};

AddBtn.addEventListener('click', () =>{
    addBooks();
});

const displayBooks = () => {
    if(getExistingBooks()){
        getExistingBooks().forEach((book) => {
            const textHtml = `
            <div class="book">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
            <button class="remove-btn" data-id=${book.id}>Remove</button>
            <hr class="hr" />
            </div>
            `;
            booksElement.insertAdjacentHTML('afterbegin', textHtml);
        });
    }
};

displayBooks();
