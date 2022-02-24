import React from 'react';

import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MySpace from '../screens/MySpace';
import Chat from '../screens/Chat';
import Account from '../screens/Account';
import { Text } from 'react-native-paper';
import STYLES from '../STYLES';
import { View } from 'react-native';
import COLORS from '../utilities/colors/Color';
import { SvgXml } from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import TabProfile from '../screens/TabProfile';
import CircleUsernameHere from '../screens/CircleUsernameHere';
const Tab = createBottomTabNavigator();
const TabNavigation1 = () => {
    SplashScreen.hide()
    return (
        <View style={{
            flex: 1,// backgroundColor: COLORS.black000000
        }}>

            <Tab.Navigator
                //    initialRouteName='HomeHomeSearch'
                screenOptions={{
                    headerShown: false,
                    // tabBarBackground: COLORS.black000000
                    tabBarStyle: {
                        backgroundColor: COLORS.black171717
                        //backgroundColor: 'red'
                        //     height: 60,
                        //backgroundColor: 'red',
                        //     // paddingVertical: 25
                        //     paddingBottom: 10,
                        //     paddingHorizontal: '3%',
                        //     paddingTop: 10,
                        //     //    borderColor: COLORS.cylindricalFA4248,
                        //     borderTopWidth: 2,
                        //     borderTopColor: COLORS.cylindricalFA4248,
                        //     borderRightWidth: 2,
                        //     borderRightColor: COLORS.cylindricalFA4248,
                        //     borderLeftWidth: 2,
                        //     borderLeftColor: COLORS.cylindricalFA4248,
                        //     marginTop: 20

                    },

                }}>
                <Tab.Screen name="Home" component={Home}
                    options={{
                        tabBarLabel: () => {
                            return (
                                <Text style={STYLES.fontSize12_whiteFFFFFF_Nunito_Bold}>Home</Text>
                            )
                        },
                        tabBarIcon: ({ color, focused }) => {
                            return (

                                <SvgXml xml={Svgs.home} />
                            )
                        }
                    }} />
                <Tab.Screen name="MySpace" component={MySpace}
                    options={{
                        tabBarLabel: () => {
                            return (
                                <Text style={STYLES.fontSize12_whiteFFFFFF_Nunito_Bold}>My Space</Text>
                            )
                        },
                        tabBarIcon: ({ color, focused }) => {
                            return (

                                <SvgXml xml={Svgs.mySpace} />
                            )
                        }
                    }} />

                <Tab.Screen name="Chat" component={Chat}
                    options={{
                        tabBarLabel: () => {
                            return (
                                <Text style={STYLES.fontSize12_whiteFFFFFF_Nunito_Bold}>Chat</Text>
                            )
                        },
                        tabBarIcon: ({ color, focused }) => {
                            return (

                                <SvgXml xml={Svgs.chat} />
                            )
                        }
                    }} />
                <Tab.Screen name="CircleUsernameHere" component={CircleUsernameHere}
                    options={{
                        tabBarLabel: () => {
                            return (
                                <Text style={STYLES.fontSize12_whiteFFFFFF_Nunito_Bold}>Profile</Text>
                            )
                        },
                        tabBarIcon: ({ color, focused }) => {
                            return (

                                <SvgXml xml={Svgs.profile} />
                            )
                        }
                    }} />



            </Tab.Navigator>
        </View>

    );
};

export default TabNavigation1;