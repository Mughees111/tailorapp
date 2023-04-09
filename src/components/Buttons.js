import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import useColors from '../hooks/useColors';
import { fonts } from '../common/fonts';

export const MainButton = ({ btnStyle, text, textStyle, onPress, children }) => {

    const styles = getStyles(useColors);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.mainBtn, btnStyle]}>
            <Text style={[styles.textStyle, textStyle]}>{text}</Text>
            {children}
        </TouchableOpacity>
    )
}

const getStyles = (useColors) => StyleSheet.create({
    mainBtn: {
        width: "100%",
        height: 45,
        backgroundColor: useColors('button'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 23
    },
    textStyle: {
        color: useColors('btnText'),
        fontFamily: fonts.PMe,
        fontSize: 16
    }
})


