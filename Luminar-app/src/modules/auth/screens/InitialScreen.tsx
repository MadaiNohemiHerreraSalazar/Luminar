import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { CustomButton } from '../../../components/CustomButton';
import { COLORS } from '../../../core/theme/colors';

interface InitialScreenProps {
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export const InitialScreen: React.FC<InitialScreenProps> = ({
  onNavigateToLogin,
  onNavigateToRegister,
}) => {
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTitle}>Luminar</Text>
      </View>

      <View style={styles.actionsContainer}>
        <CustomButton
          title="Sign up"
          variant="primary"
          onPress={onNavigateToRegister || (() => {})}
          style={styles.buttonSpacing}
        />

        <CustomButton
          title="Sign in"
          variant="outline"
          onPress={onNavigateToLogin || (() => {})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0434',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTitle: {
    fontFamily: 'Lobster_400Regular',
    fontSize: 48,
    color: COLORS.white,
  },
  actionsContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  buttonSpacing: {
    marginBottom: 16,
  },
});