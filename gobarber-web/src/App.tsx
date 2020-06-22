import React from 'react';

import { AuthProvider } from './hooks/AuthContext';

import GlobalStyles from './styles/global';

import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyles />
  </>
);

export default App;
