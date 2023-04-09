import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { fonts } from '../common/fonts';
import useColors from '../hooks/useColors';

const CustomTextInput = ({
    style, onChangeText, placeholder, placeholderTextColor,textAlignVertical,
    secureTextEntry = false, autoFocus = false, keyboardType, keyboardAppearance, multiline = false
}) => {

    const styles = getStyles(useColors);
    return (
        <TextInput
            // {...props}
            autoCapitalize='none'

            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor ? placeholderTextColor : useColors('white')}
            style={[styles.textInput, style]}
            onChangeText={(v) => onChangeText ? onChangeText(v) : null}
            secureTextEntry={secureTextEntry}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            keyboardAppearance={keyboardAppearance ? keyboardAppearance : "default"}
            multiline={multiline}
            textAlignVertical={textAlignVertical}
        />
    )
}

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
