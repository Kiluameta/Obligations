import React, { Component } from 'react'
import { 
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity,
    Platform,
    Alert 
} from 'react-native'

import todayImg from '../../assets/imgs/today.jpg'
import tomorrowImg from '../../assets/imgs/tomorrow.jpg'
import weekImg from '../../assets/imgs/week.jpg'
import monthImg from '../../assets/imgs/month.jpg'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '../common'
import Styles from '../Styles'
import Task from '../components/Task'
import AddTask from './AddTask'


const initialState = { 
    showDone: true,
    showAddTask: false,
    visibleTask: [],
    tasks: []
}

export default class TaskList extends Component{

    state = {
        ...initialState
    }

    componentDidMount = async () => {
       const stateString = await AsyncStorage.getItem('taskState')
       const state = JSON.parse(stateString) || initialState
       this.setState({
           showDone: state.showDone
       }, this.filterTask)

       this.loadTask()
    }

    // CARREGA A TAREFA
    loadTask = async () => {
        try {
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59:59')
            const res = await Axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTask)
        } catch(e) {
            showError(e)
        }
    }

    // ALTERNAR ENTRE FILTROS
    toggleFilter = () => {
        this.setState({showDone: !this.state.showDone}, this.filterTask)
    }

    // FILTRAR AS TAREFAS
    filterTask = () => {
        let visibleTask = null
        if(this.state.showDone) {
            visibleTask = [...this.state.tasks]
        } else {
            const pending = task => task.done === null
            visibleTask = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTask })
        AsyncStorage.setItem('taskState', JSON.stringify({
            showDone: this.state.showDone
        }))
    }

    // ALTERNAR A CONCLUSÃO DA TAREFA
    toggleTask = async taskId => {
        try {
            await Axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTask()
        } catch(e) {
            showError(e)
        }
    }

    // ADICIONANDO A TAREFA E DANDO RELOAD NO FILTRO
    addTask = async newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        try {
            await Axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimate: newTask.date
            })

            this.setState({ showAddTask: false }, this.loadTask)
        } catch(e) {
            showError(e)
        }     
    }

    // DELETA A TAREFA
    deleteTask = async taskId => {
        try {
            await Axios.delete(`${server}/tasks/${taskId}`)
            await this.loadTask()
        } catch(e) {
            showError(e)
        }
    }

    // ADICIONA A IMAGEM CORRETA
    getImage = () => {
        switch(this.props.dayAhead) {
            case 0: return todayImg
            case 1: return tomorrowImg
            case 7: return weekImg
            default: return monthImg
        }
    }

    getColors = () => {
        switch(this.props.dayAhead) {
            case 0: return Styles.colors.today
            case 1: return Styles.colors.tomorrow
            case 7: return Styles.colors.week
            default: return Styles.colors.month
        }
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask} />
                <ImageBackground 
                    source={this.getImage()} 
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={Styles.colors.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDone ? 'eye' : 'eye-slash'} size={20} color={Styles.colors.secondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>

                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTask}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColors() }]}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddTask: true })} >
                    <Icon name='plus' size={20} color={Styles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskContainer: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: Styles.fontFamily,
        fontSize: 50,
        color: Styles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: Styles.fontFamily,
        fontSize: 20,
        color: Styles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    }, 
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 45 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})