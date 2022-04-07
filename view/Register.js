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
    TextInput
} from 'react-native';
// import { CheckBox } from 'react-native-paper';
const { width, height } = Dimensions.get('window')
export default function Register () {
  const [newName, setName]   = useState('');
  const [newPhone, setPhone] = useState('');
  const [isSelected, setSelection] = useState(false);

            return(
            <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
                <View style={styles.wrapper}>
                    <View style={styles.panelWrapper}>
                      <View style={styles.registerContainer}>
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
                                {/* <View style={styles.checkboxContainer}>
                                  <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    style={styles.checkbox}
                                  />
                                  <Text style={styles.label}>Do you like React Native?</Text>
                                </View> */}
                              </View>
                          </View>
                      </View>
                    <ImageBackground source={require("../assets/images/register/background.png")} style={styles.backgroundImage}  />
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
        resizeMode: 'contain'
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
        top: -70,
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
    titleForm: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      overflow: 'visible',
      borderBottomColor: 'red',
      borderBottomWidth: 2,
      color: '#fff',
      width: 120,
      padding: 10,
      marginBottom: 20
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 25,
      color: '#fff',
      width: width
    },
    input: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: "center",
      paddingLeft: 4,
      height: 30,
      width: 250,
      zIndex: 100,
      backgroundColor: '#fff'
      },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });
  
