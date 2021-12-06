function Book (title, author, isRead, pages) {
    this.title = title; 
    this.author = author;
    this.isRead = isRead;
    this.pages = pages;
    this.info = function(){
        if(isRead){
            return("The "+title+" by "+author+", "+ pages +" pages " + ", already read");
        } else {
            return("The "+title+" by "+author+", "+ pages +" pages" + ", not read yet");
        };  
    };
};

let mobyDick = new Book('Moby Dick', 'Pushkin', false, 300);

let pmp = new Book('PMP exam prep', 'Rita Mulcahy', true, 500);

console.log(mobyDick.info());
console.log(pmp.info());

