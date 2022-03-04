import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
  const getAuthorsResult = useQuery(getAuthorsQuery);
  const [addBook, addBookResult] = useMutation(addBookMutation);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  function displayAuthors() {
    const { loading, error, data } = getAuthorsResult;
    if (loading) {
      return <option disabled>Loading...</option>;
    }
    if (error) {
      return <option disabled>Error in loading data!</option>;
    }
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }
  function submitForm(e) {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }
  return (
    <form id="add-book" onSubmit={submitForm.bind(this)}>
      <div className="field">
        <label>Book Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
