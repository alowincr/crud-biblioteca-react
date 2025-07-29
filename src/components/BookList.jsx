import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return <p>No hay libros aún.</p>;
  }

  return (
    <div id="book-list-content">
      <div className="book-list">
        {books.map((book) => (
          <div className="book-item" key={book.id}>
            <h3 className="book-title">{book.title}</h3>
            <div className="book-info">
              <p><span>Autor:</span> {book.author}</p>
              <p><span>Año:</span> {book.year}</p>
              <p><span>Género:</span> {book.genre}</p>
            </div>
            <div className="actions">
              <button className="edit-button" onClick={() => onEdit(book)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "6px" }}>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
        </svg>
        Editar
        </button>

        <button
        className="delete-button"
        onClick={() => onDelete(book.id)}
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "6px" }}>
            <path d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
        </svg>
        Eliminar
        </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
