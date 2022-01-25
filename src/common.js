import { Alert, Platform } from "react-native"

const server = Platform.OS == 'ios' 
    ? 'http://localhost:3430' : 'http://192.168.0.6:3430'

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }