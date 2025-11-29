// HTML Elements

var nameInput = document.getElementById("nameInput");
var autherInput = document.getElementById("autherInput");
var priceInput = document.getElementById("priceInput");
var categoryInput = document.getElementById("categoryInput");
var descriptionInput = document.getElementById("descriptionInput");
var rateInput = document.getElementById("rateInput");
var gallery = document.getElementById("gallery");
var search = document.getElementById("searchInput");
var nameRegex = /^[a-zA-Z0-9_-\s]{3,15}$/;
var priceRegex = /^[0-9]{1,4}$/;
var categoryRegex = /^[a-zA-Z\s]{3,35}$/;
var rateRegex = /^[0-5]$/;
var descriptionRegex = /^[a-zA-Z\s0-9]{20,}$/;
var searchRegex = /^[a-z0-9_-]{3,15}$/;


// App Variables

var books = JSON.parse(localStorage.getItem("books")) || [];
displayAllBooks();


// Functions

function addBook() {
    if (validation()) {
            var book = {
            name:nameInput.value,
            auther:autherInput.value,
            price:priceInput.value,
            category:categoryInput.value,
            description:descriptionInput.value,
            rate:rateInput.value
        }
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    console.log(books);
    displayBook(books.length - 1);
    clearInput();
    }
}
function displayBook(index) {
    var stars = "";
    for (var i = 0; i<books[index].rate; i++){
        stars += `<i class="fa-solid fa-star"></i>`
    }
    gallery.innerHTML += `
        <div class="Card p-3">
                    <div class="card px-3 py-1">
                        <div class="card-img">
                            <img src="" alt="">
                        </div>
                        <h2 class="h5">${books[index].name}</h2>
                        <div class="card-cont d-flex gap-3">
                            <h2 class="h6">${books[index].auther}</h2>
                            <h2 id="stars" class="h6">${stars}</h2>
                        </div>
                        <div class="card-cont d-flex justify-content-between">
                            <p>${books[index].price}<i class="fa-solid fa-money-check-dollar dollar"></i></p>
                            <p>${books[index].category}</p>
                        </div>
                        <p class="description">${books[index].description}</p>
                        <div class="btns d-flex gap-3">
                        <button class="btn btn-outline-warning">Update</button>
                        <button onclick="deleteBook(${index})" class="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
        </div>
    `
}
function displayAllBooks() {
    for(var i = 0 ; i < books.length ; i++){
        displayBook(i);
    }
}
function clearInput() {
    nameInput.value="";
    autherInput.value="";
    priceInput.value="";
    categoryInput.value="";
    rateInput.value="";
    descriptionInput.value="";
}
function deleteBook(index) {
    books.splice(index,1);
    localStorage.setItem("books", JSON.stringify(books));
    clearGallery();
    displayAllBooks();
}
function clearGallery() {
    gallery.innerHTML = "";
}
function SearchBook() {
    clearGallery();
    for(var i = 0 ; i < books.length ; i++){
        if(books[i].name.toLowerCase().includes(search.value.toLowerCase())){
            displayBook(i);
        }
    }
}
function validate(element, regex){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
}
function validation () {
    return validate(nameInput, nameRegex) && validate(autherInput, nameRegex) && validate(priceInput, priceRegex) && validate(categoryInput, categoryRegex) && validate(descriptionInput, descriptionRegex) && validate(rateInput, rateRegex);
}