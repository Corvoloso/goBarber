/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setUserData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setUserData({} as AuthState);
  }, []);

  useEffect(() => {
    const loadStorages = async (): Promise<void> => {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setUserData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    };

    loadStorages();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userData.user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within context');
  }

  return context;
};
