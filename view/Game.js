import React, {Component, useState} from 'react';
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
    Animated,
    PanResponder,
    Alert
} from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import CubeRight from './CubeRight';
import { transformOrigin, rotateXY, rotateXZ } from '../service/utils';
import * as Device from 'expo-device';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';


const { width, height } = Dimensions.get('window')

const endpoint  = 'https://asahigame.dev.kanda.digital/api';
const apiKey    = '818EY26UYbZEYPZ76QwH4nVcTCtsLpYMnJQuI7Jn';
const deviceUID = Device.osBuildId;
const deviceName = Device.deviceName+"_expo";


export default class Game extends Component {
    constructor(props){
      super(props);
      this.state = {
        isInit      : true,
        isRunnig    : false,
        isStop      : false,
        accessToken : '',
        paths       : [],
        search      : '',
        profile     : '',
        token       : ''
      }
    }

  UNSAFE_componentWillMount() {

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
    AsyncStorage.getItem('@access_token')
      .then((data) => {
      const token = JSON.parse(data)
      console.log("GET GAME page Token FROM STORE : ", token)
      this.setState({
        ...this.state,
        token: token
      })
    });
    AsyncStorage.getItem('@id')
    .then((data) => {
    const id = JSON.parse(data)
    console.log("GET ID page Token FROM STORE : ", id)
    this.setState({
      ...this.state,
      id: id
    })
  });
  }
  

