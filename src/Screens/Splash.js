import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View,Text,StyleSheet } from "react-native";

const Splash = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Home")

        },1000)

    },[])
    return(
        <View style={styles.container}>

            <Text style={styles.logo}>Splash Screen</Text>

        </View>
    )
}
export default Splash


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#58787B",
        justifyContent:"center",
        alignItems:"center"
    },
    logo:{
        fontSize:40,
        fontWeight:"bold"
    }

})