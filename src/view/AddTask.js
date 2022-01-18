import React, { Component } from "react"
import { 
    Platform,
    Modal, 
    View,
    Text,
    TouchableOpacity,
    TextInput, 
    StyleSheet, 
    TouchableWithoutFeedback 
} from "react-native"

import moment from "moment"
import 'moment/locale/pt-br'

import DateTimePicker from '@react-native-community/datetimepicker'

import Styles from '../Styles'

// QUANDO FOR PRECISO LIMPAR OS DADOS INICIAIS
const initialState = { desc: '', date: new Date(), showDateTimePicker: false }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

//  SALVANDO UMA NOVA TASK
    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
        
        this.setState({ ...initialState })

    }

//  CORRIGINDO PARA ANDROID
    getDateTimePicker = () => {
        let dateTimePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDateTimePicker: false }) }
            mode='date' />

        const dateString = moment(this.state.date).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            dateTimePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDateTimePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDateTimePicker && dateTimePicker}
                </View>
            )
        }

        return dateTimePicker
    }

    render() {
        return(
            <Modal transparent={true} visible={this.props.isVisible} 
                onRequestClose={this.props.onCancel} animationType="slide" >
                
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>

                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input}
                        placeholder="Informe a descrição"
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })} />
                    {this.getDateTimePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save} >
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: Styles.fontFamily,
        backgroundColor: Styles.colors.today,
        color: Styles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        marginBottom: 10,
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: Styles.colors.today
    },
    input: {
        fontFamily: Styles.fontFamily,
        height: 40,
        margin: 20,
        backgroundColor: Styles.colors.secondary,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    date: {
        fontFamily: Styles.fontFamily,
        fontSize: 18,
        marginLeft: 25
    }
})