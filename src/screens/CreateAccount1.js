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
import SplashScreen from 'react-native-splash-screen';
import TextInput2 from '../comp/TextInput2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const CreateAccount1 = ({ navigation }) => {
    SplashScreen.hide()
    const refRBSheetSelectGenere = useRef();
    const listSelectGenere = [
        {
            id: 1,
            label: "EUPHORIC",
            value: "EUPHORIC",
        },
        {
            id: 2,
            label: "HAPPY",
            value: "HAPPY",
        },
        {
            id: 3,
            label: "NEUTRAL",
            value: "NEUTRAL",
        },
        {
            id: 4,
            label: "SAD",
            value: "SAD",
        },
        {
            id: 5,
            label: "FRUSTRATED",
            value: "FRUSTRATED",
        },
        {
            id: 6,
            label: "ANGRY",
            value: "ANGRY",
        },

    ];

    const [stateSelectGenere, setStateSelectGenere] = useState('')

    const [stateIsValidEmail, setStateIsValidEmail] = useState(true);
    const [stateIsValidPassword, setStateIsValidPassword] = useState(true);
    const [stateIsValidConfirmPassword, setStateIsValidConfirmPassword] = useState(true);
    const [stateIsValidSelectGenere, setStateIsValidSelectGenere] = useState(true);

    const [stateData, setStataData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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

    const passwordCheck = () => {
        if (stateData.password === stateData.confirmPassword) {
            return true;
        }
        else {
            return false;
        }
    }

    const signUp = () => {
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
        if (stateSelectGenere == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidSelectGenere(false)
        }
        if (!passwordCheck()) {
            //Alert.alert("Password and Confirm Password are not same")
        }
        if (stateData.emailAddress != '' && stateData.password != ''
            && stateData.confirmPassword != '' //&& passwordCheck()
            && handleValidEmail(stateData.email)) {
            navigation.navigate("Login1")
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
                    <Appbar.Content title="Create Account"
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
                        <View style={{ marginTop: '5%' }}>
                            <TextInput2
                                text
                                text1="Confirm Password"
                                placeholder="********"
                                name="lock"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    setStateIsValidConfirmPassword(true)
                                    setStataData({
                                        ...stateData, confirmPassword: text
                                    })
                                }} />
                            {stateIsValidConfirmPassword == false ? <Text style={{ color: 'red' }}>Enter Valid Confirm Password</Text> : null}
                        </View>

                        <View style={{ marginTop: '5%' }}>
                            <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Select Genere</Text>
                            <TouchableRipple style={{
                                flexDirection: 'row',
                                //backgroundColor: 'red',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: COLORS.whiteFFFFFF
                            }} onPress={() => refRBSheetSelectGenere.current.open()}>
                                <>
                                    <View style={{
                                        flex: 1,
                                        height: 45,
                                        justifyContent: 'center'

                                    }}>
                                        <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>{stateSelectGenere}</Text>

                                    </View>
                                    <SvgXml xml={Svgs.downArrow} style={{ marginRight: '3%' }} />
                                </>
                            </TouchableRipple>
                            {stateIsValidSelectGenere == false ? <Text style={{ color: 'red' }}>Select Valid Genere</Text> : null}
                        </View>
                    </View>
                    <View style={{ flex: 0.23 }}>
                        <View style={{
                            alignItems: 'center',

                        }}>

                            <Button1 text="SIGNUP"
                                onPress={() => { signUp() }} />
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
                                navigation.navigate("Login1")
                            }}>
                                <Text style={STYLES.fontSize18_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Log In</Text>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>


            </SafeAreaView>
            {/* Bottom sheet Genere        */}

            <RBSheet
                // closeOnDragDown={true}
                closeOnPressMask={false}
                dragFromTopOnly={true}
                height={380}
                animationType="slide"
                ref={refRBSheetSelectGenere}


                // closeOnPressBack={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.84)',
                        //backgroundColor: "transparent"

                    },
                    container: {
                        //justifyContent: "center",
                        //  alignItems: "center"
                        backgroundColor: COLORS.black000000,
                        marginHorizontal: '5%',
                        paddingTop: '5%',
                        borderWidth: 1,
                        width: "95%",
                        alignSelf: "center",
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        borderColor: COLORS.green0DC1A7
                    },
                    // draggableIcon: {
                    //     backgroundColor: "#000"
                    // }
                }}


            >

                <View style={{ flex: 1, paddingHorizontal: '4%' }}>
                    <View style={{
                        flexDirection: 'row', justifyContent:
                            'space-between',
                        marginBottom: '5%'
                    }}>
                        <Text style={STYLES.fontSize20_whiteFFFFFF_MADE_TOMMY_Bold_PERSONAL_USE}>
                            SELECT GENERE</Text>

                        <TouchableRipple
                            onPress={() => refRBSheetSelectGenere.current.close()}

                            style={{


                            }}>
                            <SvgXml xml={Svgs.cross} />
                        </TouchableRipple>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}>
                        <View style={{
                            flex: 1, //backgroundColor: 'green',
                            marginTop: '3%',
                            paddingHorizontal: '2%',
                            justifyContent: 'space-between'
                        }}>
                            {listSelectGenere.map((list, index) => {
                                return (
                                    <View key={index}
                                        style={{
                                            // backgroundColor: COLORS.whiteFFFFFF,
                                            // paddingVertical: '4%',
                                            backgroundColor: COLORS.black000000,
                                            paddingVertical: '4%',

                                            borderBottomWidth: 1,
                                            borderBottomColor: COLORS.whiteFFFFFF
                                            // borderBottomWidth: 1,
                                            // borderBottomColor: COLORS.black000000_20

                                        }}>
                                        <TouchableOpacity style={{
                                            //height: 40,
                                            //flex: 1,
                                            // backgroundColor: 'red',
                                            justifyContent: 'center'
                                        }} onPress={() => {
                                            refRBSheetSelectGenere.current.close()
                                            setStateSelectGenere(list.value)
                                            setStateIsValidSelectGenere(true)
                                            //isValidSetStatesleep(true)
                                        }}>
                                            <Text style={[{
                                                alignSelf: 'center',
                                            }, STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular]}>{list.value}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}

                        </View>
                    </ScrollView>

                </View>


            </RBSheet>

        </ScrollView>
    );
};

export default CreateAccount1;