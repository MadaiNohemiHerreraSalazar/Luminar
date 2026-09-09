import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Baloo2_400Regular, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components/CustomButton';
import { COLORS } from '../../../core/theme/colors';

interface RegisterScreenProps {
  onRegisterSuccess?: (data: { username: string; email: string; phone: string }) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const handleRegister = () => {
    if (onRegisterSuccess) onRegisterSuccess({ username, email, phone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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