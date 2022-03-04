import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { getBooksQuery } from '../queries/queries';

// Components
import BookDetails from './BookDetails';

function BookList() {
  const getBooksResult = useQuery(getBooksQuery);
  const [id, setId] = useState(null);
  function displayBooks() {
    const { loading, error, data } = getBooksResult;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Something went wrong :((</div>;
    }
    return data.books.map((book) => {
      return (
        <li key={book.id} onClick={ (e) => setId(book.id) }>
          {book.name}
        </li>
      );
    });
  }
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={ id } />
    </div>
  );
}

export default BookList;
