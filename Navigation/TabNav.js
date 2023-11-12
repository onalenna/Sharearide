import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screens/Home";
import Buses from "../Screens/Buses";
import Profile from "../Screens/Profile";
import Settings from "../Screens/Settings";


const Tab = createBottomTabNavigator();


export default function TabNav() {

    return (
        <Tab.Navigator>
          <Tab.Screen name="Landing" component={Land} />
          <Tab.Screen name="Activity" component={Activity} />
          <Tab.Screen name="Profile" component={Prof} />
          <Tab.Screen name="Settings" component={Sett} />
        </Tab.Navigator>
      );

}

function Land() {
  return <Home />;
}

function Activity() {
  return <Buses />;
}

function Prof() {
  return <Profile />;
}

function Sett() {
  return <Settings />;
}


