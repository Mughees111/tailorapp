
// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, useColorScheme, StatusBar } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, LOGO } from '../../components/Svgs';
import CustomTextInput from '../../components/CustomTextInput';
import PrivacyPicker from '../../components/PrivacyPicker';
import { MainButton } from '../../components/Buttons';
// import { changeLoggedIn } from '../../../Common';
import { urls } from '../../utils/Api_urls';
import Loader from '../../components/Loader';
import DropdownAlert from 'react-native-dropdownalert';
// import { Entypo } from '@expo/vector-icons';

import { validateEmail, doConsole, storeItem } from '../../utils/functions';
import { apiRequest, doPost } from '../../utils/apiCalls';
import { fonts } from '../../common/fonts';
import { Context } from '../../Context/DataContext';
import useColors from '../../hooks/useColors';
import useLanguage from '../../hooks/useLanguage';


var alertRef;

const SignUp = () => {


    const { setAppTheme, state } = useContext(Context);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cPass, setCPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [shopName, setShopName] = useState('')
    const [phoneCode, setPhoneCode] = useState('');
    const [shopType, setShopType] = useState('');

    const [showPass, setShowPass] = useState(true);
    const [countriesCode, setCountriesCode] = useState([]);

    const colorScheme = useColorScheme()



    useEffect(() => {
        console.log('this is the change i want ', colorScheme);
        setAppTheme(colorScheme)
    }, [useColorScheme()])


    return (
        <View style={{ flex: 1, backgroundColor: useColors('background') }}>
            <StatusBar
                backgroundColor={useColors('statusBar')}
                barStyle={useColorScheme() == 'dark' ? 'light-content' : 'dark-content'}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 60, width: "90%", alignSelf: 'center', }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
                    <View style={{ marginTop: -15 }}>
                        <Text style={{ marginTop: 20, fontFamily: fonts.PBo, fontSize: 22, color: useColors('heading') }}> {useLanguage('createNewAccount')} </Text>
                        <Text style={{ marginTop: 3, fontFamily: fonts.PRe, fontSize: 16, color: useColors('white') }}>{useLanguage('enterDetailsToContinue')}</Text>

                        <CustomTextInput
                            onChangeText={setUsername}
                            placeholder={useLanguage('shopName')}
                            style={{ marginTop: 20 }}
                        />
                        <CustomTextInput
                            onChangeText={setShopName}
                            placeholder={useLanguage('name')}
                            style={{ marginTop: 20 }}
                        />
                        <View style={{
                            width: "100%",
                            height: 42,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: useColors('textInputBorder'),
                            paddingHorizontal: 5,
                            marginTop: 10,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <PrivacyPicker
                                selected={{ title: "Shop type" }}
                                data={[{ title: "Gents" }, { title: "Ladies" }, { title: "Both" }]}
                                onValueChange={(i, v) => {
                                    setShopType(v.title);
                                }}
                            />
                        </View>
                        <CustomTextInput
                            onChangeText={setEmail}
                            placeholder={useLanguage('email')}
                            keyboardType={"email-address"}
                            style={{ marginTop: 20 }}
                        />
                        <CustomTextInput
                            onChangeText={setPhone}
                            keyboardType={"numeric"}
                            placeholder={useLanguage('phoneNumber')}
                            style={{ marginTop: 15, }}
                        />
                        <CustomTextInput
                            onChangeText={setPassword}
                            placeholder={useLanguage('password')}
                            style={{ marginTop: 15, }}
                            secureTextEntry={showPass}

                        />
                        <CustomTextInput
                            placeholder={useLanguage('cPassword')}
                            style={{ marginTop: 15, }}
                            onChangeText={setCPass}
                            secureTextEntry={showPass}
                        />
                        <MainButton
                            text={useLanguage('next')}
                            btnStyle={{ marginTop: 60 }}
                            onPress={() => navigate('BottomTabNavigator')}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: useColors('white'), marginTop: 15, fontFamily: 'PMe' }}>{useLanguage('orContinueWith')}</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity
                                // onPress={() => {
                                //     do_fb()
                                // }}
                                style={{ width: 92, height: 48, borderWidth: 1, borderColor: useColors('white'), borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                                <FbIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => do_gl()}
                                style={{ width: 92, height: 48, borderWidth: 1, borderColor: useColors('white'), borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <GoogleIcon />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {

                                navigate('SignIn')
                            }}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: 16, color: useColors('white'), marginTop: 20, fontFamily: fonts.PMe, textDecorationLine: 'underline' }}>{useLanguage('alreadyHaveAnAccount')}? <Text style={{ color: useColors('primary') }}>{useLanguage('signIn')}</Text></Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </SafeAreaView>



        </View>
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    },

})

export default SignUp



// WWHQTXAvChCHynzTxUPZDKq0qh2VOh9-G_IsnI-A