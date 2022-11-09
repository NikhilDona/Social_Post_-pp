import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity,Image } from "react-native";

const Home = () => {

    const navigation = useNavigation()
    return (
        <View style={styles.container}>

            <StatusBar
                backgroundColor={"#ffffff"}
                barStyle={"dark-content"}
            />
            <Text style={styles.welcome}>Hello,Welcome</Text>
            <Text style={[styles.welcome, { color: "#5A5A5A", marginRight: 30, fontSize: 20, marginTop: 15 }]}>For which Platform you want to create post</Text>
            <View style={styles.socialContainer}>
                <FlatList
                data={[
                    {name:'Facebook',icon:require("../Assets/icons8-facebook-messenger-480.png")},
                    {name:'Tiktok',icon:require("../Assets/icons8-tiktok-480.png")},
                    {name:'Tinder',icon:require("../Assets/icons8-tinder-480.png")},
                    {name:'Youtube',icon:require("../Assets/icons8-youtube-480.png")},
                    {name:'Twitter',icon:require("../Assets/icons8-twitter-480.png")}
                ]}
                numColumns={3}
                renderItem={({item,index}) => {
                    return(
                        <TouchableOpacity onPress={() => navigation.navigate("CreatePost",{name:item.name,icon:item.icon})} style={styles.listItem}>

                            <Image 
                            source={item.icon}
                            style={styles.itemimage}
                             />

                        </TouchableOpacity>
                    )
                }}
                 />

            </View>
        </View>
    )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff"
    },
    welcome: {
        fontWeight: "600",
        fontSize: 24,
        color: "#000",
        marginTop: 50,
        marginLeft: 20
    },
    socialContainer:{
        marginTop:20,
        alignItems:"center",
        justifyContent:"center"
    },
    listItem:{
        width:"20%",
        height:60,
        alignItems:"center",
        justifyContent:"center",
        margin:20
    },
    itemimage:{
        height:50,
        width:100,
        resizeMode:"contain"
    }
})