import React, {useState} from 'react';
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
    Button
} from 'react-native';
import { CheckBox } from 'react-native-elements'
const { width, height } = Dimensions.get('window')
export default function Search ({navigation}) {
const [search, setSearch] = useState('')

const _fetchResults = () => {
  console.log('fetchResult : ')
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
                              <TouchableHighlight style={styles.inputButton} onPress = {()=>{_fetchResults()}} underlayColor = 'transparent'>
                                  <Text style={styles.buttonText} >
                                    GO
                                  </Text>
                              </TouchableHighlight>
                          </View>
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
        marginTop: -200,
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
      zIndex: 100

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
    }
  });
  
