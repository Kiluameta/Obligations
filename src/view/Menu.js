import React from "react"
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { DrawerItems } from "react-navigation-drawer"
import { Gravatar } from "react-native-gravatar"
import Styles from "../Styles"

import Axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"
import Icon from "react-native-vector-icons/FontAwesome"

export default props => {

    const logout = () => {
        delete Axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
    }

    return(
        <ScrollView>
            <View style={styles.header} >
                {/* <Text style={styles.title} >Obligations</Text> */}
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }} />
                <View style={styles.info} >
                    <Text style={styles.name} >{props.navigation.getParam('name')}</Text>
                    <Text style={styles.email} >{props.navigation.getParam('email')}</Text>
                </View>
                <TouchableOpacity onPress={logout} >
                    <View style={styles.logout} >
                        <Icon name="sign-out" size={30} color='#800' />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItems  {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: Styles.fontFamily,
        fontSize: 30,
        padding: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 50 : 20
    },
    info: {
        marginLeft: 10
    },
    name: {
        fontFamily: Styles.fontFamily,
        fontSize: 20,
        marginBottom: 5,
        color: Styles.colors.mainText
    },
    email: {
        fontFamily: Styles.fontFamily,  
        fontSize: 15,   
        color: Styles.colors.subText,
        marginBottom: 10,
    },
    logout: {
        marginLeft: 10,
        marginBottom: 10
    }
})