  componentDidMount() {
    console.log('componentDidMount');
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
   });
    // this.initposition();
  }

  async playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/sound/Spin.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  playGame = (val) => {
    axios({
      method: 'post',
      url: `${endpoint}/events/runCubic`,
      data: {
        "userId" : this.state.id,
    },
      headers: {'X-Requested-With':'XMLHttpRequest',
                'x-api-key':apiKey,
                'x-device-uid':deviceUID,
                'Authorization':`${this.state.token}`}
    }).then((res) => {
      console.log('RANDOM DATA : ', res.data)
      this.setState({
        ...this.state,
        ...res.data.stop_item,
      })
      this.playSound();
      console.log('RANDOM STATE : ', this.state)
    }).catch((e) => {
      console.log('RANDOM ERROR : ', e)
    });
    if(!this.state.isRunnig){
      this.setState({
        ...this.state,
        isRunnig: true
      })
    }else {
      this.setState({
        ...this.state,
        isRunnig: false
      })
    }
  };

  stopGame = (val) => {
    this.setState({
      ...this.state,
      isRunnig: false,
      winner: true,
    })
    setTimeout(this.initposition, 1);
  };



  handlePanResponderMove = (e, gestureState) => {
    const { dx, dy } = gestureState;
    const origin = { x: 0, y: 0, z: -267 };
    let matrix = rotateXY(dx, 0);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, 0);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, 0);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, 0);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});
    if(dx >= 180 ){

      this.playGame()
    }
  }

  initposition = () => {
    let dx = 45;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -267 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 900}, {matrix: matrix}]}});

  }

  _fetchResults = () => {
    axios({
      method: 'post',
      url: `${endpoint}/members/search`,
      data: {
        "phoneno" : this.state.search,
    },
      headers: {'X-Requested-With':'XMLHttpRequest',
                'x-api-key':apiKey,
                'x-device-uid':deviceUID,
                'Authorization':`${this.state.token}`}
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
        this.setState({
          ...this.state,
          profile: profile
        })
        this.initposition()
      }else if(status == "notmatch") {
        console.log("Search not match")
        this.setState({
          ...this.state,
          profile: ''
        })
        this.wrongSearch();
      }else {
        console.log("Search not match")
        this.setState({
          ...this.state,
          profile: ''
        })
        this.wrongSearch();
      }
    })
    .catch((err) => {
      if(err.response.status == 400){
        console.log("AXIOS GAME SEARCH ERROR: ", err.response.data.message);
        this.setState({
          ...this.state,
          profile: ''
        })
        this.wrongSearch();
      }else{
        console.log("AXIOS GAME SEARCH ERROR: ", err.response.data.message);
        this.setState({
          ...this.state,
          profile: ''
        })
        this.wrongSearch();
  
      }
    });
  }

  wrongSearch = (message) => {
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

  renderFront = (color) => {
    return (
      <View
        ref={component => this.refViewFront = component}
        style={[styles.front, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      >
        <Image style={styles.front} source={require("../assets/images/game/kanji1.png")}/>
      </View>
    )
  }

  renderBack = (color) => {
    return (
      <View
        ref={component => this.refViewBack = component}
        style={[styles.back, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      >
        <Image style={styles.back} source={require("../assets/images/game/kanji1.png")}/>
      </View>
    )
  }

  renderLeft = (color) => {
    return (
      <View
        ref={component => this.refViewRight = component}
        style={[styles.left, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
        >
        <Image style={styles.left} source={require("../assets/images/game/kanji2.png")}/>
      </View>
    )
  }

  renderRight = (color) => {
    return (
      <View
        ref={component => this.refViewLeft = component}
        style={[styles.right, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
        >
        <Image style={styles.right} source={require("../assets/images/game/kanji2.png")}/>
      </View>
    )
  }



  render() {
    const { } = this;
    return(
      <SafeAreaView style={styles.container}>
          <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
          <View style={styles.wrapper}>
              <View style={styles.panelWrapper}>
                <View style={styles.registerContainer}>
                    <View style={styles.registerBox}>
                      {!this.state.profile 
                      ? <View style={styles.searchBox}>
                          <Text style={styles.registerText}>Search</Text>
                          <View style={styles.inputWrapper}>
                          <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                value = {this.state.search}
                                onChangeText = {(search) => {this.setState({...this.state, search: search})}}
                                placeholder = 'ค้นหาเบอร์โทรศัทพ์'
                                keyboardType = 'numeric'
                                onSubmitEditing = {()=>{this._fetchResults()}}
                                />
                          </View>
                          <TouchableOpacity style={styles.inputButton} onPress = {()=>{this._fetchResults()}} underlayColor = 'transparent'>
                              <Text style={styles.buttonText} >
                                GO
                              </Text>
                          </TouchableOpacity>
                          </View>
                        </View>
                      : <View style={styles.cubeContainer}>
                      {this.state.winner ? <View style={styles.winnerReward} >
                      {this.state.is_reward
                       ? <View style={styles.titleForm}>
                          <Text style={styles.title} >ยินดีด้วย คุณได้รับของรางวัล</Text>
                          <Text style={styles.title} >{this.state.reward_name}</Text>
                          {this.state.file_url?<Image style={styles.rewardImage} source={{uri: this.state.file_url}}/>:null}
                        <View style={styles.submitWrapper} >
                          <TouchableOpacity style={styles.submit} onPress={() => {this.props.navigation.navigate('Home')}}>
                            <Text style={styles.submitText}>กลับไปหน้าหลัก</Text>
                          </TouchableOpacity>
                        </View>
                        </View>:
                        <View style={styles.badTitleForm}>
                        <Text style={styles.title} >เสียใจด้วย!!! </Text>
                        <Text style={styles.title} >คุณไม่ได้รับของรางวัล</Text>
                        <View style={styles.submitWrapper} >
                          <TouchableOpacity style={styles.submit} onPress={() => {this.props.navigation.navigate('Home')}}>
                            <Text style={styles.submitText}>กลับไปหน้าหลัก</Text>
                          </TouchableOpacity>
                        </View>
                    </View>}
                      </View>: null}
                      {!this.state.isRunnig
                       ? <><View style={styles.cubeBox}>
                          {this.renderBack('transparent')}
                          {this.renderRight('transparent')}
                          {this.renderLeft('transparent')}
                          {this.renderFront('transparent')}
                        </View>

                        <Image style={styles.spinImage} source={require("../assets/images/game/spintodiscover.png")}/>
                        </>
                        :null}
                      {this.state.isRunnig
                       ? <TouchableOpacity onPress={() => this.stopGame()}>
                           <CubeRight navigation={this.props.navigation} />
                           </TouchableOpacity>
                       : null}
                      </View>}
                     
                      {/* <Button title="flip x " onPress={() => this.flip('x')} /> */}
                      {/* <Button title="Play" onPress={() => this.flip('y')} /> */}
                      {/* {!this.state.isRunnig ? <View style={styles.submitWrapper} >
                        <TouchableOpacity style={styles.submit} onPress={() => this.playGame()}>
                          <Text style={styles.submitText}>เล่นเกมส์</Text>
                        </TouchableOpacity>
                      </View>:null}                      
                      {this.state.isRunnig ? <View style={styles.submitWrapper} >
                        <TouchableOpacity style={styles.submit} onPress={() => this.stopGame()}>
                          <Text style={styles.submitText}>หยุด</Text>
                        </TouchableOpacity>
                      </View>:null} */}
                    </View>
                </View>
              <ImageBackground source={require("../assets/images/game/game_bg.png")} style={styles.backgroundImage}  />
              </View>

            <View style={styles.menu}  >
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Home')}}>
                <Image source={require("../assets/images/register/logo_home.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Register')}} >
                <Image source={require("../assets/images/register/logo_register.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {this.props.navigation.navigate('Game')}}>
                <Image source={require("../assets/images/register/logo_game.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Search')}}>
                <Image source={require("../assets/images/register/logo_search.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('LockScreen')}}>
                <Image source={require("../assets/images/register/logo_logout.png")}/>
              </TouchableOpacity>
            </View>

          </View>

      </SafeAreaView>
  );
  }

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    },
    wrapper: {
        height: height,
        width: width,
        resizeMode: 'contain'
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
    searchBox: {
        marginTop: -350,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        zIndex: 110,
        backgroundColor: '#000',
        opacity: 0.8,

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
      textAlign: 'center',
      textAlignVertical: 'center', 
      color: 'white',
      height: 60,
      width: 80,
      fontSize: 30,
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
    homeImage: {
      width: 600,
      height: 300,
      zIndex: 100
    },
    cubeContainer: {
      position: 'relative',
      alignItems: 'center', 
      justifyContent: 'center',
      width: 450,
      height: 450,
      backgroundColor: "transparent",
      zIndex: 100,
      flexDirection: 'row',
      //backgroundColor: 'black', 
    },
    item: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      backgroundColor: 'red',
      marginBottom: 20,
    },  
    cubeBox: {
      display: 'flex',
      position: 'absolute',
      left: 0,
      top: -60,
      width: 450,
      height: 450,
      backgroundColor: "transparent"
    },  
    cubeBoxHide: {
      display: 'none',
      position: 'absolute',
      left: 0,
      top: -60,
      width: 450,
      height: 450,
      backgroundColor: "transparent"
    },
    front: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 450,
      width: 450,
      backgroundColor: 'transparent',
      zIndex: 120,
    },
    back: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 450,
      width: 450,
      backgroundColor: 'transparent',
      zIndex: 120,
    },
    left: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 450,
      width: 450,
      backgroundColor: 'transparent',
      zIndex: 120,
    },
    right: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 450,
      width: 450,
      backgroundColor: 'transparent',
      zIndex: 120,
    },
    image1: {
      top: -120,
      width: 300,
      resizeMode: 'contain',
    },
    image2: {
      top: -90,
      width: 300,
      resizeMode: 'contain',
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
      zIndex: 100
    },
    submitText: {
      fontSize: 16,
      color: 'white',
    },
    spinImage: {
      marginTop: height/3.5,
      width: width/5,
      resizeMode: 'contain'
    },
    winnerReward : {
      position: 'absolute',
      top: 50,

      alignItems: 'center',
      justifyContent: 'center',
      width: width/1.3,
      height: height/2.5,
      backgroundColor: '#000',
      opacity: 0.8,
      borderWidth: 2,
      zIndex: 120

    },
    badTitleForm: {
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
    titleForm: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      overflow: 'visible',
      color: '#fff',
      width: 240,
      padding: 10,
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: "center",
      textAlign: "center",
      fontSize: 30,
      color: '#fff',
      height: 50,
      width: 500
    },
    rewardImage: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
      zIndex: 120
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
      fontSize: 16,
      color: 'white',
    }
  });
  
