import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createDrawerNavigator } from 'react-navigation-drawer'

import TaskList from "./view/TaskList"
import Login from "./view/Login"

import AuthOrApp from "./view/AuthOrApp"
import Menu from "./view/Menu"
import Styles from "./Styles"

const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: Styles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            fontWeight: 'bold',
            color: '#080'
        }
    }
}

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <TaskList title='Hoje' dayAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <TaskList title='Amanhã' dayAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <TaskList title='Semana' dayAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <TaskList title='Mês' dayAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês'
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
    AuthOrApp: {
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
    Login: {
        name: 'Login',
        screen: Login
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)