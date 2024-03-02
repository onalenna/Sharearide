import { createStackNavigator } from '@react-navigation/stack';
import Account from "../Screens/Account";
import Profile from "../Screens/Profile";
import Bookings from "../Screens/Bookings";
import Tracking from "../Screens/Tracking";
import Faq from "../Screens/Faq";


const Stack = createStackNavigator();

export default function UserNav(){
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="UserAc" 
          component={Account} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="UserPro" 
          component={Profile}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Bookings" 
          component={Bookings}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Tracking" 
          component={Tracking}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
  );
}

  

  


    