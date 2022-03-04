import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
  const getBookResult = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });
  function displayBookDetails() {
    const { loading, error, data } = getBookResult;
    if (loading) {
      return <p>Loading details...</p>;
    }
    if (error) {
      return <p>Error in loading book details...</p>;
    }
    if (!data.book) {
      return (<div>No book selected...</div>);
    }
    return (
      <div>
        <h2>{ data.book.name }</h2>
        <p>Genre: { data.book.genre }</p>
        <p>Author: { data.book.author.name }</p>
        <p>All Books by { data.book.author.name }:</p>
        <ul className="other-books">
          { data.book.author.books.map((book) => {
            return <li key={ book.id }>{book.name}</li>
          }) }
        </ul>
      </div>
    );
  }
  return <div id="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
