import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from "./Navigation/Navigator"

export default function App() {
  return (
    <Navigator/>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your apps!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
