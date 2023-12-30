let bookId = 0;
let editedBookId = 0; 
const allBooks = [];
const bookCards = [];

const addBookButton = document.querySelector('#add-book-button');
const contentContainer = document.querySelector('#content-container');
const bookCardDisplay = document.querySelector('#main-content');

const addBookForm = document.querySelector('#new-book-dialog');
const addBookFormTitleInput = document.querySelector('#add-title-input');
const addBookFormAuthorInput = document.querySelector('#add-author-input');
const addBookFormPageInput = document.querySelector('#add-page-input');
const addBookFormStatusInput = document.querySelector('#add-book-status');
const addBookFormSubmitButton = document.querySelector('#add-form-submit-button');
const addBookFormCloseButton = document.querySelector('#add-book-close-button');

const editBookForm = document.querySelector('#edit-book-dialog');
const editBookFormTitleInput = document.querySelector('#edit-title-input');
const editBookFormAuthorInput = document.querySelector('#edit-author-input');
const editBookFormPageInput = document.querySelector('#edit-page-input');
const editBookFormStatusInput = document.querySelector('#edit-book-status');
const editBookFormSubmitButton = document.querySelector('#edit-form-submit-button');
const editBookFormCloseButton = document.querySelector('#edit-book-close-button');

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
    const title = addBookFormTitleInput.value;
    const author = addBookFormAuthorInput.value;
    const numberOfPages = addBookFormPageInput.value;
    const status = addBookFormStatusInput.value;

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

    //A class list used as a way to get access to the children of the book cards, so that we can change the book information when we want to edit it
    bookTitle.classList.add('title-class');
    bookAuthor.classList.add('author-class');
    numberOfPagesParagraph.classList.add('pages-class');
    statusParagraph.classList.add('status-class');

    bookCardTitleContainer.classList.add('book-title-container');
    bookInfoContainer.classList.add('book-info-container');
    bookTitle.classList.add('book-title');
    bookInfo.classList.add('book-info');
    cardButtonsContainer.classList.add('card-buttons-container');
    editCardButton.classList.add('edit-button');
    editCardButton.classList.add('btn-border-radius');
    editCardButton.textContent = 'EDIT';
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
    cardButtonsContainer.appendChild(editCardButton);
    cardButtonsContainer.appendChild(deleteCardButton);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    numberOfPagesParagraph.textContent = `Pages: ${book.numberOfPages}`;
    statusParagraph.textContent = `Status: ${book.status}`;
    deleteCardButton.dataset.id = book.id;
    editCardButton.dataset.id = book.id;
    bookCard.dataset.id = book.id;
    book.added = true;

    bookCardDisplay.appendChild(bookCard);
    bookCards.push(bookCard);

    deleteCardButton.addEventListener('click', () => {
        bookCards.forEach(bookCard=> {
            if(deleteCardButton.dataset.id === bookCard.dataset.id){
                bookCardDisplay.removeChild(bookCard);
                delete bookCards[deleteCardButton.dataset.id];
                delete allBooks[deleteCardButton.dataset.id];
            }
        });
    });

    editCardButton.addEventListener('click', () => {
        editBookForm.showModal();

        editBookFormTitleInput.value = book.title;
        editBookFormAuthorInput.value = book.author;
        editBookFormPageInput.value = book.numberOfPages;
        editBookFormStatusInput.value = book.status;
        editedBookId = book.id;
    });
}

function addBookCards(array){
    array.forEach(currentBook => {
        if(!currentBook.added){
            attachBookCard(currentBook);
        }  
    });
}

function clearAddBookForm(){
    addBookFormTitleInput.value = '';
    addBookFormAuthorInput.value = '';
    addBookFormPageInput.value = '';
}

function editBook(){
    const editedTitle = editBookFormTitleInput.value;
    const editedAuthor = editBookFormAuthorInput.value;
    const editedNumberOfPages = editBookFormPageInput.value;
    const editedStatus = editBookFormStatusInput.value;

    allBooks.forEach(book => {
        if(book.id == editedBookId){
            book.title = editedTitle;
            book.author = editedAuthor;
            book.numberOfPages = editedNumberOfPages;
            book.status = editedStatus;
        }
    });

    bookCards.forEach(bookCard => {
        if(bookCard.dataset.id == editedBookId){
            let bookCardTitle = bookCard.querySelector('.title-class');
            let bookCardAuthor = bookCard.querySelector('.author-class');
            let bookCardNumberOfPages = bookCard.querySelector('.pages-class');
            let bookCardStatus = bookCard.querySelector('.status-class')
            
            bookCardTitle.textContent = editedTitle;
            bookCardAuthor.textContent = editedAuthor;
            bookCardNumberOfPages.textContent = `Pages: ${editedNumberOfPages}`;
            bookCardStatus.textContent = `Status: ${editedStatus}`;
        }
    });
}

addBookButton.addEventListener('click', () => {
    addBookForm.showModal();
});

addBookFormSubmitButton.addEventListener('click', () => {
    addBookToLibrary(); 
    if(allBooks != null)
        addBookCards(allBooks);
    clearAddBookForm();
});

addBookFormCloseButton.addEventListener('click', () => {
    addBookForm.open = close;
});

editBookFormSubmitButton.addEventListener('click', () => {
    editBook();
});













