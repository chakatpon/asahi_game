import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Text,
    TextInput,
    Linking, 
    Button,
    Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

const endpoint  = 'https://asahigame.dev.kanda.digital/api';
const apiKey    = '818EY26UYbZEYPZ76QwH4nVcTCtsLpYMnJQuI7Jn';
const deviceUID = Device.osBuildId;
const deviceName = Device.deviceName+"_expo";
export default function Register ({navigation}) {
  // navigation.navigate('Home')
  const [step, setStep]             = useState(1)
  const [newName, setName]          = useState('');
  const [newPhone, setPhone]        = useState('');
  const [isSelected, setSelection]  = useState(false);
  const [OTP, setOTP]               = useState('');
  const [refOTP, setRefOTP]         = useState('');
  const [token, setToken]           = useState('');
  const [profile, setProfile]       = useState('');


  useEffect(() => {
    AsyncStorage.getItem('@access_token')
      .then((data) => {
      const token = JSON.parse(data)
      console.log("GET Token FROM STORE : ", token)
      setToken(token)
    });
  },[])

  const register = () => {
    axios({
      method: 'post',
      url: `${endpoint}/members/register`,
      data: {
        "phoneno" : newPhone,
        "name" : newName,
        "tac" : isSelected
    },
      headers: {'X-Requested-With':'XMLHttpRequest',
                'x-api-key':apiKey,
                'x-device-uid':deviceUID,
                'Authorization':`${token}`}
    }).then((res) => {
      // Example Response
      // {
      //   "status": "success",
      //   "message": "ลงทะเบียนสำหรับ กรุณายืนยัน OTP จาก SMS",
      //   "otp_refno": "3LHOD"
      // }
      console.log("RESPONSE REGISTER: ", res);
      console.log("RESPONSE REGISTER RECEIVED: ", res.data);
      const status = res.data.status
      const message = res.data.message
      const otp_refno = res.data.otp_refno
      if((status == "success") && (otp_refno)) {
        setRefOTP(otp_refno)
        successRegister(message)
      }else if(status == "failed") {
        wrongRegister(message)
      }else {
        wrongRegister(message)
      }
    })
    .catch((err) => {
      if(err.response.status == 400){
        console.log("AXIOS REGISTER ERROR: ", err.response.data.message);
        wrongRegister(err.response.data.message)
      }else{
        wrongRegister()

      }
    });
  }

  const sendOTP = () => {
    // {
    //   "phoneno" : "0805649964",
    //   "otp_code" : "168305",
    //   "otp_refno" : "J2Y1U"
    // }
    axios({
      method: 'post',
      url: `${endpoint}/members/verify`,
      data: {
        "phoneno" : newPhone,
        "otp_code" : OTP,
        "otp_refno" : refOTP
    },
      headers: {'X-Requested-With':'XMLHttpRequest',
                'x-api-key':apiKey,
                'x-device-uid':deviceUID,
                'Authorization':`${token}`}
    }).then((res) => {
      // Example Response
      // {
      //   "status": "success",
      //   "message": "ลงทะเบียนสำหรับ กรุณายืนยัน OTP จาก SMS",
      //   "otp_refno": "3LHOD"
      // }
      console.log("RESPONSE OTP: ", res);
      console.log("RESPONSE OTP RECEIVED: ", res.data);
      const status = res.data.status
      const message = res.data.message
      const profile = res.data.profile
      if(status == "success") {
        setProfile(profile);
        setStep(3);
      }else if(status == "failed") {
        wrongOTP(message)
      }else {
        wrongOTP(message)
      }
    })
    .catch((err) => {
      if(err.response.status == 400){
        console.log("AXIOS OTP ERROR: ", err.response.data.message);
        wrongOTP(err.response.data.message)
      }else{
        wrongOTP()

      }
    });
  }

  const wrongRegister = (message) => {
    Alert.alert(
      message || 'ลงทะเบียนไม่สำเร็จ',
      'กรุณาลองใหม่',
      [
        {text: 'ตกลง', onPress: () => {console.log('Close dialog')}},
        {text: 'ปิด', onPress: () => {console.log('Close dialog')}},
      ],
      { cancelable: false });
      return true;
  }

  const successRegister = (message) => {
    Alert.alert(
      message,
      'ดำเนินการต่อ',
      [
        {text: 'ตกลง', onPress: () => setStep(2)},
        {text: 'ปิด', onPress: () => setStep(2)},
      ],
      { cancelable: false });
      return true;
  }

  const wrongOTP = (message) => {
    Alert.alert(
      message || 'รหัสอ้างอิง OTP ไม่ถูกต้องกรุณาตรวจสอบการเรียก',
      'กรุณาลองใหม่',
      [
        {text: 'ตกลง', onPress: () => {console.log('Close dialog')}},
        {text: 'ปิด', onPress: () => {console.log('Close dialog')}},
      ],
      { cancelable: false });
      return true;
  }

  const successOTP = (message) => {
    Alert.alert(
      message,
      'ดำเนินการต่อ',
      [
        {text: 'ตกลง', onPress: () => setStep(3)},
        {text: 'ปิด', onPress: () => setStep(3)},
      ],
      { cancelable: false });
      return true;
  }

            return(
            <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
                <View style={styles.wrapper}>
                    <View style={styles.panelWrapper}>
                    {step == 1 // Register Step 1
                      ? <View style={styles.registerContainer}>
                            <View style={styles.registerBox}>
                                <Text style={styles.registerText}>Register</Text>
                                <View style={styles.registerForm}>
                                  <View style={styles.titleForm}>
                                    <Text style={styles.title} >ลงทะเบียนร่วมกิจกรรม</Text>
                                  </View>
                                  <TextInput
                                          style={styles.input}
                                          placeholder="ชื่อ - นามสกุล"
                                          onChangeText={newName => setName(newName)}
                                          defaultValue={newName}/>
                                  <TextInput/>
                                  <TextInput
                                          style={styles.input}
                                          placeholder="เบอร์โทรศัพท์"
                                          onChangeText={newPhone => setPhone(newPhone)}
                                          keyboardType = 'numeric'
                                          defaultValue={newPhone}/>
                                  <TextInput/>
                                  <View style={styles.checkboxContainer}>
                                    <CheckBox
                                      title={"ยอมรับเงื่อนไขการเข้าร่วมกิจกรรม"}
                                      textStyle={styles.label}
                                      containerStyle={styles.checkbox}
                                      checkedColor='white'
                                      checked={isSelected}
                                      onPress={(e) => setSelection(!isSelected)}
                                    />
                                  </View>
                                  <TouchableOpacity style={styles.linkWrapper}>
                                    <Text style={styles.link}
                                          onPress={() => Linking.openURL('https://www.google.com')}>
                                      อ่านโยบายความปลอดภัย
                                    </Text>
                                  </TouchableOpacity>
                                  <View style={styles.submitWrapper} >
                                    <TouchableOpacity 
                                      // style={styles.submit}
                                      style={
                                        (!newName || !newPhone || !isSelected)
                                        ? styles.submitDisable
                                        : styles.submit
                                      }
                                      disabled={
                                        (!newName || !newPhone || !isSelected)
                                        ? true
                                        : false
                                      }  
                                      onPress={() => register()}>
                                      <Text style={styles.submitText}>ลงทะเบียน</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {navigation.navigate('Home')}} >
                                    <Image source={require("../assets/images/register/register_logo.png")} style={styles.RegisterLogo}  />
                                  </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                      : step == 2 // Register Step 2
                      ? <View style={styles.registerContainer}>
                            <View style={styles.registerBox}>
                                <Text style={styles.registerText}>Register</Text>
                                <View style={styles.registerForm}>
                                  <View style={styles.titleForm}>
                                    <Text style={styles.title2} >ยืนยันตัวตนด้วยรหัส OTP จากข้อความที่ SMS ที่โทรศัทพ์ของคุณ</Text>
                                  </View>
                                  <TextInput
                                          style={styles.input}
                                          placeholder="รหัส OTP"
                                          onChangeText={OTP => setOTP(OTP)}
                                          keyboardType = 'numeric'
                                          defaultValue={OTP}/>
                                  <TextInput/>
                                  <TouchableOpacity style={styles.linkWrapper2}>
                                    <Text style={styles.link2}
                                          onPress={() => Linking.openURL('https://www.google.com')}>
                                      ส่งรหัส OTP อีกครั้ง
                                    </Text>
                                  </TouchableOpacity>
                                  <View style={styles.submitWrapper} >
                                    <TouchableOpacity 
                                      style={
                                        (!OTP)
                                        ? styles.submitDisable
                                        : styles.submit
                                      }
                                      disabled={
                                        (!OTP)
                                        ? true
                                        : false
                                      } 
                                      onPress={() => {sendOTP(3)}}>
                                      <Text style={styles.submitText}>ตกลง</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {navigation.navigate('Home')}}>
                                    <Image source={require("../assets/images/register/register_logo.png")} style={styles.RegisterLogo}  />
                                  </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    : step == 3
                    ? <View style={styles.registerContainer}>
                          <View style={styles.registerBox}>
                              <Text style={styles.registerText}>Register</Text>
                              <View style={styles.registerForm}>
                                <View style={styles.titleForm}>
                                  <Text style={styles.title2} >การลงทะเบียนสำเร็จขอบคุณสำหรับการร่วนกิจกรรม</Text>
                                </View>
                                <View style={styles.submitWrapper} >
                                  <TouchableOpacity style={styles.submit} onPress={() => {navigation.navigate('Home')}}>
                                    <Text style={styles.submitText}>กลับไปหน้าหลัก</Text>
                                  </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {navigation.navigate('Home')}} >
                                    <Image source={require("../assets/images/register/register_logo.png")} style={styles.RegisterLogo}  />
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>: null}
                      
                    <ImageBackground source={require("../assets/images/register/background.png")} style={styles.backgroundImage}  />
                  </View>
                  <View style={styles.menu}  >
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Home')}}>
                      <Image source={require("../assets/images/register/logo_home.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {navigation.navigate('Register')}} >
                      <Image source={require("../assets/images/register/logo_register.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Game')}}>
                      <Image source={require("../assets/images/register/logo_game.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Search')}}>
                      <Image source={require("../assets/images/register/logo_search.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('LockScreen')}}>
                      <Image source={require("../assets/images/register/logo_logout.png")}/>
                    </TouchableOpacity>
                  </View>
                </View>

            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
        height: height,
        width: width,
        resizeMode: 'contain',
        position: 'relative'
    },
    backgroundImage: {
        top: 0  ,
        height: height,
        width: height,
        resizeMode: 'cover',
        position:"absolute",
    },
    logo: {
        position:"absolute",
        width: width/3,
        top: 0,
        left: 0,
        right: 0,
        resizeMode: 'contain',
        zIndex: 100
    },
    panelWrapper: {
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerContainer: {
        marginTop: -10,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        zIndex: 100
    },
    registerBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width/2,
        zIndex: 100
    },
    registerText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 50,
        color: '#fff',
        height: 80,
        width: width/1.5,
        zIndex: 100,
        marginBottom: 50
    },
    registerForm: {
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: width/1.3,
      height: height/2,
      backgroundColor: '#000',
      opacity: 0.8,
      borderWidth: 2,
      zIndex: 100

    },
    registerLogoWrapper: {
      position: 'absolute',
      bottom:-9,
      right: -66, 
      width: width/3,
      zIndex: 200
    },
    RegisterLogo: {
      width: width/4,
      resizeMode: 'contain',
      zIndex: 200
  },
    titleForm: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      overflow: 'visible',
      borderBottomColor: 'red',
      borderBottomWidth: 2,
      color: '#fff',
      width: 160,
      padding: 10,
      marginBottom: 20
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 30,
      color: '#fff',
      width: width
    },
    title2: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 30,
      color: '#fff',
      width: width/2
    },
    input: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: "center",
      paddingLeft: 4,
      height: 45,
      width: 350,
      zIndex: 100,
      backgroundColor: '#fff'
      },
    checkboxContainer: {
      flexDirection: "row",
      width: 350,
      padding: 0,
      margin: 0,
      zIndex: 100
    },
    checkbox: {
      padding: 0,
      margin: 0,
      backgroundColor: 'transparent',
      color: 'white',
      marginLeft: 0,
      marginRight: 10,
      borderLeftWidth: 0,
      borderColor: 'transparent',
      zIndex: 100
    },
    label: {
      margin: 8,
      color: "#fff",
      padding: 0,
      margin: 0,
      zIndex: 100
    },
    linkWrapper: {
      marginTop:50,
      width: 350,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      zIndex: 100
    },
    linkWrapper2: {
      width: 350,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      zIndex: 100
    },
    link: {
      color: 'grey',
      textDecorationLine: 'underline',
      zIndex: 100
    },
    link2: {
      color: "#fff",
      textDecorationLine: 'underline',
      zIndex: 100
    },
    submitWrapper: {
      width: 350,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      zIndex: 100
    },
    submit: {
      width: 180,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      backgroundColor: 'red',
      zIndex: 100,
    },
    submitDisable: {
      width: 180,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      backgroundColor: 'grey',
      zIndex: 100,
    },
    submitText: {
      fontSize: 16,
      color: 'white',
    },
    menu: {
      display: 'flex',
      flexDirection: 'row',
      width: width,
      height: height/8,
      position:'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 20,
      right:0,
      zIndex: 100
    },
    menuItem: {
      borderColor: 'red',
      width: width/5,
      height: height/8,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      zIndex: 100
    },
    seletedMenuItem: {
      borderColor: 'red',
      width: width/5,
      height: height/8,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      backgroundColor: 'red',
      zIndex: 100
    },

  });
  
