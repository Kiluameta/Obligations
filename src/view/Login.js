import React, { Component } from 'react'
import { 
    ImageBackground, 
    Text, 
    StyleSheet, 
    View, 
    TouchableOpacity
} from 'react-native'

import Axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import Styles from '../Styles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'

const initialState = { 
    name: '',
    email: 'leonardo@outlook.com',
    password: '123456',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {
    
    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew){
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            await Axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })
        } catch(e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await Axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password  
            })

            Axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch(e) {
            showError(e)
        }
    }
    
    render() {

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.email && this.state.email.includes('.com')) 
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew) {
            validations.push(this.state.name &&  this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return(
            <ImageBackground source={backgroundImage} 
                style={styles.background} >
                <Text style={styles.title} >Obligations</Text>
                <View style={styles.Container} >

                    <Text style={styles.subTitle} >
                        { this.state.stageNew ? 'Crie sua conta' : 'Informe seu login' }
                    </Text>

                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' 
                            value={this.state.name} 
                            onChangeText={name => this.setState({ name })} 
                            style={styles.input} />
                    }
                    <AuthInput icon='at' placeholder='E-mail' 
                        value={this.state.email} 
                        onChangeText={email => this.setState({ email })} 
                        style={styles.input} />

                    <AuthInput icon='lock' placeholder='Senha' 
                        value={this.state.password} 
                        onChangeText={password => this.setState({ password })} 
                        style={styles.input} secureTextEntry={true} />

                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' placeholder='Confirmação de Senha' 
                            value={this.state.confirmPassword} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} 
                            style={styles.input} secureTextEntry={true} />   
                    }

                    <TouchableOpacity onPress={this.signinOrSignup} 
                        disabled={ !validForm } >
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' } ]} >
                            <Text style={styles.buttonText} >
                                { this.state.stageNew ? 'Registrar' : 'Entrar' }
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={{ padding: 10 }} 
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })} >
                    <Text style={styles.buttonText} >
                        { this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?' }    
                    </Text>
                </TouchableOpacity>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: Styles.fontFamily,
        color: Styles.colors.secondary,
        fontSize: 60,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: Styles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10   
    },
    Container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: Styles.fontFamily,
        color: Styles.colors.secondary,
        fontSize: 20
    }
})