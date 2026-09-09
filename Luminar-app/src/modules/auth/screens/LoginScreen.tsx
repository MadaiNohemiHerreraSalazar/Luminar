import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Baloo2_400Regular, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components/CustomButton';
import { COLORS } from '../../../core/theme/colors';

interface LoginScreenProps {
  onLoginSuccess?: (identifier: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
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

  const handleLogin = () => {
    if (onLoginSuccess) onLoginSuccess(identifier);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Sign in</Text>
        </View>

        <View style={styles.formCenterContainer}>
          <CustomInput
            label="Username/Email"
            placeholder="Username/Email"
            value={identifier}
            onChangeText={setIdentifier}
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