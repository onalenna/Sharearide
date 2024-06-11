import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from "./Navigation/AuthNav";
import TabNav from "./Navigation/TabNav";
import axios from "axios";


const Stack = createNativeStackNavigator();
axios.defaults.baseURL = "https://api.dev.sharearide.co.bw/app/uaa/v1"


export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={Home}
          options={{ headerShown: false }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );

}

function Home() {
  return <TabNav />;
}

function SignInScreen() {
  return <AuthNav />;
}


