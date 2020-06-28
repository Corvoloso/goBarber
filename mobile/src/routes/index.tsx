import React from 'react';

import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/auth';

import AuthStack from './auth.routes';
import AppStack from './app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#312e38',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
};

export default Routes;
