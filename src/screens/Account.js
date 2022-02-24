
import React, { useState, useEffect, useRef } from 'react';

import {
    Image, View, ScrollView, StyleSheet,
    TouchableOpacity, Alert, SafeAreaView, FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
    TouchableRipple, Text, Appbar, TextInput,
    Modal, Snackbar
} from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import SplashScreen from 'react-native-splash-screen';

import RBSheet from 'react-native-raw-bottom-sheet';

import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import Svgs from '../utilities/svgs/Svgs';

import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Button1 from '../comp/Button1';
const Account = ({ navigation }) => {
    SplashScreen.hide()

    const refRBSheetGender = useRef()
    const refRBSheetChangePassword = useRef()
    const refRBSheetCamera = useRef();

    const listSelectGender = [
        {
            id: 1,
            label: "Male",
            value: "Male",
        },
        {
            id: 1,
            label: "Female",
            value: "Female",
        },


    ];

    const [stateListSelectMusic, setStateListSelectMusic] = useState([
        {
            id: 1,
            name: "Rebel Rebel - David Bowie",
            checked: false
        },
        {
            id: 2,
            name: "Rebel Rebel - David Bowie",
            checked: false
        },
        {
            id: 3,
            name: "Rebel Rebel - David Bowie",

            checked: false
        },
        {
            id: 4,
            name: "Rebel Rebel - David Bowie",

            checked: false
        },
        {
            id: 5,
            name: "Rebel Rebel - David Bowie",

            checked: false
        }

    ]);



    const [stateImage, setStateImage] = useState("");
    const [stateIsValidImage, setStateIsValidImage] = useState(true);
    const [stateIsValidFirstName, setStateIsValidFirstName] = useState(true);
    const [stateIsValidLastName, setStateIsValidLastName] = useState(true);
    const [stateIsValidDob, setStateIsValidDob] = useState(true);
    const [stateIsValidGender, setStateIsValidGender] = useState(true);

    const [stateIsValidEmail, setStateIsValidEmail] = useState(true);
    const [stateIsValidCountryName, setStateIsValidCountryName] = useState(true);

    const [stateIsValidOldPassword, setStateIsValidOldPassword] = useState(true);

    const [stateIsValidNewPassword, setStateIsValidNewPassword] = useState(true);
    const [stateIsValidConfirmPassword, setStateIsValidConfirmPassword] = useState(true);

    const [stateDummy, setStateDummy] = useState(false)

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const [stateDataBaseDate, setStateDataBaseDate] = useState()
    const [stateData, setStateData] = useState({

        firstName: '',
        lastName: '',
        gender: 'Male',
        dob: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''

    }
    )

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        // var date = new Date(selectedDate);
        // var b = date.setDate(date.getDate() + 1);
        //d = selectedDate
        //console.log(currentDate)
        // console.log(selectedDate)

        let date = new Date();
        date = selectedDate
        // console.log(date)
        if (date != undefined) {
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let day = date.getDate().toString().padStart(2, "0");

            let q = year + '-' + month + '-' + day
            console.log(typeof (year + '-' + month + '-' + day))

            setStateData({
                ...stateData,
                dob: day + "." + month + "." + year
            })




        }
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    const imageTakeFromCamera = () => {
        refRBSheetCamera.current.close()
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setStateImage(image.path)
            console.log(image.path);
            console.log(image);


        });
    }

    const imageTakeFromGallery = () => {
        refRBSheetCamera.current.close()
        console.log('gg')
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.path);
            setStateImage(image.path)
        });
    }



    const passwordCheck = () => {
        if (stateData.newPassword === stateData.confirmPassword) {
            console.log('true')
            return true;
        }
        else {
            console.log('false')
            return false;
        }
    }

    const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);

    const onToggleSnackBar = () => {
        setVisibleSnackbar(true)
        console.log('eeeeeeeee')
    };

    const onDismissSnackBar = () => setVisibleSnackbar(false);

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

    const update = () => {
        if (stateData.oldPassword == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidOldPassword(false)

        }

        if (stateData.newPassword == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidNewPassword(false)
        }

        if (stateData.confirmPassword == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidConfirmPassword(false)
        }
        if (!passwordCheck()) {
            //Alert.alert("Password and Confirm Password are not same")
            //  onToggleSnackBar
        }
        if (stateData.oldPassword != '' &&
            stateData.newPassword != '' && stateData.confirmPassword != '') {

            refRBSheetChangePassword.current.close()
        }
    }

    const updateAccount = () => {




        if (stateImage == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidImage(false)

        }

        if (stateData.firstName == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidFirstName(false)
        }
        if (stateData.lastName == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidLastName(false)
        }
        if (!handleValidEmail(stateData.email)) {
            setStateIsValidEmail(false)
        }


        if (stateData.email == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidEmail(false)



        }
        if (stateData.dob == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidDob(false)



        }

        if (stateData.email != '' && stateImage != '' && stateData.dob != ""
            && stateData.firstName != '' && stateData.lastName != '' //&& passwordCheck()
            && handleValidEmail(stateData.email)) {
            navigation.navigate("Login1")
        }


    }




    const [countryCode, setCountryCode] = useState()
    const [country, setCountry] = useState('Pakistan')
    const [withCountryNameButton, setWithCountryNameButton] =
        useState(
            true
        )
    const [withFlagButton, setWithFlagButton] = useState(true)
    const [withCallingCodeButton, setWithCallingCodeButton] = useState(
        true
    )
    const [withFlag, setWithFlag] = useState(true)
    // const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const [withModal, setWithModal] = useState(true)
    ////
    const [visible, setVisible] = useState(false)
    const [dark, setDark] = useState(true)
    const [fontScaling, setFontScaling] = useState(true)
    const [disableNativeModal, setDisableNativeModal] = useState(false)
    const onSelect = (country) => {
        // setCountryCode(country.cca2)
        // console.log(country.cca2)
        console.log(country)
        // setCountryCode(country.callingCode)
        //   funcCountryNameSelect(country.name)
        // setCountry(country.name)
    }
    const switchVisible = () => setVisible(!visible)
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.black000000
            }}>
            <ScrollView>
                <Appbar.Header style={{
                    backgroundColor: COLORS.black000000,

                    //alignItems: 'center'
                }}>
                    <Appbar.BackAction
                        onPress={() =>
                            navigation.goBack()} />
                    <Appbar.Content title="ACCOUNT"
                        titleStyle={[{
                            alignSelf: 'center',

                        }, STYLES.fontSize36_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular]}
                        style={{
                        }} />
                    <AntDesign name='setting' size={25}
                        style={{ marginRight: '5%' }}
                        color={COLORS.green0DC1A7}
                        onPress={() => navigation.navigate("Settings")} />


                </Appbar.Header>





                <View style={{
                    marginTop: "10%",
                    alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'row',
                    // backgroundColor: 'red'
                }}>
                    <TouchableRipple style={{
                        //alignItems: 'center',
                        //justifyContent: 'center',
                        //  backgroundColor: 'green'
                    }} onPress={() => refRBSheetCamera.current.open()}
                    >
                        <>
                            {stateImage == "" ?
                                <Image source={require('../utilities/images/greyCircle.png')}
                                    style={{
                                        // backgroundColor: 'red',
                                        height: 140, width: 140,
                                        borderRadius: 100
                                    }} />
                                :
                                <Image source={{ uri: stateImage }} style={{
                                    height: 140, width: 140,
                                    borderRadius: 100,
                                    //backgroundColor: 'green',
                                }} />}


                            <SvgXml xml={Svgs.accountHumanLogo}
                                style={{ position: "absolute", top: "25%", left: '20%' }} />
                            <SvgXml xml={Svgs.backgroundWhitePlusBlack} style={{
                                position: "absolute", right: "5%", top: '5%'

                            }} />
                        </>

                    </TouchableRipple>


                </View>

                <View style={{ marginTop: '5%', marginHorizontal: '5%' }}>
                    <Text style={STYLES.fontSize20_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Contact</Text>
                </View>

                <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>First Name</Text>
                    <TextInput style={{ height: 40 }}
                        selectionColor={COLORS.whiteFFFFFF}
                        activeUnderlineColor={COLORS.whiteFFFFFF}
                        onChangeText={(text) => {
                            setStateIsValidFirstName(true)
                            setStateData({
                                ...stateData, firstName: text
                            })
                        }} />
                    {stateIsValidFirstName == false ? <Text style={{ color: 'red' }}>Enter Valid FirstName</Text> : null}
                </View>

                <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Last Name</Text>
                    <TextInput style={{ height: 40 }}
                        selectionColor={COLORS.whiteFFFFFF}
                        activeUnderlineColor={COLORS.whiteFFFFFF}
                        onChangeText={(text) => {
                            setStateIsValidLastName(true)
                            setStateData({
                                ...stateData, lastName: text
                            })
                        }} />
                    {stateIsValidLastName == false ? <Text style={{ color: 'red' }}>Enter Valid LastName</Text> : null}
                </View>


                <View style={{ marginTop: '5%', marginHorizontal: '5%', }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Gender</Text>
                    <TouchableRipple style={{
                        flexDirection: 'row',
                        //backgroundColor: 'red',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.whiteFFFFFF
                    }} onPress={() => refRBSheetGender.current.open()}
                    >
                        <>
                            <View style={{
                                flex: 1,
                                height: 40,
                                justifyContent: 'center'

                            }}>
                                <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>
                                    {stateData.gender}</Text>


                            </View>
                            <SvgXml xml={Svgs.downArrow} style={{ marginRight: '3%' }} />

                        </>
                    </TouchableRipple>
                    {stateIsValidGender == false ? <Text style={{ color: 'red' }}>Select Valid Type</Text> : null}
                </View>


                <View style={{ marginTop: '5%', marginHorizontal: '5%', }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Date of Birth</Text>
                    <TouchableRipple style={{
                        flexDirection: 'row',
                        //backgroundColor: 'red',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.whiteFFFFFF
                    }} onPress={showDatepicker}
                    >
                        <>
                            <View style={{
                                flex: 1,
                                height: 40,
                                justifyContent: 'center'

                            }}>
                                <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>
                                    {stateData.dob}</Text>


                            </View>
                            <SvgXml xml={Svgs.downArrow} style={{ marginRight: '3%' }} />

                        </>
                    </TouchableRipple>
                    {stateIsValidDob == false ? <Text style={{ color: 'red' }}>Select Valid Date</Text> : null}
                </View>

                <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Email</Text>
                    <TextInput style={{ height: 40 }}
                        selectionColor={COLORS.whiteFFFFFF}
                        activeUnderlineColor={COLORS.whiteFFFFFF}
                        onChangeText={(text) => {
                            setStateIsValidEmail(true)
                            setStateData({
                                ...stateData, email: text
                            })
                        }} />
                    {stateIsValidEmail == false ? <Text style={{ color: 'red' }}>Enter Valid Email</Text> : null}
                </View>

                <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Country</Text>

                    <TouchableRipple style={{
                        flexDirection: 'row',
                        //backgroundColor: 'red',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.whiteFFFFFF
                    }}// onPress={() => onSelect()}
                    >
                        <>
                            <View style={{
                                flex: 1,
                                height: 40,
                                justifyContent: 'center'

                            }}>

                                <CountryPicker theme={DARK_THEME}

                                    //  containerButtonStyle={STYLES1.viewcountrynamepicker}
                                    {...{
                                        countryCode,
                                        //country,
                                        withEmoji: true,
                                        withFilter,
                                        withFlag,
                                        withFlagButton,
                                        withCallingCodeButton,
                                        withCountryNameButton,
                                        withAlphaFilter,
                                        withCallingCode,
                                        withModal,
                                        withFlagButton,
                                        onSelect,
                                        modalProps: {
                                            visible,
                                        },
                                        dark,
                                        // visible: true,
                                        onClose: () => setVisible(false),
                                        onOpen: () => setVisible(true),
                                    }}
                                />
                                {/* <Text
                                    onPress={() => setVisible(true)}
                                    style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>
                                    {country}</Text> */}


                            </View>
                            <SvgXml xml={Svgs.downArrow} style={{ marginRight: '3%' }} />

                        </>
                    </TouchableRipple>



                    {stateIsValidCountryName == false ? <Text style={{ color: 'red' }}>Enter Valid Country Name</Text> : null}
                </View>

                <View style={{ marginTop: '5%', marginHorizontal: '5%' }}>
                    <Text style={STYLES.fontSize20_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Account</Text>
                </View>

                <TouchableRipple style={{
                    marginTop: '5%', marginHorizontal: '5%',
                    marginBottom: "10%"
                }} onPress={() => {
                    //onToggleSnackBar()
                    refRBSheetChangePassword.current.open()
                }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Change password</Text>
                </TouchableRipple>

                <View style={{
                    alignItems: 'center',
                    marginBottom: "10%"
                }}>

                    <Button1 text="UPDATE"
                        onPress={() => { updateAccount() }} />
                </View>



                {/* Bottom sheet Type */}
                <RBSheet
                    // closeOnDragDown={true}
                    closeOnPressMask={false}
                    dragFromTopOnly={true}
                    height={190}
                    animationType="slide"
                    ref={refRBSheetGender}


                    // closeOnPressBack={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,0.84)',
                            //backgroundColor: "transparent"

                        },
                        container: {
                            //borderRadius: 40,
                            backgroundColor: COLORS.black000000,
                            paddingVertical: "5%",
                            backgroundColor: COLORS.black000000,
                            marginHorizontal: '5%',
                            borderWidth: 1,
                            width: "95%",
                            alignSelf: "center",
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            borderColor: COLORS.green0DC1A7
                        },

                    }}


                >

                    <View style={{ flex: 1, paddingHorizontal: '4%' }}>
                        <View style={{
                            flexDirection: 'row', justifyContent:
                                'space-between',
                            marginBottom: '5%'
                        }}>
                            <Text style={STYLES.fontSize20_whiteFFFFFF_MADE_TOMMY_Bold_PERSONAL_USE}>
                                SELECT GENDER</Text>

                            <TouchableRipple
                                onPress={() => refRBSheetGender.current.close()}

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
                                {listSelectGender.map((list, index) => {
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
                                                refRBSheetSelectType.current.close()
                                                setStateData(list.value)
                                                setStateIsValidSelectType(true)
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



                {/* Bottom sheet My change Password */}
                <RBSheet
                    closeOnPressMask={false}
                    //  closeOnDragDown={false}
                    //  closeOnDragDown={true}
                    dragFromTopOnly={true}
                    closeOnPressBack={false}
                    height={370}
                    animationType="slide"
                    ref={refRBSheetChangePassword}
                    closeOnDragDown={true}
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
                            borderWidth: 1,
                            width: "95%",
                            alignSelf: "center",
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            borderColor: COLORS.green0DC1A7,
                            zIndex: 1
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}


                >
                    <View style={{ flex: 1, paddingHorizontal: '4%' }}>
                        <View style={{
                            flexDirection: 'row', justifyContent:
                                'space-between',
                            marginBottom: '5%'
                        }}>
                            <Text style={STYLES.fontSize21_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>
                                UPDATE PASSWORD</Text>

                            <TouchableRipple
                                onPress={() => refRBSheetChangePassword.current.close()}

                                style={{


                                }}>
                                <SvgXml xml={Svgs.cross} />
                            </TouchableRipple>
                        </View>
                        <ScrollView>
                            <View style={{ marginTop: '5%' }}>
                                <Text style={STYLES.fontSize12_grey99999F_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Old Password</Text>
                                <TextInput style={{ height: 35 }}
                                    selectionColor={COLORS.whiteFFFFFF}
                                    secureTextEntry={true}
                                    value={stateData.oldPassword}
                                    activeUnderlineColor={COLORS.whiteFFFFFF}
                                    onChangeText={(text) => {
                                        setStateIsValidOldPassword(true)
                                        setStateData({
                                            ...stateData, oldPassword: text
                                        })
                                    }} />
                                {stateIsValidOldPassword == false ? <Text style={{ color: 'red' }}>Enter Valid OldPassword</Text> : null}
                            </View>

                            <View style={{ marginTop: '5%' }}>
                                <Text style={STYLES.fontSize12_grey99999F_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>New Password</Text>
                                <TextInput style={{ height: 35 }}
                                    value={stateData.newPassword}
                                    selectionColor={COLORS.whiteFFFFFF}
                                    secureTextEntry={true}
                                    activeUnderlineColor={COLORS.whiteFFFFFF}
                                    onChangeText={(text) => {
                                        setStateIsValidNewPassword(true)
                                        setStateData({
                                            ...stateData, newPassword: text
                                        })
                                    }} />
                                {stateIsValidNewPassword == false ? <Text style={{ color: 'red' }}>Enter Valid New Password</Text> : null}
                            </View>
                            <View style={{ marginTop: '5%' }}>
                                <Text style={STYLES.fontSize12_grey99999F_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Confirm New Password</Text>
                                <TextInput style={{ height: 35 }}
                                    value={stateData.confirmPassword}
                                    selectionColor={COLORS.whiteFFFFFF}
                                    secureTextEntry={true}
                                    activeUnderlineColor={COLORS.whiteFFFFFF}
                                    onChangeText={(text) => {
                                        setStateIsValidConfirmPassword(true)
                                        setStateData({
                                            ...stateData, confirmPassword: text
                                        })
                                    }} />
                                {stateIsValidConfirmPassword == false ? <Text style={{ color: 'red' }}>Enter Valid Confirm Password</Text> : null}
                            </View>

                            <View style={{
                                marginHorizontal: '5%', marginTop: '15%',
                                marginBottom: '5%', //backgroundColor: 'red',


                            }}>
                                <Button1 text="UPDATE"
                                    onPress={() => { update() }}
                                />
                            </View>
                        </ScrollView>

                    </View>
                </RBSheet>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}



                {/* snack new password confirm password        */}
                <View style={styles.container}>
                    <Snackbar style={{ backgroundColor: 'red' }}
                        visible={visibleSnackbar}
                        onDismiss={onDismissSnackBar}
                    >
                        New Password and Confirm Password are not same
                    </Snackbar>
                </View>


                {/* Bottom sheet camera        */}
                <RBSheet
                    closeOnPressMask={false}
                    //  closeOnDragDown={false}
                    height={220}
                    animationType="slide"
                    ref={refRBSheetCamera}
                    dragFromTopOnly={true}
                    //  closeOnDragDown={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,0.84)',
                            //backgroundColor: "transparent"

                        },
                        container: {
                            //borderRadius: 40,
                            backgroundColor: COLORS.black000000,
                            paddingVertical: "5%",
                            backgroundColor: COLORS.black000000,
                            marginHorizontal: '5%',
                            borderWidth: 1,
                            width: "95%",
                            alignSelf: "center",
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                            borderColor: COLORS.green0DC1A7
                        },

                    }}


                >
                    <View style={{
                        justifyContent: 'space-evenly', flex: 1,
                        paddingHorizontal: '5%'
                    }}>
                        {/* <Text style={STYLES.fontSize19_grey1C1939_Arial_400}>Add Photo! </Text> */}
                        <TouchableOpacity onPress={() => { imageTakeFromCamera() }}>
                            <Text style={STYLES.fontSize19_grey1C1939_Arial_400}>
                                Take Photo Camera </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { imageTakeFromGallery() }}>
                            <Text style={STYLES.fontSize19_grey1C1939_Arial_400}>
                                Take Photo Gallery </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheetCamera.current.close()}>
                            <Text style={STYLES.fontSize19_grey1C1939_Arial_400}>Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>

            </ScrollView>
        </SafeAreaView >
    );
};






const styles = StyleSheet.create({
    //   root: {flex: 1, padding: 20,backgroundColor:'green'},

    containerStyle: {
        padding: 20,
        width: "70%",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.green10CFA3,
        alignItems: 'center',
        borderRadius: 18,
        zIndex: 2
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default Account;