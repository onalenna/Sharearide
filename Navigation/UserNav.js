import { createStackNavigator } from '@react-navigation/stack';
import Buses from "../Screens/Buses";
import Details from "../Screens/Details";
import Seats from "../Screens/Seats";
import Ticket from "../Screens/Ticket";
import Cards from "../Screens/Cards";
import AddCard from "../Screens/AddCard";


const Stack = createStackNavigator();

export default function UserNav(){
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Buses" 
          component={Buses} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={Details}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Seats" 
          component={Seats}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Ticket" 
          component={Ticket}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cards" 
          component={Cards}
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="AddCard" 
          component={AddCard}
          options={{ headerShown: false }} 
        />
        
      </Stack.Navigator>
  );
}

  

  


    