import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/core/context/AuthContext';
import { SplashScreen } from './src/modules/auth/screens/SplashScreen';
import { InitialScreen } from './src/modules/auth/screens/InitialScreen';
import { LoginScreen } from './src/modules/auth/screens/LoginScreen';
import { RegisterScreen } from './src/modules/auth/screens/RegisterScreen';

const RootNavigator = () => {
  const { user, loading, logout } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'initial' | 'login' | 'register'>('splash');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('initial');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || currentScreen === 'splash') {
    return <SplashScreen />;
  }

  // Si el usuario está autenticado, mostramos una pantalla temporal con su información
  if (user) {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.welcomeText}>¡Sesión iniciada!</Text>
        <Text style={styles.userText}>{user.email}</Text>
        <Button title="Cerrar Sesión" onPress={logout} />
      </View>
    );
  }

  return (
    <>
      {currentScreen === 'initial' && (
        <InitialScreen
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}
      {currentScreen === 'login' && (
        <LoginScreen onNavigateBack={() => setCurrentScreen('initial')} />
      )}
      {currentScreen === 'register' && (
        <RegisterScreen onNavigateBack={() => setCurrentScreen('initial')} />
      )}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});