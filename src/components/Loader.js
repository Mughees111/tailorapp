
import React from "react";
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
    StyleSheet,
    Animated,
    Easing,
    ActivityIndicator
} from "react-native";
import useColors from "../hooks/useColors";




const Loader = () => {

    // var spinValue = new Animated.Value(0);

    // Animated.loop(
    //     Animated.timing(
    //         spinValue,
    //         {
    //             toValue: 1,
    //             duration: 3000,
    //             easing: Easing.linear,
    //             useNativeDriver: true
    //         }
    //     )
    // ).start();


    // Next, interpolate beginning and end values (in this case 0 and 1)
    // const spin = spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    // })


    return (
        <View style={{ position: "absolute", width: "100%", top: 0, left: 0, right: 0, bottom: 9, flex: 1, zIndex: 999999999, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator
                size={"large"}
                color={'white'}
            />
            {/* <Animated.Image
                style={{transform: [{rotate: spin}] , width:40,height:40,zIndex:99999999999999999,borderWidth:1,backgroundColor:"white",borderRadius:100}}
                source={require("../images/icon.png")} 
            /> */}
        </View>);

};
export default Loader;
