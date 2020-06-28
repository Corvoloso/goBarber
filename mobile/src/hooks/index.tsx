import React from 'react';

import { AuthProvider } from './auth';

const Hooks: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Hooks;
