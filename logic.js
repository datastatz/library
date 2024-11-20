// Array to store all my values
const myLibrary = [];

// Constructor function for creating book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function to add a new book to myLibrary
function addBookToLibrary(title, author, pages, read) {
    // Create a new Book instance
    const newBook = new Book(title, author, pages, read);
    // Add the new book to the library array
    myLibrary.push(newBook);
}

// Selecting the forms and the buttons
const formPopup = document.querySelector('.form-popup');
const newBookButton = document.querySelector('.add-book');
const cancelButton = formPopup.querySelector('button[type="button"]');

// Function to open the form when the button is clicked
function OpenForm() {
    formPopup.style.display = 'block';
}

function CloseForm() {
    formPopup.style.display = 'none';
}

// Event listeners
newBookButton.addEventListener('click', OpenForm); // Opens form on click of the 'new' button
cancelButton.addEventListener('click', CloseForm); // Closes form on click of the close button

// Function to create and display a new book card
function displayBook(book) {
    const bookContainer = document.querySelector('.all-books');

    // Create a new card div
    const card = document.createElement('div');
    card.classList.add('book-card'); // Styling this in CSS

    card.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? 'Yes' : 'No'}</p>
`;

    // Append the card to the all-books container
    bookContainer.appendChild(card);

    // Set the background color to red
    bookContainer.style.backgroundColor = '#d4d4d4';

    // Store in session storage to persist data across refreshes
    sessionStorage.setItem('hasBooks', 'true');
}

// Get the form element
const bookForm = document.querySelector('#bookForm');

// Handle form submission
bookForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from refreshing the page

    // Get form data
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    // Add book to library
    addBookToLibrary(title, author, pages, read);

    // Display the newly added book
    displayBook(myLibrary[myLibrary.length - 1]);

    // Close and reset the form
    bookForm.reset();
    CloseForm();
});

// On page load, reset background color
window.addEventListener('load', function () {
    const bookContainer = document.querySelector('.all-books');
    if (sessionStorage.getItem('hasBooks') !== 'true') {
        bookContainer.style.backgroundColor = ''; // Reset background color
    }
});
