import React, {Component, useState} from 'react';
import { render } from 'react-dom';
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
    PanResponder,
    Animated
} from 'react-native';
import { transformOrigin, rotateXY, rotateXZ } from '../service/utils';
const { width, height } = Dimensions.get('window')
export default class Game extends Component {
  constructor(props){
    super();
    this.state = {
    };
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
  }

  componentDidMount() {
    this.initposition();
  }

  initposition() {
    let dx = 45;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    this.refViewTop.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    this.refViewBottom.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

  }

  handlePanResponderMove (e, gestureState) {
    console.log("gestureState : ", gestureState)
    const { dx, dy } = gestureState;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    this.refViewTop.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    this.refViewBottom.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});
  }

  playGame() {
    let dx = 1800;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    this.refViewTop.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    this.refViewBottom.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

  }

  renderLeft(color) {
    return (
      <Animated.View
        ref={component => this.refViewRight = component}
        style={[styles.cube, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderRight(color) {
    return (
      <Animated.View
        ref={component => this.refViewLeft = component}
        style={[styles.cube, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderFront(color) {
    return (
      <Animated.View
        ref={component => this.refViewFront = component}
        style={[styles.cube, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderBack(color) {
    return (
      <Animated.View
        ref={component => this.refViewBack = component}
        style={[styles.cube, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderTop(color) {
    return (
      <Animated.View
        ref={component => this.refViewTop = component}
        style={[styles.cube, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderBottom(color) {
    return (
      <Animated.View
        ref={component => this.refViewBottom = component}
        style={[styles.cube, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  render() {
    return(
              <SafeAreaView style={styles.container}>
                  <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
                  <View style={styles.wrapper}>
                      <View style={styles.panelWrapper}>
                        <View style={styles.registerContainer}>
                            <View style={styles.registerBox}>
                                <Text style={styles.registerText}>Game</Text>
                            </View>
                            <View style={styles.cubeContainer}>
                              {this.renderFront('#4c72e0')}
                              {this.renderBack('#8697df')}
                              {this.renderLeft('#b5bce2')}
                              {this.renderRight('#e5afb9')}
                              {this.renderTop('#de7c92')}
                              {this.renderBottom('#d1426b')}
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
                      <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {this.playGame()}}>
                        <Image source={require("../assets/images/register/logo_game.png")}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Search')}}>
                        <Image source={require("../assets/images/register/logo_search.png")}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Home')}}>
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
    cubeContainer: {
      position: 'absolute',
      left: width / 2 - 150,
      top: height / 2 - 150,
      width: 300,
      height: 300,
      backgroundColor: "transparent",
      zIndex: 100
    },
    cube: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 300,
      height: 300,
      zIndex: 110
    }
  });
  
