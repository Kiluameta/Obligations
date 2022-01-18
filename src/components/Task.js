import React from "react";
import { 
    View,
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity 
} from 'react-native'
import Swipeable from "react-native-gesture-handler/Swipeable"
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from "moment"
import 'moment/locale/pt-br'

import Styles from "../Styles";

export default props => {

    const doneOrNot = props.done ? 
        { textDecorationLine: 'line-through' } : {}

    const date = props.done ? props.done : props.estimate
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM') 

    // ICONE TOCAVEL QUE FICARÁ NO SWIPE
    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} 
                onPress={() => props.onDelete && props.onDelete(props.id)} >
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    return(
        <Swipeable renderRightActions={getRightContent} >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheck(props.done)}
                    </View>
                </TouchableWithoutFeedback>
                
                <View>
                    <Text style={[styles.desc, doneOrNot]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheck(done){
    if(done != null){
        return(
            <View style={styles.done}>
                <Icon name="check" size={15} color={Styles.colors.secondary} ></Icon>
            </View>
        )
    } else {
        return(
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'   
    },
    desc: {
        fontFamily: Styles.fontFamily,
        color: Styles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: Styles.fontFamily,
        color: Styles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 40
    }
})