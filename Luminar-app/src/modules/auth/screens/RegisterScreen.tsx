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

interface RegisterScreenProps {
  onNavigateBack?: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

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

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Campos obligatorios', 'Por favor completa usuario, correo y contraseña.');
      return;
    }

    try {
      setLoading(true);
      await register(email.trim(), password, username.trim(), phone.trim());
      Alert.alert('¡Cuenta creada!', 'El registro en Firebase y Firestore fue exitoso.');
    } catch (error: any) {
      Alert.alert('Error de registro', error.message || 'No se pudo crear la cuenta.');
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
            <Text style={styles.title}>Sign up</Text>
          </View>

          <View style={styles.formCenterContainer}>
            <CustomInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <CustomInput
              label="Email"
              placeholder="Example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="Phone Number"
              placeholder="XX + | XXXX - XXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <CustomInput
              label="Password"
              placeholder="••••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <CustomButton
              title="Sign up"
              variant="secondary"
              onPress={handleRegister}
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