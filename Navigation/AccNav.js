import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screens/Home";
import Buses from "../Screens/Buses";


const Tab = createBottomTabNavigator();


export default function AccNav() {

    return (
        <Tab.Navigator>
          <Tab.Screen name="Land" component={Land} />
          <Tab.Screen name="Buses" component={Bus} />
        </Tab.Navigator>
      );

}

function Land() {
  return <Home />;
}

function Bus() {
  return <Buses />;
}


