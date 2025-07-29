import React, { useState, useEffect } from 'react';

const BookForm = ({ onAdd, onUpdate, editingBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
      setGenre(editingBook.genre);
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
      setGenre('');
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
  e.preventDefault();

  // Validaciones básicas
  if (!title.trim() || !author.trim() || !genre.trim() || year === '') {
  alert('Todos los campos son obligatorios.');
  return;
}


  // Validación de año
  const parsedYear = parseInt(year, 10);
  const currentYear = new Date().getFullYear();

  if (
    isNaN(parsedYear) ||
    parsedYear < 1000 || // Limite inferior (puedes ajustarlo)
    parsedYear > currentYear
  ) {
    alert(`El año debe ser un número válido entre 1000 y ${currentYear}.`);
    return;
  }

  const newBook = {
    id: editingBook ? editingBook.id : null,
    title: title.trim(),
    author: author.trim(),
    year: parsedYear,
    genre: genre.trim(),
  };

  if (editingBook) {
    onUpdate(newBook);
  } else {
    onAdd(newBook);
  }

  // Limpiar formulario
  setTitle('');
  setAuthor('');
  setYear('');
  setGenre('');
};



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del libro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor del libro"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Año de publicación"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Género"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <button type="submit">{editingBook ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default BookForm;
