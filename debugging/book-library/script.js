const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const trimmedTitle = titleInput.value.trim();
  const trimmedAuthor = authorInput.value.trim();
  const trimmedPageNumbers = +pagesInput.value.trim();

  if (!trimmedTitle || !trimmedAuthor || !Number.isInteger(trimmedPageNumbers) || trimmedPageNumbers <= 0) {
    alert("Please fill all fields! Page count must be a positive integer.");
    return false;
  } else {
    let book = new Book(
      trimmedTitle,
      trimmedAuthor,
      trimmedPageNumbers,
      readCheckbox.checked
    );
    myLibrary.push(book);

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readCheckbox.checked = false;
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const tbody = table.querySelector("tbody");
  //clear tbody
  tbody.innerHTML = "";
  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    changeBut.innerHTML = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delBut = document.createElement("button");
    deleteCell.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("click", function () {
      const deletedBook = myLibrary[i];
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedBook.title}`);
    });
  }
}
