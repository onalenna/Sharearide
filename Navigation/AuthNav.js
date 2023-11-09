import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Screens/Login";


//NAVIGATION - list of login screens 
const AuthNav = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}