import { Alert, Platform } from "react-native"

const server = Platform.OS == 'ios' 
    ? 'http://localhost:3430' : 'http://192.168.0.6:3430'

function showError(err) {
    if(err.response && err.response.data){
        Alert.alert('Ops! Ocorreu um Problema!', `${err.response.data}`)
    } else {
        Alert.alert('Ops! Ocorreu um Problema!', `Contate o suporte técnico. Mensagem: ${err}`)
    }
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }