import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Baloo2_400Regular, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components/CustomButton';
import { COLORS } from '../../../core/theme/colors';
import { useAuth } from '../../../core/context/AuthContext';

interface LoginScreenProps {
  onNavigateBack?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigateBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const [fontsLoaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
  });

  useEffect(() => {
    const backAction = () => {
      if (onNavigateBack) {
        onNavigateBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onNavigateBack]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      Alert.alert('¡Bienvenido!', 'Sesión iniciada correctamente.');
    } catch (error: any) {
      Alert.alert('Error de inicio de sesión', error.message || 'Credenciales inválidas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Sign in</Text>
          </View>

          <View style={styles.formCenterContainer}>
            <CustomInput
              label="Email"
              placeholder="Example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="Password"
              placeholder="••••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <CustomButton
              title="Sign in"
              variant="secondary"
              onPress={handleLogin}
              loading={loading}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 36,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  formCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  submitButton: {
    marginTop: 10,
  },
});