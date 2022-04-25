import React, {useState, useEffect}          from 'react';
import { StatusBar }              from 'expo-status-bar';
import { StyleSheet, 
         Text, 
         View, 
         Dimensions,
         DevSettings,
         BackHandler,
         Alert,
         ActivityIndicator, }             from 'react-native';
import LockScreenPincode          from './view/LockScreenPincode';
import Game                       from './view/Game';
import Cube                       from './view/CubeOld';
import Flip                       from './view/Flip';
import Register                   from './view/Register';
import Home                       from './view/Home';
import Search                     from './view/Search';  
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import * as Device from 'expo-device';
import axios from 'axios';




const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

export default function App() {
  const [hasPincode, setHasPincode] = useState(true);
  const [uniqueId, setUniqueId]     = useState('');

  const endpoint  = 'https://asahigame.dev.kanda.digital/api';
  const apiKey    = '818EY26UYbZEYPZ76QwH4nVcTCtsLpYMnJQuI7Jn';
  const deviceUID = Device.osBuildId;
  const deviceName = Device.deviceName+"_expo";

  useEffect(() => {
    console.log("deviceUID : ",deviceUID)
    console.log("DeviceName : ",deviceName)
    // checkDeviceID();
  },[])

  const checkDeviceID = () => {

    console.log("deviceUID checkDeviceID : ",deviceUID)
    console.log("DeviceName checkDeviceID : ",deviceName)
    axios({
      method: 'post',
      url: `${endpoint}/devices/request`,
      data: {
        "device_uid" : deviceUID,
        "device_name" : deviceName
    },
      headers: {'X-Requested-With':'XMLHttpRequest',
                'x-api-key':apiKey,
                'x-device-uid':deviceUID}
    }).then((res) => {
      console.log("RESPONSE APP RECEIVED: ", res.data);
      const allowed = res.data.allowed
      if(!allowed) {
        exitApp()
      }
    })
    .catch((err) => {
      console.log("AXIOS APP ERROR: ", err);
      exitApp();
    });
  }

  const exitApp = () => {
    Alert.alert(
      'เครื่องยังไม่ลงทะเบียนกับระบบ ',
      'กรุณาแจ้ง ADMIN และลองใหม่อีกครั้ง',
      [
        {text: 'ลองใหม่', onPress: () => DevSettings.reload()},
        {text: 'ปิดแอพ', onPress: () => BackHandler.exitApp(), style: 'cancel'},
      ],
      { cancelable: false });
      return true;
  }

  const logout = () => {
    setHasPincode(true)
  }
  return (
    <View style={styles.container}>
       <NavigationContainer>
         <Stack.Navigator 
            screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="LockScreen" component={LockScreenPincode} />
            {/* <Stack.Screen name="Game" component={Cube} /> */}
            <Stack.Screen name="Home" component={Home} />
            
           <Stack.Screen name="Search" component={Search} />
         </Stack.Navigator>
         </NavigationContainer>
         {/* <ActivityIndicator size="large" color="#ff0000" /> */}
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
