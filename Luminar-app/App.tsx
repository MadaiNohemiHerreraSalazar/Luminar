import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from './src/modules/auth/screens/SplashScreen';
import { InitialScreen } from './src/modules/auth/screens/InitialScreen';
import { LoginScreen } from './src/modules/auth/screens/LoginScreen';
import { RegisterScreen } from './src/modules/auth/screens/RegisterScreen';

type AuthScreenState = 'splash' | 'initial' | 'login' | 'register';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenState>('splash');

  useEffect(() => {
    // Temporizador de 3.5 segundos antes de cambiar de Splash a Initial
    const timer = setTimeout(() => {
      setCurrentScreen('initial');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      {currentScreen === 'splash' && <SplashScreen />}

      {currentScreen === 'initial' && (
        <InitialScreen
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onLoginSuccess={(id) => console.log('Usuario autenticado:', id)}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onRegisterSuccess={(data) => console.log('Usuario registrado:', data)}
        />
      )}
    </SafeAreaProvider>
  );
}