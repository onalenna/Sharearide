import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, SimpleLineIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Home from "../Screens/Home";
import UserNav from './UserNav';
import ProfNav from './ProfNav';
import SettingNav from './SettingNav';



const Tab = createBottomTabNavigator();


export default function TabNav() {

  return (
    <Tab.Navigator
      screenOptions={{ 
        tabBarActiveTintColor: '#FA8072', 
        tabBarInactiveTintColor: '#707070' , 
        tabBarShowLabel: false, 
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="Home"
        component={Land}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <SimpleLineIcons
              name="home"
              size={28}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons
              name="map-outline"
              size={30}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Prof}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="user-o"
              size={28}
              color={color}
            />
          )
        }}
      />
      
      <Tab.Screen
        name="Setting"
        component={Sett}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <SimpleLineIcons
              name="settings"
              size={28}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );

}

function Land() {
  return <Home />;
}

function Activity() {
  return <UserNav />;
}

function Prof() {
  return <ProfNav />;
}

function Sett() {
  return <SettingNav />;
}


