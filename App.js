import react, {useState}          from 'react';
import { StatusBar }              from 'expo-status-bar';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { createAppContainer }     from 'react-navigation';
import { createStackNavigator }   from 'react-navigation-stack';
import LockScreenPincode          from './view/LockScreenPincode';
import Game                       from './view/Game';
import Register                   from './view/Register';
import Home                       from './view/Home';

import { NavigationContainer }        from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator }   from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('window')
export default function App() {
  const [hasPincode, setHasPincode] = useState(true)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {!hasPincode 
       ? <LockScreenPincode/>
       : 
          <NavigationContainer style={styles.width100} >
            <Tab.Navigator style={styles.width100}  >
              <Tab.Screen style={styles.width100} name="Register" component={Register} />
              <Tab.Screen style={styles.width100} name="Home" component={Home} />
              <Tab.Screen style={styles.width100} name="Game" component={Game} />
            </Tab.Navigator>
          </NavigationContainer>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height:height,
    width:width
  },
  width100: {
    width:width
  }
});
