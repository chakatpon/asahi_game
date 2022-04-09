import react, {useState}          from 'react';
import { StatusBar }              from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LockScreenPincode          from './view/LockScreenPincode';
import Game                       from './view/Game';
import Register                   from './view/Register';
import Home                       from './view/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  const [hasPincode, setHasPincode] = useState(true)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {!hasPincode 
       ? <LockScreenPincode/>
       :  <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="Register" component={Register} />
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Game" component={Game} />
         </Stack.Navigator>
         </NavigationContainer>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
