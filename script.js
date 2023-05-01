if (localStorage.getItem('Added Books') == null) {
  localStorage.setItem('Added Books', JSON.stringify([]));
}

let storedBooksList = JSON.parse(localStorage.getItem('Added Books'));

function updatelocalStorage() {
  localStorage.setItem('Added Books', JSON.stringify(storedBooksList));
}

function createBooks(arr) {
  let books = '';
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].id = i;
    books += `<p>${arr[i].title}</p>
    <p>${arr[i].author}</p>
    <button onclick="removeBook(${i})">Remove</button>
    <hr/>`;
  }
  return books;
}

function displayBooks() {
  const container = document.querySelector('.books-list');
  container.innerHTML = createBooks(storedBooksList);
}

function addNewBook(title, author) {
  const id = storedBooksList.length;
  const book = {
    id,
    title,
    author,
  };
  storedBooksList.push(book);
  updatelocalStorage();
  displayBooks();
  document.querySelector('.title').value = '';
  document.querySelector('.author').value = '';
}

function removeBook(id) {
  storedBooksList = storedBooksList.filter((el) => el.id !== id);
  updatelocalStorage();
  displayBooks();
}

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  e.preventDefault();
  addNewBook(title.value, author.value);
});

removeBook();

displayBooks();
