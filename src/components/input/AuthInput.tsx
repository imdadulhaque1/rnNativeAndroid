import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  TextInputProps,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@utils/COLORS';
import MCIcon from '../icon/MCIcon';

// Define the props for AuthInput
interface AuthInputProps {
  inputOnTouchStart?: () => void;
  onPressOut?: () => void;
  inputKeyboardType?: TextInputProps['keyboardType'];
  secureText?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  inputFontSize?: number;
  inputTextColor?: string;
  isRequired?: boolean;
  requiredTextColor?: string;
  requiredTextSize?: number;
  inputLabel?: string;
  inputContainerVerticallyMargin?: number;
  iconShown?: boolean;
  secureIconColor?: string;
  secureIconSize?: number;
  labelFontSize?: number;
  labelFontColor?: string;
  inputBorderColor?: string;
  invalidStatus?: boolean;
  invalidText?: string;
  labelFontFamily?: string;
  editableStatus?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  inputOnTouchStart,
  onPressOut,
  inputKeyboardType = 'default',
  secureText = false,
  placeholder = '',
  placeholderTextColor = COLORS.white50,
  onChangeText,
  value,
  inputFontSize = 14,
  inputTextColor = COLORS.black,
  isRequired = false,
  requiredTextColor = COLORS.red,
  requiredTextSize = 12,
  inputLabel = '',
  inputContainerVerticallyMargin = 5,
  iconShown = false,
  secureIconColor = COLORS.black,
  secureIconSize = 20,
  labelFontSize = 16,
  labelFontColor = COLORS.black,
  inputBorderColor = COLORS.black,
  invalidStatus = false,
  invalidText = '',
  labelFontFamily = 'WorkSans-SemiBold',
  editableStatus = true,
}) => {
  const [secureTextStatus, setSecureTextStatus] = useState(secureText);

  return (
    <View
      style={[
        styles.inputContainer,
        {
          marginVertical: inputContainerVerticallyMargin,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            color: labelFontColor,
            fontSize: labelFontSize,
            fontFamily: labelFontFamily,
          }}>
          {inputLabel}
        </Text>
        {isRequired && (
          <Text
            style={[
              styles.requiredStyle,
              {color: requiredTextColor, fontSize: requiredTextSize},
            ]}>
            *
          </Text>
        )}
      </View>
      <View
        style={[styles.inputInnerContainer, {borderColor: inputBorderColor}]}>
        <TextInput
          editable={editableStatus}
          onBlur={onPressOut}
          onTouchStart={inputOnTouchStart}
          keyboardType={inputKeyboardType}
          secureTextEntry={secureTextStatus}
          style={[
            styles.inputStyle,
            {
              fontSize: inputFontSize,
              color: inputTextColor,
              width: !iconShown ? '100%' : width > 550 ? '94%' : '91%',
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
        />
        {iconShown && (
          <Pressable
            onPress={() => {
              setSecureTextStatus(!secureTextStatus);
            }}>
            <MCIcon
              name={!secureTextStatus ? 'eye' : 'eye-off'}
              size={secureIconSize}
              color={secureIconColor}
            />
          </Pressable>
        )}
      </View>
      {invalidStatus && (
        <View>
          <Text style={{color: COLORS.red, fontFamily: 'WorkSans-Regular'}}>
            {invalidText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AuthInput;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor: 'gray',
    // marginVertical: 5,
  },
  requiredStyle: {
    marginLeft: 3,
  },
  inputInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    height: width > 650 ? width / 13 : width / 9,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 7,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  inputStyle: {
    fontFamily: 'WorkSans-Regular',
  },
});
