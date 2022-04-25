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
    PanResponder
} from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import Cube from './Cube';
import { transformOrigin, rotateXY, rotateXZ } from '../service/utils';

const { width, height } = Dimensions.get('window')

export default class Game extends Component {
    constructor(props){
      super(props);
      this.state = {
        isInit    : true,
        isRunnig  : false,
        isStop    : false,
      }
    }
  


  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount()');    
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.initposition();

  }

  playGame = (val) => {
    this.setState({
      ...this.state,
      isRunnig: true
    })
  };

  stopGame = (val) => {
    this.setState({
      ...this.state,
      isRunnig: false
    })
  };

  handlePanResponderMove (e, gestureState) {
    const { dx, dy } = gestureState;
    const origin = { x: 0, y: 0, z: -150 };
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

  initposition = () => {
    let dx = 45;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    console.log("matrix init1 : ", matrix)
    console.log("matrixFront init1 : ", matrix)
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, dy);
    console.log("matrix init2 : ", matrix)
    console.log("matrixBack init2 : ",matrix)
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    console.log("matrix init3 : ", matrix)
    console.log("matrixLeft init3 : ", matrix)
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    console.log("matrix init4 : ", matrix)
    console.log("matrixRight init4 : ", matrix)
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

  }

  renderFront = (color) => {
    return (
      <View
        ref={component => this.refViewFront = component}
        style={[styles.front, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  renderBack = (color) => {
    return (
      <View
        ref={component => this.refViewBack = component}
        style={[styles.back, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  renderLeft = (color) => {
    return (
      <View
        ref={component => this.refViewRight = component}
        style={[styles.left, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  renderRight = (color) => {
    return (
      <View
        ref={component => this.refViewLeft = component}
        style={[styles.right, (color) ? {backgroundColor: color} : null]}
      />
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
                      <View style={styles.cubeContainer}>
                      {!this.state.isRunnig ? 
                      <View style={styles.cubeBox}>
                          {this.renderFront('#4c72e0')}
                          {this.renderBack('#8697df')}
                          {this.renderLeft('#b5bce2')}
                          {this.renderRight('#e5afb9')}
                        </View>:null}
                        
                        {this.state.isRunnig ? <Cube/>: null}
                      
                      </View>
                      {/* <Button title="flip x " onPress={() => this.flip('x')} /> */}
                      {/* <Button title="Play" onPress={() => this.flip('y')} /> */}
                      {!this.state.isRunnig ? <View style={styles.submitWrapper} >
                        <TouchableOpacity style={styles.submit} onPress={() => this.playGame()}>
                          <Text style={styles.submitText}>เล่นเกมส์</Text>
                        </TouchableOpacity>
                      </View>:null}                      
                      {this.state.isRunnig ? <View style={styles.submitWrapper} >
                        <TouchableOpacity style={styles.submit} onPress={() => this.stopGame()}>
                          <Text style={styles.submitText}>หยุด</Text>
                        </TouchableOpacity>
                      </View>:null}
                    </View>
                </View>
              <ImageBackground source={require("../assets/images/register/background.png")} style={styles.backgroundImage}  />
              </View>

            <View style={styles.menu}  >
              <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {this.props.navigation.navigate('Home')}}>
                <Image source={require("../assets/images/register/logo_home.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Register')}} >
                <Image source={require("../assets/images/register/logo_register.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => {this.props.navigation.navigate('Game')}}>
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
    },
    cubeContainer: {
      position: 'relative',
      alignItems: 'center', 
      justifyContent: 'center',
      width: 300,
      height: 300,
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
      position: 'absolute',
      left: 0,
      top: 0,
      width: 300,
      height: 300,
      backgroundColor: "transparent"
    },
    front: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      backgroundColor: 'white',
      zIndex: 110,
    },
    back: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      backgroundColor: 'white',
      zIndex: 100,
    },
    left: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      backgroundColor: 'white',
      zIndex: 110,
    },
    right: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      backgroundColor: 'white',
      zIndex: 100,
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
  });
  
