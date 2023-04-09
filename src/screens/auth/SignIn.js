// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, LOGO } from '../../components/Svgs';
import useColors from '../../hooks/useColors';
import CustomTextInput from '../../components/CustomTextInput';
// import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../components/Buttons';

import Loader from '../../components/Loader';
import { validateEmail, doConsole, storeItem } from '../../utils/functions';

// import { changeLoggedIn } from '../../../Common';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../../utils/Api_urls';
import { apiRequest } from '../../utils/apiCalls';
import { fonts } from '../../common/fonts';
import { Context } from '../../Context/DataContext';
import useLanguage from '../../hooks/useLanguage';
import { loginApi } from '../../Api/methods';

var alertRef;
const SignIn = () => {


    // const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('mughees.abbas@gmail.com')
    const [password, setPassword] = useState('12345678')

    async function doLogin(language) {
        if (email == '') {
            alertRef.alertWithType('error', 'Error', 'pleaseEnterEmail');
            return;
        }
        if (password == '') {
            alertRef.alertWithType('error', 'Error', 'pleaseEnterPassword');
            return;
        }
        setLoading(true)
        const body = { email, password }
        const response = await loginApi(body);
        console.log('response',response)
        setLoading(false);
        if (response.action == 'failed') {
            alertRef.alertWithType('error', 'Error', response.error);
            return;
        }
        if (response.action == 'success') {
            
            storeItem('loginInfo',response.data);
            navigate('BottomTabNavigator');
        }

    }

    return (
        // return (
        <View style={{ flex: 1, backgroundColor: useColors('background') }}>

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ marginTop: -15 }}>
                        <Text style={{ marginTop: 20, fontFamily: fonts.PSBo, fontSize: 22, color: useColors('primary') }}>{useLanguage('welcomeBack')}</Text>
                        <Text style={{ marginTop: 3, fontFamily: fonts.PRe, fontSize: 16, color: useColors('white') }}>{useLanguage('loginToContinue')}</Text>
                        <CustomTextInput
                            onChangeText={setEmail}
                            placeholder={useLanguage('email')}
                            keyboardType={"email-address"}
                            style={{ marginTop: 20 }}
                        />

                        <CustomTextInput
                            onChangeText={setPassword}
                            placeholder={useLanguage('password')}
                            style={{ marginTop: 15, }}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={() => navigate('ForgetPass')}
                            style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: useColors('white') }}>{useLanguage('forgotPassword')}</Text>
                        </TouchableOpacity>

                        <MainButton
                            text={useLanguage("login")}
                            btnStyle={{ marginTop: 60 }}
                            onPress={() => {
                                doLogin(useLanguage);
                                // doNext();
                                //  navigate('BottomTabs') 
                            }}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: useColors('white'), marginTop: 15, fontFamily: fonts.PMe }}>{useLanguage('orContinueWith')}</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    do_fb()
                                }}
                                style={{ width: 92, height: 48, borderWidth: 1, borderColor: useColors('white'), borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                                <FbIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => do_gl()}
                                style={{ width: 92, height: 48, borderWidth: 1, borderColor: useColors('white'), borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <GoogleIcon />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{ marginTop: 30 }}
                            onPress={() => {

                                // navigate('SignUp')
                            }}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: 16, color: useColors('white'), marginTop: 20, fontFamily: fonts.PMe, textDecorationLine: 'underline' }}>{useLanguage('dontHaveAnAccount')} <Text style={{ color: useColors('primary') }}>{useLanguage('signUp')}</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

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

export default SignIn

