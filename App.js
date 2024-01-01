import React, { useEffect, useState } from 'react';
import Navigation from './Src/navigation/Navigation';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import { store } from './Src/redux/store';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { SuccessTeastModal } from './Src/components/SuccessToast';
import { newEvents } from './Src/CustomEvents/CustomEvents';

// Initialize Apollo Client
const hostUrl = 'http://13.50.221.83/';
// const hostUrl = 'http://172.17.240.1:5002/';

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

  const [ToastMoodal, setToastMoodal] = useState(false)
  const [ToastTitle, setToastTitle] = useState('')

  useEffect(() => {

    newEvents.on('Toastmessage', function (text) {
      setToastTitle(text)
      setToastMoodal(true)
      console.log('ToastmessageToastmessageToastmessageToastmessage', text)
    })
  }, [])

  return (

    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Navigation />
        <Toast />
        <SuccessTeastModal
          modal={ToastMoodal}
          setModal={setToastMoodal}
          title={ToastTitle}
        />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
