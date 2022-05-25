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
// import { Audio } from 'expo-av';

import { useNavigationState } from '@react-navigation/native';
import { WebView } from 'react-native-webview';



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
        token       : '',
        playgame    : false
        // hasSearch           : props.route.params ? props.route.params.hasSearch : false,
        // search_game_url     : props.route.params ? props.route.params.search_game_url : false,
        // search_user_token   : props.route.params ? props.route.params.search_user_token : false,
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
  //   AsyncStorage.getItem('@id')
  //   .then((data) => {
  //   const id = JSON.parse(data)
  //   console.log("GET ID page Token FROM STORE : ", id)
  //   this.setState({
  //     ...this.state,
  //     id: id
  //   })

  // });


  }



//   componentDidUpdate(previousProps, previousState) {
//     // const prestate = {
//     //   hasSearch: this.props.route.params.hasSearch,
//     //   search_game_url: this.props.route.params.search_game_url,
//     //   search_user_token: this.props.route.params.search_user_token
//     // }
//     // this.props.route.params.onNavigateBack(...prestate)
//     if (previousProps.route.params.hasSearch !== previousState.hasSearch) {
//       this.setState({
//         ...this.state,
//         hasSearch: this.props.route.params.hasSearch,
//         search_game_url: this.props.route.params.search_game_url,
//         search_user_token: this.props.route.params.search_user_token
  
//       })
//     }
// }

// componentWillReceiveProps(nextProps) {
//   // Any time props.email changes, update state.    
//   this.setState({
//       hasSearch: this.props.route.params.hasSearch,
//       search_game_url: this.props.route.params.search_game_url,
//       search_user_token: this.props.route.params.search_user_token
//     });
//   if (nextProps.route.params.hasSearch !== this.props.route.params.hasSearch) {
//     this.setState({
//       hasSearch: this.props.route.params.hasSearch,
//       search_game_url: this.props.route.params.search_game_url,
//       search_user_token: this.props.route.params.search_user_token
//     });
//   }
// }

// static getDerivedStateFromProps(props, state) {
//   // Any time the current user changes,
//   // Reset any parts of state that are tied to that user.
//   // In this simple example, that's just the email.
//     return {
//       hasSearch: props.route.params.hasSearch,
//       search_game_url: props.route.params.search_game_url,
//       search_user_token: props.route.params.search_user_token
//     };
  
