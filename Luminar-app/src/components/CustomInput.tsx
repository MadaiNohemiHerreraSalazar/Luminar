import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../core/theme/colors';

export type InputVariant = 'outlined' | 'underlined';

interface CustomInputProps extends TextInputProps {
  label: string;
  variant?: InputVariant;
  isPassword?: boolean;
  showEditIcon?: boolean;
  labelStyle?: StyleProp<TextStyle>;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  variant = 'outlined',
  isPassword = false,
  showEditIcon = false,
  style,
  labelStyle,
  ...restProps
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  const isUnderlined = variant === 'underlined';

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          isUnderlined ? styles.labelDark : styles.labelLight,
          labelStyle,
        ]}
      >
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
    fontFamily: 'Baloo2_700Bold',
    fontSize: 14,
    marginBottom: 6,
  },
  labelLight: {
    color: '#1E1035',
  },
  labelDark: {
    color: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlinedContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 48,
  },
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