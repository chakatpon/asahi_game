import react, {useState}          from 'react';
import { StatusBar }              from 'expo-status-bar';
import { StyleSheet, 
         Text, 
         View, 
         Dimensions }             from 'react-native';
import LockScreenPincode          from './view/LockScreenPincode';
import Game                       from './view/Game';
import Register                   from './view/Register';
import Home                       from './view/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'


const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

export default function App() {
  const [hasPincode, setHasPincode] = useState(true)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {!hasPincode 
       ? <LockScreenPincode/>
       :  
       <NavigationContainer>
         <Stack.Navigator 
            screenOptions={{ headerShown: false }}>
           <Stack.Screen style={styles.screen} name="Register" component={Register} />
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Game" component={Game} />
         </Stack.Navigator>
         </NavigationContainer>
        //  <Register/>
         }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  screen: {
    width: width,
    height: height,
    zIndex: 100
    
  }
});
