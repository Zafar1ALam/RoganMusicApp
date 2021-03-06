import React, { useState, useEffect, useRef } from 'react';

import {
    Image, View, ScrollView,
    TouchableOpacity, Alert, SafeAreaView
} from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import Button1 from '../comp/Button1';
import TextInput1 from '../comp/TextInput1';
import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import Svgs from '../utilities/svgs/Svgs';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Appbar } from 'react-native-paper';

import TextInput2 from '../comp/TextInput2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Login1 = ({ navigation }) => {




    const [stateIsValidEmail, setStateIsValidEmail] = useState(true);
    const [stateIsValidPassword, setStateIsValidPassword] = useState(true);

    const [stateData, setStataData] = useState({
        email: '',
        password: '',

    }
    )
    const handleValidEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
        if (reg.test(val)) {
            console.log('true')
            return true;

        }
        else {
            console.log('false')
            return false;
        }
    }


    const login = () => {
        if (!handleValidEmail(stateData.email)) {
            setStateIsValidEmail(false)
        }


        if (stateData.email == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidEmail(false)



        }
        if (stateData.password == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidPassword(false)

        }

        if (stateData.confirmPassword == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidConfirmPassword(false)
        }


        if (stateData.emailAddress != '' && stateData.password != ''

            && handleValidEmail(stateData.email)) {
            navigation.navigate("TabNavigation1")
        }


    }

    return (
        <ScrollView>
            <SafeAreaView style={STYLES.withoutpaddingcontainer}>

                <Appbar.Header style={{
                    backgroundColor: COLORS.black000000,

                    //alignItems: 'center'
                }}>
                    <Appbar.BackAction
                        onPress={() =>
                            navigation.goBack()} />
                    <Appbar.Content title="Login"
                        titleStyle={{
                            alignSelf: 'center',

                        }}
                        style={{


                        }} />


                </Appbar.Header>

                <View style={{
                    flex: 1,
                    // backgroundColor: 'red',
                    marginHorizontal: "5%"
                }}>

                    <View style={{ flex: 0.7 }}>
                        <View style={{ marginTop: '15%' }}>
                            <TextInput2
                                text
                                text1="Email"
                                placeholder="Email"
                                name="email"
                                onChangeText={(text) => {
                                    setStateIsValidEmail(true)
                                    setStataData({
                                        ...stateData, email: text
                                    })
                                }} />
                            {stateIsValidEmail == false ? <Text style={{ color: 'red' }}>Enter Valid Email</Text> : null}
                        </View>

                        <View style={{ marginTop: '5%' }}>
                            <TextInput2
                                text
                                text1="Password"
                                placeholder="********"
                                name="lock"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    setStateIsValidPassword(true)
                                    setStataData({
                                        ...stateData, password: text
                                    })
                                }} />
                            {stateIsValidPassword == false ? <Text style={{ color: 'red' }}>Enter Valid Password</Text> : null}
                        </View>
                        <TouchableRipple
                            style={{ marginTop: '15%', alignSelf: "flex-end" }}
                            onPress={() => {
                                navigation.navigate("PhoneNoVerification1")
                            }}>
                            <Text>Forgot Password</Text>
                        </TouchableRipple>

                    </View>
                    <View style={{ flex: 0.23 }}>
                        <View style={{
                            alignItems: 'center',

                        }}>

                            <Button1 text="LOG IN"
                                onPress={() => { login() }} />
                        </View>
                        <Text style={[STYLES.fontSize18_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular,
                        { marginTop: '7%', alignSelf: 'center' }]}>OR</Text>
                        <View style={{
                            flexDirection: 'row', marginTop: '7%',
                            alignSelf: 'center'
                        }}>
                            <Text style={[STYLES.fontSize16_green0DC1A7_MADE_TOMMY_Regular_PERSONAL_USE_Regular,
                            { marginRight: '5%' }]}>Already hava an account?</Text>
                            <TouchableRipple onPress={() => {
                                navigation.navigate("CreateAccount1")
                            }}>
                                <Text style={STYLES.fontSize18_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Signup</Text>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>


            </SafeAreaView>
            {/* Bottom sheet Genere        */}



        </ScrollView>
    );
};

export default Login1;