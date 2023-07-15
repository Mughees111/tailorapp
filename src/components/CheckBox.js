import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { fonts } from '../common/fonts';
import useColors from '../hooks/useColors';
import { TickIcon } from './Svgs';

const CheckBox = React.memo(({
    name, value, onPress, checkBoxStyle, labelStyle, containerStyle,
    disabled = false
}) => {

    const styles = getStyles(useColors);
    const [checked, setChecked] = useState(value);
    const onToggle = () => {
        setChecked(!checked);
        onPress(name, !checked);
    };

    return (
        <TouchableOpacity
            disabled={disabled}
            style={containerStyle} onPress={onToggle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={[styles.checkBox, checkBoxStyle]}
                >
                    {checked && (
                        <TickIcon width={12} height={10} color={useColors('white')} />
                    )}
                </View>
                <Text style={[styles.label, labelStyle]}>{name}</Text>
            </View>
        </TouchableOpacity >
    );
});

const getStyles = (useColors) => StyleSheet.create({
    checkBox: {
        width: 20, height: 20, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: useColors('button'), marginLeft: 10
    },
    label: {
        fontFamily: fonts.PRe, color: useColors('heading'), fontSize: 14, marginLeft: 10
    }

})

export default CheckBox;