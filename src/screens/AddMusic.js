import React, { useState, useEffect, useRef } from 'react';

import {
    Image, View, ScrollView, StyleSheet,
    TouchableOpacity, Alert, SafeAreaView, FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableRipple, Text, Modal, Appbar, TextInput, } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { createMaterialTopTabNavigator } from
    '@react-navigation/material-top-tabs';
import SplashScreen from 'react-native-splash-screen';
import VideoPlayer from "react-native-video";
import RBSheet from 'react-native-raw-bottom-sheet';

import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import Svgs from '../utilities/svgs/Svgs';
import DocumentPicker from 'react-native-document-picker'
import Button1 from '../comp/Button1';
import AntDesign from 'react-native-vector-icons/AntDesign'
const AddMusic = ({ navigation }) => {
    SplashScreen.hide()
    const refRBSheetSelectGenere = useRef()
    const refRBSheetSelectPlaylist = useRef()
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
    const listSelectPlaylist = [
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
    const [stateSelectPlaylist, setStateSelectPlaylist] = useState('')

    const [stateIsValidUploadMusic, setStateIsValidUploadMusic] = useState(true);
    const [stateIsValidUploadCover, setStateIsValidUploadCover] = useState(true);
    const [stateIsValidAddTitle, setStateIsValidAddTitle] = useState(true);
    const [stateIsValidSelectGenere, setStateIsValidSelectGenere] = useState(true);
    const [stateIsValidSelectPlaylist, setStateIsValidSelectPlaylist] = useState(true);
    const [stateIsValidSelectDescription, setStateIsValidSelectDescription] = useState(true);

    const [stateSongPause, setStateSongPause] = useState("play")
    const [stateData, setStataData] = useState({
        uploadMusic: '',
        uploadCover: '',
        addTitle: '',
        description: '',
    }
    )



    const imageTakeFromGallery = () => {

        console.log('gg')
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.path);
            setStateIsValidUploadCover(true)
            setStataData({ ...stateData, uploadCover: image.path })
        });
    }


    const uploadMusic = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res[0].uri));

            setStataData({
                ...stateData,
                uploadMusic: JSON.stringify(res[0].uri)
            })
            //Setting the state to show single file attributes
            //  setSingleFile(res);
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }
    const post = () => {



        if (stateData.uploadMusic == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidUploadMusic(false)



        }
        if (stateData.uploadCover == '') {
            //   console.log(stateData.email + 'emailaddress')
            setStateIsValidUploadCover(false)

        }

        if (stateData.addTitle == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidAddTitle(false)
        }
        if (stateSelectPlaylist == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidSelectPlaylist(false)
        }
        if (stateSelectGenere == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidSelectGenere(false)
        }
        if (stateData.description == '') {
            //  console.log(stateData.password + 'password')
            setStateIsValidSelectDescription(false)
        }
        if (stateData.addTitle != '' && stateData.uploadCover != ''
            && stateData.description != '' && stateSelectPlaylist
            != '' && stateSelectGenere != ''
            && stateData.uploadMusic != '') {
            Alert.alert("All Valid Data")
        }


    }
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
                    <Appbar.Content title="ADD MUSIC"
                        titleStyle={{
                            alignSelf: 'center',

                        }}
                        style={{
                        }} />


                </Appbar.Header>

                <View style={{
                    marginTop: '2%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '5%'
                }}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: COLORS.green0DC1A7,
                        height: 100,
                        //backgroundColor: 'red',
                        borderStyle: 'dashed',
                        borderRadius: 13,
                        width: "46%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <TouchableRipple style={{
                            flexDirection: 'row',
                            backgroundColor: COLORS.green0DC1A7,
                            paddingHorizontal: "5%",
                            paddingVertical: '4%',
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} onPress={() => {
                            uploadMusic()
                            DocumentPicker.types.audio
                        }}>
                            <>
                                <SvgXml xml={Svgs.uploadIcon} style={{ marginRight: "5%" }} />
                                <Text style={STYLES.fontSize12_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Upload Music</Text>
                            </>
                        </TouchableRipple>

                    </View>



                    <View style={{
                        borderWidth: 1,
                        borderColor: COLORS.purple6D47F4,
                        height: 100,
                        //backgroundColor: 'red',
                        borderRadius: 13,
                        borderStyle: 'dashed',
                        width: "46%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        {stateData.uploadCover == '' ?
                            <TouchableRipple style={{
                                flexDirection: 'row',
                                backgroundColor: COLORS.purple6D47F4,
                                paddingHorizontal: "5%",
                                paddingVertical: '4%',
                                borderRadius: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={() => { imageTakeFromGallery() }}>
                                <>
                                    <SvgXml xml={Svgs.uploadIcon} style={{ marginRight: "5%" }} />

                                    <Text style={STYLES.fontSize12_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Upload Cover</Text>
                                </>
                            </TouchableRipple>
                            :
                            <>
                                <Image style={{
                                    flex: 1, width: "100%"
                                }}
                                    source={{ uri: stateData.uploadCover }} />

                                <TouchableRipple style={{
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.purple6D47F4,
                                    paddingHorizontal: "5%",
                                    paddingVertical: '4%',
                                    borderRadius: 40,
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    alignItems: 'center'
                                }} onPress={() => { imageTakeFromGallery() }}>
                                    <>
                                        <SvgXml xml={Svgs.uploadIcon} style={{ marginRight: "5%" }} />

                                        <Text style={STYLES.fontSize12_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Upload Cover</Text>
                                    </>
                                </TouchableRipple>
                            </>
                        }


                    </View>


                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: '5%', }}>
                    <View style={{ width: '55%' }}>
                        {stateIsValidUploadMusic == false ? <Text style={{ color: 'red' }}>Upload Music</Text> : null}
                    </View>
                    {stateIsValidUploadCover == false ? <Text style={{ color: 'red' }}>Upload Cover</Text> : null}
                </View>

                <View style={{
                    flexDirection: 'row', marginHorizontal: '5%',
                    justifyContent: 'space-between', alignItems: 'center',
                    marginTop: '5%',
                    backgroundColor: COLORS.black303033,
                    borderRadius: 6,
                    paddingRight: '3%'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image source={{ uri: 'https://baconmockup.com/300/200/' }}

                            style={{ width: 42, height: 42, marginRight: '4%' }} />
                        <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Rebel Rebel-David Bowie</Text>
                    </View>

                    {stateSongPause == "pause" ?
                        <AntDesign name='pause' color={COLORS.whiteFFFFFF}
                            size={30} onPress={() => {
                                setStateSongPause("play")
                            }} /> :
                        <AntDesign name='play' color={COLORS.whiteFFFFFF}
                            size={30}
                            onPress={() => {
                                setStateSongPause("pause")
                            }} />}


                </View>
                <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Add Title</Text>
                    <TextInput style={{ height: 40 }}
                        selectionColor={COLORS.whiteFFFFFF}
                        activeUnderlineColor={COLORS.whiteFFFFFF}
                        onChangeText={(text) => {
                            setStateIsValidAddTitle(true)
                            setStataData({
                                ...stateData, addTitle: text
                            })
                        }} />
                    {stateIsValidAddTitle == false ? <Text style={{ color: 'red' }}>Enter Valid Title</Text> : null}
                </View>


                <View style={{ marginTop: '5%', marginHorizontal: '5%', }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Select Playlist</Text>
                    <TouchableRipple style={{
                        flexDirection: 'row',
                        //backgroundColor: 'red',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.whiteFFFFFF
                    }} onPress={() => refRBSheetSelectPlaylist.current.open()}
                    >
                        <>
                            <View style={{
                                flex: 1,
                                height: 40,
                                justifyContent: 'center'

                            }}>
                                <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>{stateSelectPlaylist}</Text>
                                {/* <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>{stateSelectGenere}</Text> */}

                            </View>
                            <SvgXml xml={Svgs.downArrow} style={{ marginRight: '3%' }} />

                        </>
                    </TouchableRipple>
                    {stateIsValidSelectPlaylist == false ? <Text style={{ color: 'red' }}>Select Valid Playlist</Text> : null}
                </View>
                <View style={{ marginTop: '5%', marginHorizontal: '5%', }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Select Genere</Text>
                    <TouchableRipple style={{
                        flexDirection: 'row',
                        //backgroundColor: 'red',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.whiteFFFFFF
                    }} onPress={() => refRBSheetSelectGenere.current.open()}
                    >
                        <>
                            <View style={{
                                flex: 1,
                                height: 40,
                                justifyContent: 'center'

                            }}>
                                <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>{stateSelectGenere}</Text>
                                {/* <Text style={STYLES.fontSize14_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>{stateSelectGenere}</Text> */}

                            </View>
                            <SvgXml xml={Svgs.downArrow} style={{ marginRight: '3%' }} />

                        </>
                    </TouchableRipple>
                    {stateIsValidSelectGenere == false ? <Text style={{ color: 'red' }}>Select Valid Genere</Text> : null}
                </View>


                <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                    <Text style={STYLES.fontSize16_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular}>Description</Text>
                    <TextInput style={{
                        //height: 140,
                        textAlignVertical: 'top',
                        //backgroundColor: "red"

                    }} multiline={true}
                        numberOfLines={6}
                        selectionColor={COLORS.whiteFFFFFF}
                        activeUnderlineColor={COLORS.whiteFFFFFF}
                        onChangeText={(text) => {
                            setStateIsValidSelectDescription(true)
                            setStataData({
                                ...stateData, description: text
                            })
                        }} />
                    {stateIsValidSelectDescription == false ? <Text style={{ color: 'red' }}>Enter Valid Description</Text> : null}
                </View>

                <View style={{ marginHorizontal: '5%', marginTop: '15%', marginBottom: '15%' }}>
                    <Button1 text="POST"
                        onPress={() => { post() }}
                    />
                </View>

                {/* Bottom sheet Playlist */}
                <RBSheet
                    // closeOnDragDown={true}
                    closeOnPressMask={false}
                    dragFromTopOnly={true}
                    height={400}
                    animationType="slide"
                    ref={refRBSheetSelectPlaylist}


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
                                SELECT PLAYLIST</Text>

                            <TouchableRipple
                                onPress={() => refRBSheetSelectPlaylist.current.close()}

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
                                {listSelectPlaylist.map((list, index) => {
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
                                                refRBSheetSelectPlaylist.current.close()
                                                setStateSelectPlaylist(list.value)
                                                setStateIsValidSelectPlaylist(true)
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


                {/* Bottom sheet Genere */}
                <RBSheet
                    // closeOnDragDown={true}
                    closeOnPressMask={false}
                    dragFromTopOnly={true}
                    height={400}
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
        </SafeAreaView >
    );
};

export default AddMusic;