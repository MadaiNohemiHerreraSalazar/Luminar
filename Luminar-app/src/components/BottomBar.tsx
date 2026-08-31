import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../core/theme/colors';

export type TabType = 'alert_dec' | 'shield_dec' | 'map' | 'reports' | 'profile';

interface BottomBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {/* 1. Ícono Decorativo (Triángulo de Alerta) */}
      <View style={styles.iconTab}>
        <Ionicons name="warning" size={32} color="#FF6B4A" />
      </View>

      {/* 2. Ícono Decorativo (Escudo) */}
      <View style={styles.iconTab}>
        <Ionicons name="shield" size={32} color={COLORS.primary} />
      </View>

      {/* 3. Ícono Central Interactivo (Mapa - Hexágono Flutuante Grande) */}
      <TouchableOpacity
        style={styles.centerTabContainer}
        onPress={() => onTabPress('map')}
        activeOpacity={0.8}
        accessibilityLabel="Mapa"
        accessibilityRole="button"
      >
        <View style={styles.hexagonWrapper}>
          <Ionicons name="map-outline" size={36} color={COLORS.secondary} />
        </View>
        <Text style={styles.mapLabel}>Map</Text>
      </TouchableOpacity>

      {/* 4. Ícone Interativo (Denúncia / Megafone) */}
      <TouchableOpacity
        style={styles.iconTab}
        onPress={() => onTabPress('reports')}
        activeOpacity={0.7}
        accessibilityLabel="Denúncias"
        accessibilityRole="button"
      >
        <Ionicons
          name={activeTab === 'reports' ? 'megaphone' : 'megaphone-outline'}
          size={32}
          color={activeTab === 'reports' ? COLORS.white : COLORS.primary}
        />
      </TouchableOpacity>

      {/* 5. Ícone Interativo (Perfil) */}
      <TouchableOpacity
        style={styles.iconTab}
        onPress={() => onTabPress('profile')}
        activeOpacity={0.7}
        accessibilityLabel="Perfil"
        accessibilityRole="button"
      >
        <Ionicons
          name={activeTab === 'profile' ? 'person' : 'person-outline'}
          size={32}
          color={activeTab === 'profile' ? COLORS.white : COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  iconTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Corregido aquí: justifyContent en lugar de justify.content
    paddingVertical: 8,
    minWidth: 48,
  },
  centerTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -36,
  },
  hexagonWrapper: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    transform: [{ rotate: '45deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  mapLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
});