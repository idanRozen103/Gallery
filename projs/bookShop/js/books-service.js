'use strict';
var KEY = 'myBooks'
const PAGE_SIZE = 4;

var gBooks = [];
var gPageIdx = 0;
var gCurrentBookUpdateId;
var gSortBy;

_createBooks()

function createBook(name, price, imgUrl = getRandomIntInclusive(1, 8)) {
    var book = {
        id: makeId(),
        name: name.charAt(0).toUpperCase() + name.substring(1),
        price: price,
        imgUrl: imgUrl,
        rating: 0,
        voting: 0
    }
    gBooks.push(book);
    _saveBookToStorage();
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function _createBooks() {

    var books = loadFromStorage('myBooks')
    if (!books || books.length === 0) {
        var title = ['Sepiens', 'Thinking, Fast and Slow', 'The Man Who Mistook His Wife for a Hat', 'The Kites', 'The Little Prince', 'Big Magic']

        books = title.map(function (bookName, bookIdx) {
            createBook(bookName, getRandomIntInclusive(20, 70), bookIdx + 1)
        })
        gBooks = books;
    }
    gBooks = books;
}

function UpdatePrice(elUpdateInput) {
    var bookidx = gBooks.findIndex(function (book) {
        return book.id === gCurrentBookUpdateId;
    })
    gBooks[bookidx].price = elUpdateInput;
    _saveBookToStorage()
    gCurrentBookUpdateId = null;
}

function emptyValues(modalClass) {
    var inputs = document.querySelectorAll(`${modalClass} input`);
    inputs.forEach(function (input) {
        input.value = null;
    })
}

function deleteBook(bookId) {
    var bookIdx = findIdxById(bookId); 
      gBooks.splice(bookIdx, 1)
    _saveBookToStorage();
}

function _saveBookToStorage() {
    saveToStorage(KEY, gBooks)
}

function calculateRating() {
    var bookId = document.querySelector('.book-details title').value
    var elCurrRating = document.querySelector('.rate-book span');
    if (elCurrRating.innerHTML === '0') return;
    else {
        var bookIdx = findIdxById(bookId);      
        var currBook = gBooks[bookIdx]
        var previousSum = parseFloat(currBook.rating) * parseFloat(currBook.voting);
        currBook.voting++
        currBook.rating = (currBook.rating) ? ((previousSum + parseFloat(elCurrRating.innerHTML)) / (currBook.voting)).toFixed(1) :
            parseInt(elCurrRating.innerHTML);
    }
    _saveBookToStorage();
    document.querySelector('.rate-btn').disabled = true;
}

function sortBooks() {
    if (!gSortBy || gSortBy === 'name') sortByName();
    else if (gSortBy === 'price') sortByPrice();
}

function sortByName() {
    gSortBy = 'name';
    gBooks.sort(function (book1, book2) {
        return book1.name.localeCompare(book2.name)
    })
}

function sortByPrice() {
    gSortBy = 'price';
    gBooks.sort(function (book1, book2) {
        return book2.price - book1.price
    })
}

function goNextPage() {
    var pageCount = gBooks.length / PAGE_SIZE
    gPageIdx = (gPageIdx + 1 <= pageCount) ? gPageIdx + 1 : 0
}