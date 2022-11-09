import { useRoute } from "@react-navigation/native";
import React, { createRef, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, PermissionsAndroid } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

const CreatePost = () => {

    const route = useRoute()

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref = useRef();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [caption, setCaption] = useState('')

    const [imageData, setImageData] = useState()


    const openCamera = async () => {
        const result = await launchCamera({ mediaType: "photo" });
        if (result.didCancel) {

        }
        else {
            console.log(result)
            setImageData(result)
        }

    }
    const openGallery = async () => {

        const result = await launchImageLibrary({ mediaType: "photo" });
        if (result.didCancel) {

        }
        else {
            console.log(result)
        }

    }

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Social Post App Camera Permission",
                    message:
                        "Social Post App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                openCamera()
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const requestGalleryPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Social Post App Gallery Permission",
                    message:
                        "Social Post App needs access to your Gallery " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
                openGallery()
            } else {
                console.log("Camera permission denied");

            }
        } catch (err) {
            console.warn(err);
        }
    };


    const captureShot = () => {
        ref.current.capture().then(uri => {
            console.log("do something with ", uri);
            Share.open({
                message: caption,
                url: uri
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log(err);
                });
        });
    }

    return (
        <ViewShot
            ref={ref}
            options={{ fileName: "Nikhil_Screenshot", format: 'png', quality: 0.9 }}
            style={styles.container}>
            <Text style={styles.title}>
                Create Post for {route.params.name}
            </Text>



            <View style={styles.postBox}>
                <View style={styles.topView}>

                    <View style={styles.topLeft}>
                        {imageData == null ? (
                            <Image source={require('../Assets/user.png')} style={{ height: 50, width: 50, borderRadius: 25, tintColor: "#00acee" }} />
                        )
                            :
                            (

                                <Image source={{ uri: imageData.assets[0].uri }} style={{ height: 40, width: 40, resizeMode: "contain", borderRadius: 25 }} />

                            )

                        }

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: "800", fontSize: 18 }}>{name == '' ? 'Name' : name}</Text>
                            <Text style={{ color: "#8e8e8e" }}>@{email == '' ? 'email' : email}</Text>
                        </View>
                    </View>

                    <Image
                        source={route.params.icon}
                        style={{ height: 40, width: 40 }}
                    />
                </View>
                <Text style={{ color: "#8e8e8e", margin: 15, fontSize: 16, fontWeight: "600" }}>{caption == '' ? "Caption" : caption}</Text>

            </View>

            <TextInput
                style={styles.textBox}
                placeholder="Enter Name"
                value={name}
                onChangeText={(value) => setName(value)}
                onSubmitEditing={() => ref_input2.current.focus()}
            />
            <TextInput
                style={styles.textBox}
                placeholder="Enter Username"
                value={email}
                onChangeText={(value) => setEmail(value)}
                ref={ref_input2}
                onSubmitEditing={() => ref_input3.current.focus()}
            />
            <TextInput
                style={[styles.textBox, { height: 100 }]}
                placeholder="Caption"
                multiline={true}
                value={caption}
                onChangeText={(value) => setCaption(value)}
                ref={ref_input3}
            />

            <TouchableOpacity onPress={() => requestCameraPermission()} style={styles.btn}>
                <Text style={styles.text}>Pick Image from Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => requestGalleryPermission()} style={styles.btn}>
                <Text style={styles.text}>Pick Image from Gallery</Text>
            </TouchableOpacity>


           <TouchableOpacity onPress={() => captureShot()} style={{position:"absolute",top:20,right:30}}>
            <Image style={{height:30,width:30,resizeMode:"contain"}} source={require('../Assets/share.png')} /> 
           </TouchableOpacity>


        </ViewShot>

    )
}
export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 25,
        fontWeight: "600",
        color: "#000",
        alignSelf: "center",
        marginTop: 70
    },
    postBox: {
        width: "90%",
        elevation: 3,
        alignSelf: "center",
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 10
    },
    topView: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15

    },
    topLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    textBox: {
        height: 50,
        width: "90%",
        borderRadius: 15,
        elevation: 3,
        paddingHorizontal: 20,
        marginTop: 20, alignSelf: "center",
        backgroundColor: "#fff"
    },
    btn: {
        height: 60,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "purple",
        marginTop: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontSize: 16

    }

})