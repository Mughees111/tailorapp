import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '../../components/CustomTabBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { HomeBtmIcon, ProfileBtmIcon } from '../../components/Svgs';
import useColors from '../../hooks/useColors';
import AddCustomer from '../bottom/AddCustomer';
import Home from '../bottom/Home';
import Profile from '../bottom/Profile';

const BottomTabs = () => {


    const BottomTabs = createBottomTabNavigator();
    console.log(useColors('bottomBar'));


    const activeIconColor = useColors('bottomActiveIcons');
    const inActivaIconeColor = useColors('bottomInActiveIcons');

    return (
        <BottomTabs.Navigator
            tabBarInactiveTintColor="#ffffff"
            activeTintColor="#000000"
            inactiveColor="#fff"
            activeColor="#000"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: "#ffffff",
                activeTintColor: "#000000",
                inactiveColor: "#fff",

                // activeColor="#000"
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <BottomTabs.Screen
                name="Home" component={Home}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color, focused }) =>
                        <HomeBtmIcon
                            color={focused ? activeIconColor : inActivaIconeColor}
                            style={{ marginTop: 10 }} />
                }}
            />
            <BottomTabs.Screen
                name="Home1" component={SignUp}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <HomeBtmIcon
                            color={focused ? activeIconColor : inActivaIconeColor}
                            style={{ marginTop: 10 }} />

                }}
            />
            <BottomTabs.Screen
                name="AddCustomer" component={AddCustomer}
                options={{
                    tabBarStyle: { display: 'none' },
                    // tabBarStyle: { display: "none" },
                    tabBarLabel: false
                }}
            />
            <BottomTabs.Screen
                name="Home5" component={SignUp}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color, size, focused }) =>
                        <HomeBtmIcon
                            color={focused ? activeIconColor : inActivaIconeColor}
                        />
                }}
            />
            <BottomTabs.Screen
                name="Profile" component={Profile}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <ProfileBtmIcon color={focused ? activeIconColor : inActivaIconeColor} />
                    )
                }}
            />

        </BottomTabs.Navigator>
    )
}

export default BottomTabs
