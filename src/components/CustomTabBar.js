import React, { useEffect, useState } from 'react';
import {
    Animated, Dimensions, ImageSourcePropType, InteractionManager, StyleSheet, TouchableOpacity, View, Text, Image, Keyboard
} from 'react-native';

import useColors from '../hooks/useColors'
import { PlusIcon } from "./Svgs";
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';
const halfPartBtnAdd = 32;
const ImgBG = require('./Subtract.png')
const ImgLeftRight = require('./bg_tabbar3x.png');



const BgTabBarIcon = function BgTabBar(props) {
    return (
        <>
            <Image
                tintColor={useColors('bottomBar')}
                style={{ width: Dimensions.get('screen').width, resizeMode: 'stretch', backgroundColor: useColors('bottomBar') }} {...props} />
            {/* <Image style={{position: 'absolute', zIndex: -1,resizeMode:'stretch'}} width="100%" height={56} {...props} /> */}
        </>
    );
};



export const TabBarIcon = function TabBarIcon({ icon, isFocused }) {
    return <Image
        tintColor={useColors('bottomBar')}
        style={{ width: 24, height: 24, backgroundColor: useColors('bottomBar') }}
        source={icon}
        isFocused={isFocused} />;
};


export const CustomTabBar = function CustomTabBar({ state, descriptors, navigation }) {


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const styles = getStyles(useColors);
    const route = useRoute()


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    if (isKeyboardVisible) return null;
    if (getFocusedRouteNameFromRoute(route) == 'AddCustomer') return null;
    return (
        <View>
            <View style={styles.containerAbsolute}>
                <View style={styles.bgAbsolute}>
                    <View>
                        <Image
                            style={{ height: 64, width: 60 }}
                            source={ImgLeftRight} />
                    </View>
                    <View>
                        <BgTabBarIcon
                            source={ImgBG} />
                    </View>
                    <View>
                        <Image
                            style={{ height: 64, width: 60 }}
                            source={ImgLeftRight} />
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            InteractionManager.runAfterInteractions(() => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            });
                        };

                        if (index === 2) {
                            return (
                                <View
                                    style={styles.viewIconAdd}
                                    key={'tab-' + index.toString()}>
                                    <View>

                                        <TouchableOpacity
                                            style={{ width: 60, height: 60, }}
                                            activeOpacity={0.9}
                                            onPress={onPress}>
                                            <View style={styles.buttonAdd}>
                                                <PlusIcon color={useColors('bottomBar')} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }

                        return (
                            <TouchableOpacity
                                key={'tab-' + index.toString()}
                                accessibilityRole="button"
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={styles.bottomBarIcon}>
                                {options &&
                                    options.tabBarIcon &&
                                    options.tabBarIcon({ focused: isFocused, color: '', size: 0 })}
                                <Text numberOfLines={1} focused={isFocused}>
                                    {label || ''}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    )
}


const getStyles = (useColors) => StyleSheet.create({
    containerAbsolute: {
        position: 'absolute',
        // borderTopWidth: 0.5,
        borderColor: 'white',
        bottom: -1,
        left: 0,
        right: 0,
        overflow: 'hidden',
        height: halfPartBtnAdd + 56, // getBottomSpace()
    },
    bgAbsolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        marginTop: halfPartBtnAdd,
        height: 56,
        paddingBottom: 0, //getBottomSpace(),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        paddingTop: halfPartBtnAdd,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewIconAdd: {
        flex: 1,
        height: 72,
        marginBottom: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBarIcon: {
        marginTop: 6,
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: useColors('plusBtmIcon')
    },
    plusHorizontal: {
        position: 'absolute',
        zIndex: 1,
        width: 3,
        height: 20,
        borderRadius: 2,
    },
    plusVertical: {
        position: 'absolute',
        zIndex: 1,
        width: 20,
        height: 3,
        borderRadius: 2,
    },
});
