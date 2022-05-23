import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
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
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

const endpoint  = 'https://asahigame.dev.kanda.digital/api';
const apiKey    = '818EY26UYbZEYPZ76QwH4nVcTCtsLpYMnJQuI7Jn';
const deviceUID = Device.osBuildId;
const deviceName = Device.deviceName+"_expo";
export default function Search ({navigation}) {
const [search, setSearch] = useState('')
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

const _fetchResults = () => {
  axios({
    method: 'post',
    url: `${endpoint}/members/search`,
    data: {
      "phoneno" : search,
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
    console.log("RESPONSE SEARCH: ", res);
    console.log("RESPONSE SEARCH RECEIVED: ", res.data);
    const profile = res.data
    const status = res.data.status
    const message = res.data.message
    if((status == "match")) {
      setProfile(profile)
    }else if(status == "notmatch") {
      console.log("Search not match")
      // wrongSearch(message)
      setProfile('');
    }else {
      console.log("Search not match")
      setProfile('');
      wrongSearch(message)
    }
  })
  .catch((err) => {
    if(err.response.status == 400){
      console.log("AXIOS SEARCH ERROR: ", err.response.data.message);
      setProfile('')
      wrongSearch(err.response.data.message)
    }else{
      console.log("AXIOS SEARCH ERROR: ", err.response.data.message);
      setProfile('')
      wrongSearch()

    }
  });
}

const wrongSearch = (message) => {
  Alert.alert(
    message || 'ไม่พบเบอร์โทรศัพท์ดังกล่าวลงทะเบียน',
    'กรุณาลองใหม่',
    [
      {text: 'ตกลง', onPress: () => {console.log('Close dialog')}},
      {text: 'ปิด', onPress: () => {console.log('Close dialog')}},
    ],
    { cancelable: false });
    return true;
}

const successSearch = (message) => {
  Alert.alert(
    message,
    'ดำเนินการต่อ',
    [
      {text: 'ตกลง', onPress: () => {console.log('Close dialog')}},
      {text: 'ปิด', onPress: () => {console.log('Close dialog')}},
    ],
    { cancelable: false });
    return true;
}

            return(
            <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
                <View style={styles.wrapper}>
                    <View style={styles.panelWrapper}>
                      <View style={styles.registerContainer}>
                          <View style={styles.registerBox}>
                              <Text style={styles.registerText}>Search</Text>
                              <View style={styles.inputWrapper}>
                              <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    value = {search}
                                    onChangeText = {(search) => {setSearch(search)}}
                                    placeholder = 'ค้นหาเบอร์โทรศัทพ์'
                                    keyboardType = 'numeric'
                                    onSubmitEditing = {()=>{_fetchResults()}}
                                    />
                              </View>
                              <TouchableOpacity style={styles.inputButton} onPress = {()=>{_fetchResults()}} underlayColor = 'transparent'>
                                  <Text style={styles.buttonText} >
                                    GO
                                  </Text>
                              </TouchableOpacity>
                              </View>
                          {profile 
                          ? <View style={styles.searchResultContainer}>
                                <View style={styles.searchResultBox}>
                                    <View style={styles.searchResultFrom}>
                                      <View style={styles.titleForm}>
                                        <Text style={styles.title} >พบข้อมูลสมาชิก</Text>
                                      </View>
                                      <View style={styles.searchTitle}>
                                        <Text style={styles.title} >คุณ {profile['name']} {profile['phoneno']}</Text>
                                      </View>
                                      <View style={styles.submitWrapper} >
                                        <TouchableOpacity style={styles.submit} onPress={() => {navigation.navigate('Register')}}>
                                          <Text style={styles.submitText}>ลงทะเบียน</Text>
                                        </TouchableOpacity>
                                      </View>
                                      <View style={styles.submitWrapper} >
                                        <TouchableOpacity style={styles.submit} onPress={() => {navigation.navigate('Game')}}>
                                          <Text style={styles.submitText}>เล่นเกมส์</Text>
                                        </TouchableOpacity>
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
                            </View> : <View style={styles.emptyContainer}></View>}
                        </View>
                      </View>

                    <ImageBackground source={require("../assets/images/register/background.png")} style={styles.backgroundImage}  />
                    </View>

                  <View style={styles.menu}  >
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Home')}}>
                      <Image source={require("../assets/images/register/logo_home.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Register')}} >
                      <Image source={require("../assets/images/register/logo_register.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Game')}}>
                      <Image source={require("../assets/images/register/logo_game.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {navigation.navigate('Search')}}>
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
      zIndex: 100
    },
    wrapper: {
        height: height,
        width: width,
        resizeMode: 'contain',
        zIndex: 100
    },
    backgroundImage: {
        top: 0  ,
        height: height,
        width: width,
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
        zIndex: 110
    },
    panelWrapper: {
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    registerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        zIndex: 100
    },
    searchResultContainer: {
        marginTop: -600,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        zIndex: 100
    },
    emptyContainer: {
        marginTop: -900,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        zIndex: 100
    },
    registerBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height/2,
        width: width/2,
        zIndex: 100
    },
    searchResultBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width/1.3,
        backgroundColor: '#000',
        opacity: 0.8,
        borderWidth: 2,
        marginTop: 500,
        zIndex: 100
    },
    searchResultFrom: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        width: width/1.3,
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
    submitText: {
      fontFamily: 'Kanit-Medium',
      fontSize: 16,
      color: 'white',
    },
    registerLogoWrapper: {
      position: 'absolute',
      bottom: -1,
      right: -66, 
      width: width/3,
      zIndex: 200
    },
    registerText: {
      fontFamily: 'Kanit-Medium',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 70,
        color: '#fff',
        height: 110,
        width: width/1.5,
        zIndex: 100,
        marginBottom: 50
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
    inputWrapper: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      height: 60,
      width: 360,
      zIndex: 110

    },
    input: {
      fontFamily: 'Kanit-Medium',
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white',
      height: 60,
      width: 280,
      paddingLeft: 20,
      fontSize: 20,
      zIndex: 100
    },
    inputButton: {
      alignItems:'center',
      height: 60,
      width: 80,
      backgroundColor: 'red',
      zIndex: 100
    },
    buttonText: {
      fontFamily: 'Kanit-Medium',
      textAlign: 'center',
      textAlignVertical: 'center', 
      color: 'white',
      height: 60,
      width: 80,
      fontSize: 30,
      zIndex: 100
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
      width: 240,
      padding: 10,
      marginBottom: 20
    },
    searchTitle: {
      fontFamily: 'Kanit-Medium',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 30,
      color: '#fff'
    },
    title: {
      fontFamily: 'Kanit-Medium',
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: "center",
      textAlign: "center",
      fontSize: 30,
      color: '#fff',
      height: 50,
      width: 500
    },
    title2: {
      fontFamily: 'Kanit-Medium',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 30,
      color: '#fff',
      width: width/2
    }
  });
  
