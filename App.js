import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from "./Navigation/AuthNav";
import AccNav from "./Navigation/AccNav";


const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  // custom logic
  return false;
};

export default function App() {
  const isSignedIn = getIsSignedIn();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={Home}
              options={{ headerShown: false }} 
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="SignIn" 
              component={SignInScreen} 
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

}

function Home() {
  return <AccNav />;
}

function SignInScreen() {
  return <AuthNav />;
}


