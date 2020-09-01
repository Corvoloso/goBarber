import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

import HooksProvider from './hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#28262e" />

      <HooksProvider>
        <Routes />
      </HooksProvider>
    </NavigationContainer>
  );
};

export default App;
