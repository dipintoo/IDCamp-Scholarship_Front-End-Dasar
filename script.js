// Konstanta untuk menentukan nama event render dan saved
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";

// Nama kunci penyimpanan lokal untuk data buku
const STORAGE_KEY = "BOOK_APPS";

// Array untuk menyimpan data buku
const books = [];

// Element DOM untuk daftar buku belum selesai dan sudah selesai
const uncompletedBookList = document.getElementById("incompleteBookshelfList");
const completedBookList = document.getElementById("completeBookshelfList");

// Menambahkan event listener saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", initializePage);
// Menambahkan event listener untuk event penyimpanan data
document.addEventListener(SAVED_EVENT, handleSaveEvent);
// Menambahkan event listener untuk event render
document.addEventListener(RENDER_EVENT, renderBooks);

// Fungsi inisialisasi saat halaman dimuat
function initializePage() {
  // Menambahkan event listener untuk form pencarian
  document.getElementById("searchBook").addEventListener("submit", handleSearch);
  // Menambahkan event listener untuk form penambahan buku
  document.getElementById("inputBook").addEventListener("submit", handleBookSubmission);
  // Memuat data dari penyimpanan lokal jika didukung
  isStorageSupported() && loadDataFromStorage();
}

// Fungsi untuk menampilkan overlay
function showOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  // Mencegah scrolling pada body
  document.body.style.overflow = "hidden";
}

// Fungsi untuk menyembunyikan overlay
function hideOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  // Mengembalikan scrolling pada body
  document.body.style.overflow = "auto";
}

// Fungsi penangan event saat formulir pencarian di-submit
function handleSearch(event) {
  event.preventDefault();
  // Mendapatkan nilai input pencarian
  const searchTerm = document.getElementById("searchBookTitle").value;
  // Mencari buku berdasarkan kata kunci pencarian
  renderSearchResults(searchBooks(searchTerm));
}

// Fungsi penangan event saat formulir penambahan buku di-submit
function handleBookSubmission(event) {
  event.preventDefault();
  // Menampilkan overlay
  showOverlay();
  // Menambahkan buku baru
  addBook();
}

// Fungsi penangan event saat data berhasil disimpan
function handleSaveEvent() {
  console.log("Data berhasil di simpan.");
}

// Fungsi untuk mengecek apakah penyimpanan lokal didukung
function isStorageSupported() {
  // Menampilkan pesan jika penyimpanan lokal tidak didukung
  if (typeof Storage === "undefined") {
    alert("Browser tidak mendukung penyimpanan lokal");
    return false;
  }
  return true;
}

