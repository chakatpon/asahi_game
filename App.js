import { StatusBar }              from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LockScreenPincode          from './view/LockScreenPincode';
import Game                       from './view/Game'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <LockScreenPincode/>
      {/* <Game/> */}
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
  },
});
