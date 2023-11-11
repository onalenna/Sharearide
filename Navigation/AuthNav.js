import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Screens/Login";
import Register from "../Screens/Register";


const Stack = createStackNavigator();

export default function AuthNav(){
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Registration" 
          component={Register}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
  );
}

  

  


    