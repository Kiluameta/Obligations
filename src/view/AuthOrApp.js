import React, { Component } from "react"
import { 
    View,
    ActivityIndicator,
    StyleSheet 
} from "react-native"

import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { showError } from "../common"

export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch(e) {
            showError(e)
        }

        if(userData && userData.token) {
            Axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        } else {
            this.props.navigation.navigate('Login', userData)
        }
    }    

    render() {
        return(
            <View style={styles.container} >
                <ActivityIndicator size='large' />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    }
})