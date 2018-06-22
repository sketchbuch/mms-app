import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import store from './js/store/store';
import App from './js/components/App/App';
import { GQL_ENDPOINT } from './js/constants/gql';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: GQL_ENDPOINT + '?access_token=###TOKEN###' }),
  cache: new InMemoryCache()
});

client
.query({
  query: gql`
    {
      viewer { 
        login
      }
    }
  `
})
.then(result => console.log('result', result))
.catch(error => console.log('error', error));
console.log('client', client)
console.log('client.query', client.query)

const AppWithApolloProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <AppWithApolloProvider />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
