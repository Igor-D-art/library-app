const input = document.querySelectorAll('input');
const library=[];
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('isRead');

// const isRead = function(){
//     if (document.getElementById('isRead')=='on'){
//         return (isRead = true);
//     } 
//     else { returen (isRead=false)};
// };



const submit = document.getElementById('submit');

const clear = document.getElementById('clearInp');
clear.addEventListener("click", ()=>{
    clearInput();
});




function Book (title, author, pages, isRead) {
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function(){
        if(isRead){
            return("The "+title+" by "+author+", "+ pages +" pages " + ", already read");
        } else {
            return("The "+title+" by "+author+", "+ pages +" pages" + ", not read yet");
        };  
    };
};

// Add input structure

function displayPopup () {
    const addBtn = document.querySelector('#input');
    const popup = document.getElementById('popup');
    addBtn.addEventListener('click', ()=>{
        popup.classList.toggle('popvisible');
    });
};

function displayLibrary () {
    let libSection = document.getElementById('library-section');
        let bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            Title: ${library[library.length-1].title}; 
            Author: ${library[library.length-1].author}; 
            Number of pages: ${library[library.length-1].pages}; 
            Already read: ${library[library.length-1].isRead}`;
        libSection.appendChild(bookDiv);
}; 

function storeInput () {
    submit.addEventListener('click', ()=>{
        if (validateFields()){
            let book = new Book(title.value, author.value, pages.value, isRead.value);
            library.push(book);
            displayLibrary();
            clearInput();
        };
    });

};

function validateFields() {
    if (title.value.length!==0 &&
        author.value.length!==0 &&
        pages.value.length!==0){
            return true;
        } 
        else {
            alert ('Please fill in all mandatory fields');
        };
};

function clearInput() {
    for (i=0; i<input.length; i++){
        input[i].value = '';
    }
};


displayPopup();
storeInput();