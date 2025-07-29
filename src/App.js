import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import bibliotecaVirtual from './assets/biblioteca-virtual.png';


function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(storedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const updateBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este libro será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setBooks(books.filter((book) => book.id !== id));
        Swal.fire('¡Eliminado!', 'El libro ha sido eliminado.', 'success');
      }
    });
  };

const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Lista de Libros', 10, 10);

  let y = 20;

  books.forEach((book, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. Título: ${book.title}`, 10, y);
    doc.text(`   Autor: ${book.author}`, 10, y + 7);
    doc.text(`   Año: ${book.year}`, 10, y + 14);
    doc.text(`   Género: ${book.genre}`, 10, y + 21);
    y += 30;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('libros.pdf');
};


  return (
    <div className="container">
      <img src={bibliotecaVirtual} alt="Biblioteca Virtual" className="logo" />
      <h1>Biblioteca Virtual</h1>

      <BookForm
        onAdd={addBook}
        onUpdate={updateBook}
        editingBook={editingBook}
      />
      <BookList
        books={books}
        onEdit={setEditingBook}
        onDelete={deleteBook}
      />
      <button onClick={exportToPDF} className="export-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 24 24">
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8L14 2.586A2 2 0 0 0 12.828 2H6zm7 1.414L18.586 9H14a1 1 0 0 1-1-1V3.414zM8 13h1v-2H8v2zm2 0h1v-2h-1v2zm2 0h1v-2h-1v2z" />
    </svg>
      Exportar libros a PDF
    </button>

    </div>
  );
}

export default App;
