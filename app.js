let bookId = 0;

const addBookButton = document.querySelector('#add-book-button');
const contentContainer = document.querySelector('#content-container');
const bookCardGrid = document.querySelector('#main-content');
const newBookDialog = document.querySelector('#new-book-dialog');

const formTitleInput = document.querySelector('#title-input');
const formAuthorInput = document.querySelector('#author-input');
const formPageInput = document.querySelector('#page-input');
const formStatusSelect = document.querySelector('#book-status');
const formSubmitButton = document.querySelector('#form-submit-button');

const delsB = document.querySelectorAll('.delete-button');
const delsBArr = Array.from(delsB);

const allBooks = [];
const bookCards = [];

function Book(id, title, author, numberOfPages, status, added) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.added = added;
}

function addBookToLibrary(){
    const id = bookId;
    const title = formTitleInput.value;
    const author = formAuthorInput.value;
    const numberOfPages = formPageInput.value;
    const status = formStatusSelect.value;

    bookId++;
    const book = new Book(id, title, author, numberOfPages, status);
    allBooks.push(book);
}

function attachBookCard(book){
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    const bookCardTitleContainer = document.createElement('div');
    const bookInfoContainer = document.createElement('div');
    const bookInfo = document.createElement('div');
    const cardButtonsContainer = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('h3')
    const numberOfPagesParagraph = document.createElement('p');
    const statusParagraph = document.createElement('p');
    const editCardButton = document.createElement('button');
    const deleteCardButton = document.createElement('button');

    bookCardTitleContainer.classList.add('book-title-container');
    bookInfoContainer.classList.add('book-info-container');
    bookTitle.classList.add('book-title');
    bookInfo.classList.add('book-info');
    cardButtonsContainer.classList.add('card-buttons-container');
    deleteCardButton.classList.add('delete-button');
    deleteCardButton.classList.add('btn-border-radius');
    deleteCardButton.textContent = 'DELETE';

    bookCard.appendChild(bookCardTitleContainer);
    bookCard.appendChild(bookInfoContainer);
    bookCardTitleContainer.appendChild(bookTitle);
    bookCardTitleContainer.appendChild(bookAuthor);
    bookInfoContainer.appendChild(bookInfo);
    bookInfoContainer.appendChild(cardButtonsContainer);
    bookInfo.appendChild(numberOfPagesParagraph);
    bookInfo.appendChild(statusParagraph);
    cardButtonsContainer.appendChild(deleteCardButton);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    numberOfPagesParagraph.textContent = `Number of pages: ${book.numberOfPages}`;
    statusParagraph.textContent = `Status: ${book.status}`;
    deleteCardButton.dataset.id = book.id;
    bookCard.dataset.id = book.id;
    book.added = true;

    bookCardGrid.appendChild(bookCard);
    bookCards.push(bookCard);
    delsBArr.push(deleteCardButton);

    deleteCardButton.addEventListener('click', () => {
        bookCards.forEach(bookCard=> {
            if(deleteCardButton.dataset.id === bookCard.dataset.id){
                bookCardGrid.removeChild(bookCard);
                bookCards.pop(deleteCardButton.dataset.id);
                allBooks.pop(deleteCardButton.dataset.id);
            }
        });
    });
}

addBookButton.addEventListener('click', () => {
    newBookDialog.showModal();
});

formSubmitButton.addEventListener('click', () => {
    addBookToLibrary(); 
    addBookCards(allBooks);
});

function addBookCards(array){
    array.forEach(currentBook => {
        if(!currentBook.added){
            attachBookCard(currentBook);
        }  
    });
}










/* 
    .book-card
    .book-title-container
    .book-info-container
    .book-title
    .book-info
    .card-buttons-container
    .card-buttons.container button
    .edit
*/