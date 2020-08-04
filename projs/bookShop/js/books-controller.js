'use strict';

function init() {
    closeCreateBookModal();
    closaUpdateModal();
    closeDetailsModal();
    if (!checkIsThereBooks()) return
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
                <tr class="card-body">
                <td class="card-id">"${(book.id)}"</td>
                <td class="card-title">"${(book.name)}"</td>
                <td class="card-text">$${book.price}</td>
                <td class="rate">${book.rating}
                <p>${book.voting} votes</p>
                </td>
                <td><button href="#"  onclick="onReadBook('${book.id}')">Details</button></td>
                <td><button href="#" onclick="onUpdateBook('${book.id}')">Update</button></td>
                <td><button class="delete-book" onclick="onDeletBook('${book.id}')">Delete</button></td>
            </tr>
          `
    })
    sortBooks();
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function onFilterBy(filterBy) {
    if (filterBy === 'name') {
        sortByName()
    }
    else if (filterBy === 'price') {
        sortByPrice()
    }
    renderBooks();
}

function onDeletBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onCreateBook() {
    openCreateBookModal()
}

function onReadBook(bookId) {
    openDetailsModal()
    setBookDetails(bookId)
}

function onAddBook() {
    var elBookName = document.querySelector('.create-book input:nth-of-type(1)')
    var elBookPrice = document.querySelector('.create-book input:nth-of-type(2)')
    var bookName = elBookName.value
    var bookPrice = elBookPrice.value
    if (bookPrice < 1) {
        showPriceAlert('.create-book')
        return
    }
    createBook(bookName, bookPrice);
    renderBooks();
    closeCreateBookModal()
    checkIsThereBooks()
}
function showPriceAlert(modalClass) {
    document.querySelector(`${modalClass} h4`).hidden = false
    setTimeout(function () {
        document.querySelector(`${modalClass} h4`).hidden = true
    }, 2000)
}

function checkIsThereBooks() {
    if (!gBooks || gBooks.length === 0) {
        document.querySelector('h2').hidden = false;
        return false
    } else {
        document.querySelector('h2').hidden = true;
        return true
    }
}

function onUpdateBook(bookId) { //need to understand how to send the book id to "onUpdatePrice"
    openUpdateModal()
    gCurrentBookUpdateId = bookId
}

function onUpdatePrice() {
    var elUpdateInput = document.querySelector('.update-book input').value;
    if (elUpdateInput < 1) {
        showPriceAlert('.update-book')
        return
    }
    UpdatePrice(elUpdateInput);
    closaUpdateModal();
    renderBooks();
}

function enableCreateBook() {
    var elAddBtn = document.querySelector('.add-book')
    var elInput = document.querySelector('.create-book input')
    if (!elInput.value.trim()) elAddBtn.disabled = true
    else elAddBtn.disabled = false
}

function enableUpdatePrice() {
    var elUpdateBtn = document.querySelector('.update-book-price')
    var elUpdateInput = document.querySelector('.update-book input')
    if (!elUpdateInput.value) elUpdateBtn.disabled = true
    else elUpdateBtn.disabled = false
}

function openUpdateModal() {
    document.querySelector('.update-book').style.display = 'flex';
}

function closaUpdateModal() {
    emptyValues('.update-book')
    document.querySelector('.update-book').style.display = 'none';
}


function openCreateBookModal() {
    document.querySelector('.create-book').style.display = 'flex';
}

function closeCreateBookModal() {
    emptyValues('.create-book');
    document.querySelector('.create-book').style.display = 'none';
}


function openDetailsModal() {
    document.querySelector('.book-details').style.visibility = 'visible';
}

function closeDetailsModal() {
    var elCurrRating = document.querySelector('.rate-book span');
    elCurrRating.innerHTML = 0;
    document.querySelector('.book-details').style.visibility = 'hidden';
    renderBooks();
    document.querySelector('.rate-btn').disabled = false;
}

function setBookDetails(bookId) {
    var bookIdx = findIdxById(bookId)
    var currbook = gBooks[bookIdx]
    document.querySelector('.book-details title').value = `${bookId}`
    document.querySelector('.book-details div').innerHTML = `<img src="./img/${currbook.imgUrl}.jpg">`
    document.querySelector('.book-details p').innerHTML = `${currbook.name}`
    document.querySelector('.book-details h5').innerHTML = makeLorem(100)
    document.querySelector('.book-details span').innerHTML = `${currbook.price}`
}

function onRatingChange(changeDirection) {
    var elCurrRating = document.querySelector('.rate-book span');
    if (changeDirection === 1 && elCurrRating.innerHTML < 10) elCurrRating.innerHTML++
    else if (changeDirection === -1 && elCurrRating.innerHTML > 0) elCurrRating.innerHTML--
}

function onEscapeKey(ev) {
    if (document.querySelector('.book-details').style.visibility === 'hidden') return;
    if (ev.keyCode === 27) closeDetailsModal();
}

function onNextPage() {
    goNextPage();
    if (gPageIdx + 1 > gBooks.length / PAGE_SIZE) document.querySelector('.next-page').innerText = '< Back to Page 1'
    else document.querySelector('.next-page').innerText = 'Next Page >'
    renderBooks();
}