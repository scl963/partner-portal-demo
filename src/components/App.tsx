import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import AppRouter from '../router/AppRouter';
import { createHttpLink } from 'apollo-link-http';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import HttpsRedirect from 'react-https-redirect';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { MockedProvider } from 'react-apollo/test-utils';

import './App.css';

const env = runtimeEnv();

const httpLink = createHttpLink({ uri: 'test' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

class App extends React.Component {
  public render() {
    return (
      <HttpsRedirect>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </HttpsRedirect>
    );
  }
}

export default App;
