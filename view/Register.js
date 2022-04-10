import React, {useState} from 'react';
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
    Button
} from 'react-native';
import { CheckBox } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

export default function Register ({navigation}) {
  // navigation.navigate('Home')
  const [step, setStep]             = useState(1)
  const [newName, setName]          = useState('');
  const [newPhone, setPhone]        = useState('');
  const [isSelected, setSelection]  = useState(false);
  const [OTP, setOTP]               = useState('');
  const [refOTP, setRefOTP]         = useState('');


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
                                    <TouchableOpacity style={styles.submit} onPress={() => {setStep(2)}}>
                                      <Text style={styles.submitText}>ลงทะเบียน</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {setStep(2)}} >
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
                                          onChangeText={OTP => setName(OTP)}
                                          defaultValue={OTP}/>
                                  <TextInput/>
                                  <TouchableOpacity style={styles.linkWrapper2}>
                                    <Text style={styles.link2}
                                          onPress={() => Linking.openURL('https://www.google.com')}>
                                      ส่งรหัส OTP อีกครั้ง
                                    </Text>
                                  </TouchableOpacity>
                                  <View style={styles.submitWrapper} >
                                    <TouchableOpacity style={styles.submit} onPress={() => {setStep(3)}}>
                                      <Text style={styles.submitText}>ตกลง</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {setStep(1)}}>
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
                                <TouchableOpacity style={styles.registerLogoWrapper} onPress={() => {setStep(1)}} >
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
      zIndex: 100
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
  
