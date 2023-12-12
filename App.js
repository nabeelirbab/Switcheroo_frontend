import React from 'react';
import Navigation from './Src/navigation/Navigation';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import { store } from './Src/redux/store';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

// Initialize Apollo Client
const hostUrl = 'http://13.50.221.83/';

const link = createHttpLink({
  uri: hostUrl,
  credentials: 'include',
});

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

LogBox.ignoreAllLogs()



const App = () => {


  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Navigation />
        <Toast />

      </Provider>
    </ApolloProvider>
  );
};

export default App;
