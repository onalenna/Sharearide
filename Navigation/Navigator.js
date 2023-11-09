import { createAppContainer, createSwitchNavigator } from '@react-navigation/native'
import AuthNav from './AuthNav';
import TabNav from './TabNav';
import AccNav from './AccNav';



//NAVIGATION - sequence of screens
export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthNav,
    Tab: TabNav,
    Acc: AccNav,
  })
)