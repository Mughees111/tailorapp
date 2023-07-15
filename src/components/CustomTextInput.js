import React from 'react'
import { TextInput, StyleSheet, View, Text,TouchableOpacity } from 'react-native'
import { fonts } from '../common/fonts';
import useColors from '../hooks/useColors';

const CustomTextInput = React.forwardRef(({
    style, onChangeText, placeholder, placeholderTextColor, textAlignVertical,
    secureTextEntry = false, autoFocus = false, keyboardType, keyboardAppearance, multiline = false, label, containerStyle, mandatory = false,
    disabled = false, value, editable = true
}, ref) => {

    const styles = getStyles(useColors);
    const inputRef = React.useRef();
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => inputRef.current?.focus()}
            style={[{ marginTop: 10, }, containerStyle]}>
            <View style={{ flexDirection: 'row' }}>
                {mandatory && <Text style={{ color: 'red' }}>*</Text>}
                <Text style={{ fontSize: 12, color: useColors('white') }}>{label ?? placeholder}</Text>

            </View>
            <TextInput
                disabled={disabled}
                ref={inputRef}
                value={value}
                editable={editable}
                // autoCapitalize='none'
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : useColors('placeHolder')}
                style={[styles.textInput, style]}
                onChangeText={(v) => onChangeText ? onChangeText(v) : null}
                secureTextEntry={secureTextEntry}
                autoFocus={autoFocus}
                keyboardType={keyboardType}
                keyboardAppearance={keyboardAppearance ? keyboardAppearance : "default"}
                multiline={multiline}
                textAlignVertical={textAlignVertical}
            />
        </TouchableOpacity>
    )
})

const getStyles = (useColors) => StyleSheet.create({
    textInput: {
        width: "100%",
        height: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: useColors('textInputBorder'),
        color: useColors('white'),
        fontFamily: fonts.PRe,
        fontSize: 14,
        paddingHorizontal: 10,
        marginTop: 10

    }
})

export default CustomTextInput
