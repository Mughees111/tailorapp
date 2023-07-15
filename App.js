/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  LogBox,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SignUp from './src/screens/auth/SignUp';
import SignIn from './src/screens/auth/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './Navigations';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeviceInfo from 'react-native-device-info';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { HomeActiveBtmIcon, HomeBtmIcon, HomeInactiveBtmIcon, ProfileActiveBtmIcon, ProfileBtmIcon } from './src/components/Svgs';
import { CustomTabBar } from './src/components/CustomTabBar';

import { en } from "./src/Languages/translation";
import { Provider } from './src/Context/DataContext';
import BottomTabs from './src/screens/auth/BottomTabs';
import MakeOrder from './src/screens/bottom/MakeOrder';
import Page from './RecordAudio';
import Loader from './src/components/Loader';
import { retrieveItem } from './src/utils/functions';
import CustomersList from './src/screens/bottom/CustomersList';
import CustomerDetails from './src/screens/bottom/CustomerDetails';

const Stack = createStackNavigator();


const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
)


LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);


const App = () => {

  // i18n.translations = {
  //   en: en,
  // };


  const [loading, setLoading] = useState(false)
  const [isLogined, setIsLogined] = useState(0); // 0 LOADING, 1 TRUE, 2 FALSE




  async function googleSignIn() {

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      // webClientId: '446411296058-0jpo9gb190fhlk4d6dbjck0lfnb3ppd0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId: '446411296058-2oo8n51orh37c6p3ai5qojc7dqftoalt.apps.googleusercontent.com',
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });

    try {
      setLoading(true)
      await GoogleSignin.hasPlayServices()
      const isSignedIn = await GoogleSignin.isSignedIn()
      console.log(isSignedIn);
      const currentUser = await GoogleSignin.signIn();
      console.log(currentUser)
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }

  }


  function checkLogin() {
    retrieveItem('loginInfo')
      .then(data => {
        if (data) setIsLogined(1)
        else setIsLogined(2)
      })
  }

  React.useEffect(() => {
    checkLogin()
    // googleSignIn();
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS)
    // DeviceInfo.getPhoneNumber().then((phoneNumber) => {
    //   console.log('phoneNumber', phoneNumber)
    //   // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
    // });
  }, [])



  if (isLogined == 0) return <Loader />

  return (
    // <Page />
    <Provider>
      <NavigationContainer
        ref={navigationRef}
      >

        {
          isLogined == 1 ?
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="BottomTabNavigator" component={BottomTabs} />
              <Stack.Screen name="MakeOrder" component={MakeOrder} />
              <Stack.Screen name="CustomersList" component={CustomersList} />
              <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
              <Stack.Screen name="AuthStack" component={AuthStack} />

            </Stack.Navigator>
            :
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="AuthStack" component={AuthStack} />
              <Stack.Screen name="BottomTabNavigator" component={BottomTabs} />
            </Stack.Navigator>

        }



      </NavigationContainer>
    </Provider>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
