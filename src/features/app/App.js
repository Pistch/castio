import React from 'react';
import {Provider} from 'react-redux';
import {NativeRouter, Route} from 'react-router-native';

import configureStore from 'castio/src/store';
import Recording from 'castio/src/features/recording/components/Recording';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Route exact path="/" component={Recording} />
      </NativeRouter>
    </Provider>
  );
}
