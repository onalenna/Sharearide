import { createStackNavigator } from '@react-navigation/stack';
import Details from "../Screens/Details";


const Stack = createStackNavigator();

export default function UserNav(){
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Details" 
          component={Details} 
          options={{ headerShown: false }} 
        />
        
      </Stack.Navigator>
  );
}

  

  


    