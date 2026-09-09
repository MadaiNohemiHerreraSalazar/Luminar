import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { COLORS } from '../../../core/theme/colors';

export const SplashScreen: React.FC = () => {
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
      <Text style={styles.logoTitle}>Luminar</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0434', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  logoTitle: {
    fontFamily: 'Lobster_400Regular',
    fontSize: 48,
    color: COLORS.white,
  },
});