// }

  

  findWebView(id) {
    axios({
      method: 'post',
      url: `${endpoint}/members/playgame`,
      data: {
        "userId" : id,
    },
      headers: {'X-Requested-With':'XMLHttpRequest',
                'x-api-key':apiKey,
                'x-device-uid':deviceUID,
                'Authorization':`${this.state.token}`}
    }).then((res) => {
      if(res.data.status == "success") {
        this.setState({
          ...this.state,
          user_token: res.data.access_token,
          game_url: res.data.game_url
        })
        console.log("GAME STATE : ", this.state)
      }
    }).catch((e) => {
      console.log('PLAY_GAME ERROR : ', e)
    });
  }

  componentDidMount() {
    console.log('componentDidMount');      
    // this.setState({
    //   ...this.state,
    //   hasSearch: this.props.route.params.hasSearch,
    //   search_game_url: this.props.route.params.search_game_url,
    //   search_user_token: this.props.route.params.search_user_token

    // })
  //   Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //     staysActiveInBackground: true,
  //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  //     playsInSilentModeIOS: true,
  //     shouldDuckAndroid: true,
  //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  //     playThroughEarpieceAndroid: false
  //  });
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
      // this.playSound();
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
          profile: profile,
          hasSearch: true,
          id: profile.id
        })
        this.findWebView(profile.id)
        this.initposition()
      }else if(status == "notmatch") {
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
        this.wrongSearch(err.response.data.message);
      }else{
        console.log("AXIOS GAME SEARCH ERROR: ", err.response.data.message);
        this.setState({
          ...this.state,
          profile: ''
        })
        this.wrongSearch(err.response.data.message);
  
      }
    });
  }

  wrongSearch = (message) => {
    Alert.alert(
      message || 'ไม่พบเบอร์โทรศัพท์ดังกล่าวลงทะเบียน',
      'กรุณาลองใหม่',
      [
        {text: 'ปิด', onPress: () => {console.log('Close dialog')}},
      ],
      { cancelable: false });
      return true;
  }

  playAgain = () => {
    this.findWebView(this.state.profile.id);
    this.setState({...this.state, winner: false})
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
                      {!this.state.profile || !this.state.playgame
                      ? <View style={styles.searchBox}>
                          <Text style={styles.registerText}>Search</Text>
                          <View style={styles.inputWrapper}>
                          <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                value={this.state.search}
                                onChangeText={(search) => {this.setState({...this.state, search: search})}}
                                placeholder='ค้นหาเบอร์โทรศัพท์'
                                keyboardType='numeric'
                                onSubmitEditing={()=>{this._fetchResults()}}
                                />
                          </View>
                          <TouchableOpacity style={styles.inputButton}  onPress={()=>{this._fetchResults()}} underlayColor = 'transparent'>
                              <Text style={styles.buttonText} >
                                GO
                              </Text>
                          </TouchableOpacity>
                          </View>
                          {this.state.profile
                          ? <View style={styles.searchResultContainer}>
                                <View style={styles.searchResultBox}>
                                    <View style={styles.searchResultFrom}>
                                      <View style={styles.titleForm}>
                                        <Text style={styles.title} >พบข้อมูลสมาชิก</Text>
                                      </View>
                                      <View style={styles.searchTitle}>
                                        <Text style={styles.title} >คุณ {this.state.profile['name']} {this.state.profile['phoneno']}</Text>
                                      </View>
                                      {/* <View style={styles.submitWrapper} >
                                        <TouchableOpacity style={styles.submit} onPress={() => {navigation.navigate('Register')}}>
                                          <Text style={styles.submitText}>ลงทะเบียน</Text>
                                        </TouchableOpacity>
                                      </View> */}
                                      <View style={styles.submitWrapper} >
                                        <TouchableOpacity style={styles.submit} onPress={() => {this.setState({...this.state, playgame: true, closeSearch: true}) }}>
                                          <Text style={styles.submitText}>เล่นเกมส์</Text>
                                        </TouchableOpacity>
                                      </View>
                                      <View style={styles.submitWrapper} >
                                        <TouchableOpacity style={styles.submit} onPress={() => {this.props.navigation.navigate('Home')}}>
                                          <Text style={styles.submitText}>กลับไปหน้าหลัก</Text>
                                        </TouchableOpacity>
                                      </View>
                                      <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {this.props.navigation.navigate('Home')}} >
                                          <Image source={require("../assets/images/register/register_logo.png")} style={styles.RegisterLogo}  />
                                      </TouchableOpacity>
                                    </View>
                                </View>
                            </View> : this.state.hasSearch&&<View style={styles.searchResultContainer}>
                                        <View style={styles.searchResultBox}>
                                            <View style={styles.searchResultFrom}>
                                              <View style={styles.titleForm}>
                                                <Text style={styles.title} >ไม่พบข้อมูลสมาชิก</Text>
                                              </View>

                                              <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {this.props.navigation.navigate('Home')}} >
                                                  <Image source={require("../assets/images/register/register_logo.png")} style={styles.RegisterLogo}  />
                                              </TouchableOpacity>
                                            </View>
                                        </View>
                                      </View>}
                        </View>
                      : 
                      
                      this.state.playgame&&<View style={styles.cubeContainer}>
                      <WebView  onMessage={(event) => {
                          console.log("CALLBACK EVENT : ", event)
                          const data = JSON.parse(event.nativeEvent.data);
                          console.log("CALLBACK EVENT DATA: ", data)
                          this.setState({
                            ...this.state,
                            winner: true,
                            ...data.stop_item
                          })
                          /* CALLBACK EVENT
                          รับข้อมูลที่ส่งมาผ่าน event.nativeEvent.data
                          */
                        }} 
                        mediaPlaybackRequiresUserAction={false}
                        allowsInlineMediaPlayback={true}
                        originWhitelist={['*']} 
                        source={{ 
                          uri: this.state.game_url ,
                          headers: {
                            'Authorization': this.state.token,
                            'user-token' : this.state.user_token
                          },
                        }} 
                        injectedJavaScriptBeforeContentLoaded={`
                          window.isNativeApp = true;
                        `}
                        style={{ width : width , height : height , flex : 1 , backgroundColor: 'transparent' }} 
                      />

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
                        <View style={styles.submitWrapper} >
                          <TouchableOpacity style={styles.submit} onPress={() => {this.playAgain()}}>
                            <Text style={styles.submitText}>เล่นอีกครั้ง</Text>
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
                        <View style={styles.submitWrapper} >
                          <TouchableOpacity style={styles.submit} onPress={() => {this.playAgain()}}>
                            <Text style={styles.submitText}>เล่นอีกครั้ง</Text>
                          </TouchableOpacity>
                        </View>
                    </View>}
                      </View>: null}

                      </View>}
                     

                    </View>
                </View>
              <ImageBackground source={require("../assets/images/register/background.png")} style={styles.backgroundImage}  />
              </View>

            <View style={styles.menu}  >
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Home')}}>
                <Image source={require("../assets/images/register/logo_home.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Register')}} >
                <Image source={require("../assets/images/register/logo_register.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.playgame ? styles.seletedMenuItem : styles.menuItem} onPress={() => {this.props.navigation.navigate('Game')}}>
                <Image source={require("../assets/images/register/logo_game.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.playgame ? styles.menuItem : styles.seletedMenuItem} onPress={() => {this.props.navigation.navigate('Search')}}>
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
      fontFamily: 'Kanit-Medium',
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
    homeImage: {
      width: 600,
      height: 300,
      zIndex: 100
    },
    cubeContainer: {
      position: 'relative',
      alignItems: 'center', 
      justifyContent: 'center',
      width: width,
      height: height,
      backgroundColor: "transparent",
      zIndex: 100,
      flexDirection: 'row',
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
      fontFamily: 'Kanit-Medium',
      fontSize: 16,
      color: 'white',
    },
    spinImage: {
      marginTop: height/3.5,
      width: width/5,
      resizeMode: 'contain'
    },
    winnerReward : {
      marginTop: height/3,
      position: 'absolute',
      top: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: width/1.3,
      height: height/2.2,
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
      fontFamily: 'Kanit-Medium',
      fontSize: 16,
      color: 'white',
    },
    searchResultContainer: {
        position: 'relative',
        marginTop: -600,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        zIndex: 120
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
    registerLogoWrapper: {
      position: 'absolute',
      bottom:-9,
      right: -66, 
      width: width/3,
      zIndex: 200
    }
  });
  
