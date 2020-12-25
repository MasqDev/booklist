//Book Constructor
function Book (title,author,isbn){
this.title= title;
this.author= author;
this.isbn= isbn;
}

// UI Constrctor
function UI (){}

//To add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('bookList');
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td> <a href="#" class="delete">x</a></td>
`;
  
    list.appendChild(row);
  
  }

//To show alert
UI.prototype.showAlert = function (message, className){

    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#bk-list');

    container.insertBefore(div, form);

    setTimeout (function(){
        document.querySelector('.alert').remove();
}, 3000);

}

//To clear fields
UI.prototype.clearFields = function (){
document.getElementById('title').value = '';
document.getElementById('author').value = '';
document.getElementById('isbn').value = '';

}


//To delete book inputs
UI.prototype.deleteInputs = function (target) {
    if(target.className ==="delete"){
        target.parentElement.parentElement.remove();
    }
}



//Event listener AddBook
document.querySelector('#bk-list').addEventListener('submit', function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
      } else {

        // Add book to list
        ui.addBookToList(book);
    
        // Show success
        ui.showAlert('Book Added!', 'success');
      
        // Clear fields
        ui.clearFields();
      }
e.preventDefault();
});


// Event Listener for delete
document.querySelector('#bookList').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteInputs(e.target);
  
    // Show message
    ui.showAlert('Book Removed!', 'error');
  
    e.preventDefault();
  });