import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomBar, TabType } from './src/components/BottomBar';
import { COLORS } from './src/core/theme/colors';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('map');

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>Tela Ativa: {currentTab.toUpperCase()}</Text>
        </View>

        <BottomBar
          activeTab={currentTab}
          onTabPress={(tab) => setCurrentTab(tab)}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});