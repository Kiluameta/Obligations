import { createAppContainer, createSwitchNavigator } from "react-navigation"

import TaskList from "./view/TaskList"
import Login from "./view/Login"

const mainRoutes = {
    Login: {
        name: 'Login',
        screen: Login
    },
    Home: {
        name: 'Home',
        screen: TaskList
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Login'
})

export default createAppContainer(mainNavigator)