// declare global variables and put event listeners on some

const input = document.querySelectorAll('input'); // array-like object contains all inputs on the page
const library=[]; // the main storage of book objects
const title = document.getElementById('title');    // these are fields on book-adding popup
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('isRead'); // checkbox on book-adding popup
const libSection = document.getElementById('library-section'); // just removed let (made libSection as a global var)
const submit = document.getElementById('submit'); 
const clear = document.getElementById('clearInp');
clear.addEventListener("click", ()=>{
    clearInput();
});



// book constructor

function Book (title, author, pages, isRead) {
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
};

// Read status toggle method on Book.prototype

Book.prototype.statToggle = function(statChbx){
    if(statChbx.checked){
       this.isRead=true;
    } else { 
       this.isRead=false;
    };
};

// Info method on Book.prototype

Book.prototype.info = function(){
    if(this.isRead){
        return("The "+this.title+" by "+this.author+", "+ this.pages +" pages " + ", already read");
    } else {
        return("The "+this.title+" by "+this.author+", "+ this.pages +" pages" + ", not read yet");
    };  
};

// Display popoup function opens popup to fill in a book details

function displayPopup () {
    const addBtn = document.querySelector('#input');
    const popup = document.getElementById('popup');
    addBtn.addEventListener('click', ()=>{
        popup.classList.toggle('popvisible'); // adds a CSS class that makes the popup visible
    });
};

// DisplayRecords loops over the library array and adds div's wiht all the needed info for every book in library

function displayRecords () {
// clear the book list to display the updated list (if any record was removed)
    clearBookList();

// actual display of the remeining (or new added) records

    for(i=0; i<library.length; i++){   
      let bookRec = document.createElement('div');
      let titleSpan = document.createElement('span');
      let authorSpan = document.createElement('span');
      let pagesSpan = document.createElement('span');
      titleSpan.innerHTML = `Title: ${library[i].title}`;
      authorSpan.innerHTML = `Author: ${library[i].author}`;
      pagesSpan.innerHTML = `Number of pages: ${library[i].pages}`;

 // Read status checkbox and its label setup for each book record

      let statChbx = document.createElement('input');
      statChbx.setAttribute('type', 'checkbox');
      statChbx.setAttribute('id', `${i}`);
      let readStatId = statChbx.getAttribute('id'); // defining id of a particular checkbox and pass it to function
      statChbx.addEventListener('click', ()=>{
        library[readStatId].statToggle(statChbx);  // need to check this
        console.log(`Record ${readStatId} isRead property is  ${library[readStatId].isRead}`);
      });
      
      let statLbl = document.createElement('label');
      statLbl.innerHTML='Already read?';
      statLbl.setAttribute('for', `${i}`);
     
      if(library[i].isRead===true){
        statChbx.checked=true;
     };
      
  // Delete button setup 

      let delBtn = document.createElement('button');
      delBtn.innerHTML='Remove';
      delBtn.setAttribute('class', 'remove');
      let dataIndex = delBtn.setAttribute('data-index', `${i}`)
      delBtn.addEventListener('click', ()=>{
          removeBook(delBtn);                          // addint EventListener to each button when created
      });

 // Adding Delete btn and Read Status checkbox to the record and the record to the document (page)
      bookRec.appendChild(titleSpan);
      bookRec.appendChild(authorSpan);
      bookRec.appendChild(pagesSpan);
      bookRec.appendChild(statLbl);
      bookRec.appendChild(statChbx);
      bookRec.appendChild(delBtn);
      libSection.appendChild(bookRec);

    };

}; 

// Store input function adds the book instances into the library array and invokes the other essential functions

function storeInput () {
    submit.addEventListener('click', ()=>{
        if (validateFields()){
            let book = new Book(title.value, author.value, pages.value, isRead);
            getReadStatus(book);
            library.push(book);
            displayRecords();
            clearInput();
        };
    });
};

// Displays the initial isRead status and sets the book instance isRead status

function getReadStatus (book) {
    if(book!==undefined){
        book.isRead=false;
    };
    if (isRead.checked){
    book.isRead = true;
   };
};

// Validates fields 

function validateFields () {
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
    for (j=0; j<input.length; j++){
        input[j].value = '';
    }
    isRead.checked=false;
};

function clearBookList () {
    while(libSection.firstChild) {
        libSection.removeChild(libSection.firstChild);
    };
};

function removeBook (delBtn) {
  remIndex = delBtn.getAttribute('data-index')
  library.splice(remIndex, 1);
  displayRecords();
   
};



displayPopup();
storeInput();
getReadStatus();

