import React from "react";
import { View,Text, StyleSheet } from "react-native";

const Home = () => {
    return(
        <View style={styles.container}>

            <Text style={styles.welcome}>Hello,Welcome</Text>
            <Text style={[styles.welcome,{color:"#B2B2B2",marginRight:30,fontSize:20,marginTop:15}]}>For which Platform you want to create post</Text>


        </View>
    )
}
export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffff"
    },
    welcome:{
        fontWeight:"600",
        fontSize:24,
        color:"#000",
        marginTop:50,
        marginLeft:20
    }
})