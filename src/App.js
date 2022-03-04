import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// Apollo Client Setup
const client = new ApolloClient({
  uri: '//mrx-read.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