// Fungsi untuk menyimpan data ke penyimpanan lokal
function saveData() {
  // Menyimpan data ke penyimpanan lokal jika didukung
  if (isStorageSupported()) {
    const serializedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, serializedData);
    // Memicu event bahwa data berhasil disimpan
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// Fungsi untuk memuat data dari penyimpanan lokal
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  // Parse data dari penyimpanan lokal atau gunakan array kosong jika tidak ada data
  const data = JSON.parse(serializedData) || [];
  // Menambahkan data ke array books
  books.push(...data);
  // Memicu event render setelah data dimuat
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// Fungsi untuk menghasilkan ID unik berdasarkan timestamp
function generateId() {
  return +new Date();
}

// Fungsi untuk menghasilkan objek buku
function generateBookObject(id, title, author, year, isCompleted) {
  return { id, title, author, year, isCompleted };
}

// Fungsi untuk menemukan buku berdasarkan ID
function findBook(bookId) {
  return books.find((bookItem) => bookItem.id === bookId) || null;
}

// Fungsi untuk menemukan indeks buku berdasarkan ID
function findBookIndex(bookId) {
  return books.findIndex((bookItem) => bookItem.id === bookId);
}

// Fungsi untuk membuat elemen tombol dengan teks, kelas, dan event klik tertentu
function createButton(text, className, clickEvent) {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add(className);
  button.addEventListener("click", clickEvent);
  return button;
}

// Fungsi untuk menambahkan buku baru
function addBook() {
  const titleInput = document.getElementById("inputBookTitle");
  const authorInput = document.getElementById("inputBookAuthor");
  const yearInput = document.getElementById("inputBookYear");
  const isCompletedInput = document.getElementById("inputBookIsComplete").checked;

  // Membuat ID baru untuk buku
  const generatedID = generateId();

  // Mengonversi tahun menjadi angka menggunakan Number()
  const yearValue = Number(yearInput.value);

  // Memeriksa apakah tahun sesuai dengan pola yang ditentukan
  if (yearInput.checkValidity()) {
    // Membuat objek buku baru
    const bookObject = generateBookObject(generatedID, titleInput.value, authorInput.value, yearValue, isCompletedInput);

    // Menambahkan buku ke array books
    books.push(bookObject);
    // Memicu event render setelah buku ditambahkan
    document.dispatchEvent(new Event(RENDER_EVENT));
    // Menyimpan data setelah buku ditambahkan
    saveData();

    // Menampilkan kotak dialog notifikasi
    const notificationDialog = document.getElementById("notificationDialog");
    notificationDialog.style.display = "block";

    // Menghilangkan kotak dialog notifikasi setelah beberapa detik
    setTimeout(() => {
      notificationDialog.style.display = "none";
      hideOverlay();
    }, 1800);
  }
}

// Fungsi untuk mengupdate status selesai atau belum selesai dari buku
function updateBookStatus(bookId, isCompleted) {
  const bookTarget = findBook(bookId);
  if (bookTarget) {
    bookTarget.isCompleted = isCompleted;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
}

// Fungsi untuk menghapus buku berdasarkan ID dengan konfirmasi
function deleteBook(bookId) {
  const bookTargetIndex = findBookIndex(bookId);
  if (bookTargetIndex !== -1) {
    const deleteConfirmationDialog = document.getElementById("deleteConfirmationDialog");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    deleteConfirmationDialog.style.display = "block";
    showOverlay();

    // Tindakan jika tombol OK ditekan
    confirmDeleteButton.onclick = function() {
      books.splice(bookTargetIndex, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
      deleteConfirmationDialog.style.display = "none";
      hideOverlay();
    };

    // Tindakan jika tombol Cancel ditekan
    cancelDeleteButton.onclick = function() {
      deleteConfirmationDialog.style.display = "none";
      hideOverlay();
    };
  }
}

// Fungsi untuk menangani perubahan status selesai atau belum selesai dari buku
function handleBookStatusChange(bookId, isCompleted) {
  isCompleted ? addBookToCompleted(bookId) : undoBookFromCompleted(bookId);
}

// Fungsi untuk menambahkan buku ke dalam daftar sudah selesai
function addBookToCompleted(bookId) {
  updateBookStatus(bookId, true);
}

// Fungsi untuk mengembalikan buku dari daftar sudah selesai
function undoBookFromCompleted(bookId) {
  updateBookStatus(bookId, false);
}

// Fungsi untuk membuat elemen buku yang akan dirender
function makeBookElement(bookObject) {
  const { id, title, author, year, isCompleted } = bookObject;

  // Membuat elemen-elemen HTML untuk buku
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = `Author: ${author}`;

  const bookYear = document.createElement("p");
  bookYear.innerText = `Year: ${year}`;

  const action = document.createElement("div");
  action.classList.add("action");

  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book_item");
  bookContainer.setAttribute("id", id);
  bookContainer.append(bookTitle, bookAuthor, bookYear, action);

  const bookCheck = document.getElementById("inputBookIsComplete");

  // Menambahkan buku ke dalam daftar yang sesuai berdasarkan status selesai atau belum selesai
  (isCompleted ? completedBookList : uncompletedBookList).append(bookContainer);

  // Menambahkan tombol aksi berdasarkan status selesai atau belum selesai
  const buttons = [createButton(isCompleted ? "Ongoing" : "Completed", "primary-btn", () => handleBookStatusChange(id, !isCompleted)), createButton("Delete", "subtle-btn", () => deleteBook(id))];

  action.append(...buttons);

  const editButton = createButton("Edit", "edit-btn", () => handleEditBook(bookObject));
  action.appendChild(editButton);

  return bookContainer;
}

// Fungsi untuk menangani tombol "Edit" pada buku
function handleEditBook(bookObject) {
  const editBookForm = document.getElementById("editBookForm");
  const editBookTitle = document.getElementById("editBookTitle");
  const editBookAuthor = document.getElementById("editBookAuthor");
  const editBookYear = document.getElementById("editBookYear");
  const editBookIsComplete = document.getElementById("editBookIsComplete");
  const saveEditButton = document.getElementById("saveEditButton");
  const cancelEditButton = document.getElementById("cancelEditButton");

  // Menampilkan overlay sebelum menampilkan formulir edit
  showOverlay();

  // Mengisi formulir edit dengan data buku yang ada
  editBookTitle.value = bookObject.title;
  editBookAuthor.value = bookObject.author;
  editBookYear.value = bookObject.year;
  editBookIsComplete.checked = bookObject.isCompleted;

  // Menampilkan formulir edit
  editBookForm.style.display = "block";

  // Tindakan jika tombol "Save" pada formulir edit ditekan
  saveEditButton.onclick = function() {
    // Memperbarui data buku dengan data yang diedit
    bookObject.title = editBookTitle.value;
    bookObject.author = editBookAuthor.value;

    // Mengonversi tahun menjadi angka menggunakan Number()
    let editedYear = editBookYear.value;

    // Memastikan bahwa tahun adalah angka dan memiliki panjang 4 digit
    const yearPattern = /^\d{4}$/;
    if (yearPattern.test(editedYear)) {
      bookObject.year = Number(editedYear);
      bookObject.isCompleted = editBookIsComplete.checked;

      // Memperbarui tampilan buku setelah edit
      document.dispatchEvent(new Event(RENDER_EVENT));
      // Menyimpan data setelah buku diedit
      saveData();

      // Menyembunyikan formulir edit
      editBookForm.style.display = "none";
      hideOverlay();
    } else {
      // Menampilkan pesan kesalahan di kolom input
      editBookYear.setCustomValidity("Please input the year as a 4-digit number, such as 2023.");
      editBookYear.reportValidity();
    }
  };

  // Tindakan jika tombol "Cancel" pada formulir edit ditekan
  cancelEditButton.onclick = function() {
    // Menyembunyikan formulir edit tanpa menyimpan perubahan
    editBookForm.style.display = "none";
    hideOverlay();
  };
}

// Fungsi untuk mencari buku berdasarkan kata kunci
function searchBooks(searchTerm) {
  return books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Fungsi untuk merender hasil pencarian
function renderSearchResults(searchResults) {
  // Mengosongkan daftar buku belum selesai dan sudah selesai
  uncompletedBookList.innerHTML = "";
  completedBookList.innerHTML = "";

  // Menampilkan hasil pencarian ke dalam daftar yang sesuai
  for (const bookItem of searchResults) {
    const bookElement = makeBookElement(bookItem);
    (bookItem.isCompleted ? completedBookList : uncompletedBookList).append(bookElement);
  }
}

// Fungsi untuk merender semua buku
function renderBooks() {
  // Mengosongkan daftar buku belum selesai dan sudah selesai
  uncompletedBookList.innerHTML = "";
  completedBookList.innerHTML = "";

  // Menampilkan semua buku ke dalam daftar yang sesuai
  for (const bookItem of books) {
    const bookElement = makeBookElement(bookItem);
    (bookItem.isCompleted ? completedBookList : uncompletedBookList).append(bookElement);
  }
}
