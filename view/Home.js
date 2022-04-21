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
const { width, height } = Dimensions.get('window')
export default function Home ({navigation}) {

            return(
            <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
                <View style={styles.wrapper}>
                    <View style={styles.panelWrapper}>
                      <View style={styles.registerContainer}>
                          <View style={styles.registerBox}>
                              <Image style={styles.homeImage} source={require("../assets/images/home/2Kanji.png")}></Image>
                          </View>
                      </View>
                    <ImageBackground source={require("../assets/images/register/background.png")} style={styles.backgroundImage}  />
                    </View>

                  <View style={styles.menu}  >
                    <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {navigation.navigate('Home')}}>
                      <Image source={require("../assets/images/register/logo_home.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Register')}} >
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
    }
  });
  
