// import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { TextInput } from 'react-native-gesture-handler';
// import { changeLoggedIn, loggedInObservable } from '../../../Common';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { fonts } from '../../common/fonts';
import Header from '../../common/Header';
// import { acolors } from '../../Components/AppColors';
// import { MainButton } from '../../Components/Buttons';
// import { Header } from '../../Components/Header';
// import Reviews from '../../Components/Reviews';
import { ArrowLeft, NotifIcon as NotificationIcon, ProfileBtmIcon as ProfileIcon, HeartSettingIcon, SettingsIcon, TermsIcon, LogoutIcon, ArrowForward, ThemeIcon } from '../../components/Svgs';
import { Context } from '../../Context/DataContext';
import useColors from '../../hooks/useColors';
import useLanguage from '../../hooks/useLanguage';
// import { apiRequest, } from '../../utils/apiCalls';
// import { urls } from '../../utils/Api_urls';

// import { doConsole, retrieveItem, storeItem, getParamFromURL } from "../../utils/functions";
// import Loader from '../../utils/Loader';


var alertRef;

const Profile = () => {


    const { state, setAppTheme } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [themeSwitch, setThemeSwitch] = useState(state.theme == 'light' ? false : true);

    const userData = state.userData;

    const styles = getStyles(useColors);


    useEffect(() => {
        setThemeSwitch(state.theme == 'light' ? false : true)
    }, [state.theme])

    const SettingView = ({ text, onPress, icon, navigateTo, switchBtn = false }) => {
        var Icon = icon
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateTo && navigate(navigateTo)
                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }
                }>
                <View style={styles.iconCircle}>
                    {Icon ? <Icon color={useColors("profileTabsIcons")} /> : null}
                </View>
                <Text style={styles.text}>{text}</Text>
                {
                    !switchBtn ?
                        <TouchableOpacity style={{ position: 'absolute', right: 5, }}>
                            <ArrowForward color={useColors('profileTabsIcons')} />
                        </TouchableOpacity>
                        :
                        <Switch
                            style={{ position: 'absolute', right: 5, margin: 0 }}
                            trackColor={{ false: useColors('switchTrackOf'), true: useColors('switchTrackOf') }}
                            thumbColor={themeSwitch ? useColors('switchThumbOn') : useColors('switchThumbOf')}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setAppTheme(themeSwitch ? 'light' : 'dark')
                                // setThemeSwitch(themeSwitch == 1 ? 0 : 1)
                            }}
                            value={themeSwitch == 1 ? true : false}

                        />

                }
            </TouchableOpacity >
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: useColors('background') }}>
            {/* <StatusBar
                style='light'
                backgroundColor={useColors('')}
                translucent={false}
            /> */}
            <Header showTitle={false} title={'addCustomer'} headerStyle={{ paddingLeft: 10 }} />

            <View style={{ width: "100%", height: 200, marginTop: 10 }}>

                <Image
                    style={{ width: 120, height: 120, marginTop: 0, borderRadius: 120 / 2, alignSelf: 'center', borderWidth: 5, borderColor: useColors('primary') }}
                    // source={{ uri: userData.profile_pic_url }
                    source={require('../../images/profileImgS.png')}
                />
                {/* <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ position: 'absolute', top: 10, left: 20, width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft />
                </TouchableOpacity> */}
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.PBo, fontSize: 22, color: 'white', }}>Mughees{userData?.username}</Text>
                    <Text style={{ fontFamily: fonts.PRe, fontSize: 14, color: '#E9E9E9', }}>03221401833{userData?.phone}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={[styles.containers, { marginTop: 20 }]}>
                    {/* <SettingView
                        text="Payment Methods"
                        icon={PaymentMethodIcon}
                        onPress={() => console.log('presed')}
                        navigateTo="EditPaymentMethod"
                    /> */}
                    <SettingView
                        text="Profile"
                        icon={ProfileIcon}
                        navigateTo={"EditProfile"}
                    />
                </View>
                <View style={styles.containers}>
                    <SettingView
                        text="Notification Settings"
                        icon={NotificationIcon}
                        navigateTo={"NotificationSettings"}

                    />
                    <SettingView
                        text="Favorites"
                        icon={HeartSettingIcon}
                        navigateTo={'Favourites'}
                        onPress={() => console.log('presed')}
                    />
                    <SettingView
                        text="Settings"
                        icon={SettingsIcon}
                        navigateTo={"Settings"}
                    />
                    <SettingView
                        icon={TermsIcon}
                        navigateTo={"TermsOfServices"}
                        text="Terms of services"
                        onPress={() => console.log('presed')}
                    />
                    <SettingView
                        icon={ThemeIcon}
                        navigateTo={"TermsOfServices"}
                        text="Dark theme"
                        onPress={() => console.log('presed')}
                        switchBtn
                    />
                </View>
                <View style={styles.containers}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }
                        }>
                        <View style={styles.iconCircle}>
                            <LogoutIcon />
                        </View>
                        <Text style={styles.text}>Log Out</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 5, }}>
                            <ArrowForward color="rgba(226, 179, 120, 0.05)" />
                        </TouchableOpacity>
                    </TouchableOpacity >
                </View>
            </ScrollView>
            {/* {loading && <Loader />} */}
            <DropdownAlert ref={(ref) => alertRef = ref} />
        </SafeAreaView>
    )
}

const getStyles = (useColors) => StyleSheet.create({
    iconCircle: {
        width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 34 / 2,
        backgroundColor: 'rgba(226, 179, 120, 0.09)',

    },
    text: {
        fontFamily: fonts.PMe,
        fontSize: 14,
        color: useColors('profileTabsIcons'),
        marginLeft: 10
    },
    containers: {
        marginTop: 20, width: "90%", alignSelf: 'center', backgroundColor: useColors('profileTabs'),
        paddingBottom: 15, paddingHorizontal: 10, borderRadius: 6
    }
})

export default Profile
