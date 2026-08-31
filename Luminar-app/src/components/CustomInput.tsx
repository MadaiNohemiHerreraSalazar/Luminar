import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../core/theme/colors';

export type InputVariant = 'outlined' | 'underlined';

interface CustomInputProps extends TextInputProps {
  label: string;
  variant?: InputVariant;
  isPassword?: boolean;
  showEditIcon?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  variant = 'outlined',
  isPassword = false,
  showEditIcon = false,
  style,
  ...restProps
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  const isUnderlined = variant === 'underlined';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isUnderlined ? styles.labelDark : styles.labelLight]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputContainer,
          isUnderlined ? styles.underlinedContainer : styles.outlinedContainer,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isUnderlined ? styles.inputTextDark : styles.inputTextLight,
            style,
          ]}
          placeholderTextColor={isUnderlined ? '#8E8E93' : '#A0A0A0'}
          secureTextEntry={hidePassword}
          {...restProps}
        />

        {/* Ícono de visibilidad para contraseña */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.iconButton}
          >
            <Ionicons
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={isUnderlined ? COLORS.white : '#7A7A7A'}
            />
          </TouchableOpacity>
        )}

        {/* Ícono de edición (lápiz) para variaciones underlined */}
        {showEditIcon && !isPassword && (
          <View style={styles.iconButton}>
            <Ionicons name="pencil-outline" size={18} color="#A0A0A0" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  labelLight: {
    color: '#1E1035', // Texto oscuro para fondo claro
  },
  labelDark: {
    color: COLORS.white, // Texto blanco para fondo oscuro (#25063F)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Variante Outlined (Borde completo sobre fondo blanco)
  outlinedContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 48,
  },
  // Variante Underlined (Solo línea inferior sobre fondo oscuro)
  underlinedContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.primary,
    paddingHorizontal: 0,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  inputTextLight: {
    color: '#000000',
  },
  inputTextDark: {
    color: COLORS.white,
  },
  iconButton: {
    paddingLeft: 8,
  },
});