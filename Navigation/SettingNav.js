import { createStackNavigator } from '@react-navigation/stack';
import Settings from "../Screens/Settings";
import Faq from "../Screens/Faq";
import About from "../Screens/About";
import Notifications from "../Screens/Notifications";


const Stack = createStackNavigator();

export default function SettingNav(){
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Faq" 
          component={Faq} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Notifications" 
          component={Notifications} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
  );
}

  

  


    