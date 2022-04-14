import React, {Component, useState, useEffect, useRef} from 'react';
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
export default function Game({navigation}) {
  const refViewFront = useRef();
  const refViewBack = useRef();
  const refViewLeft = useRef();
  const refViewRight = useRef();
  const [matrixFront, setMatrixFront] = useState(rotateXY(0, 0));
  const [matrixBack, setMatrixBack] = useState(rotateXY(180, 0));
  const [matrixLeft, setMatrixLeft] = useState(rotateXY(-90, 0));
  const [matrixRight, setMatrixRight] = useState(rotateXY(90, 0));

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
  },
  cubeFront: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
    //transform: [{perspective: 1000}, {matrix: matrixFront}]
  },
  cubeBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
    //transform: [{perspective: 1000}, {matrix: matrixBack}]
  },
  cubeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
    //transform: [{perspective: 1000}, {matrix: matrixLeft}]
  },
  cubeRight: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
    //transform: [{perspective: 1000}, {matrix: matrixRight}]
  }
});


  useEffect(() => {
    initposition();
  })

  // useEffect(() => {
  //   Animated.timing(
  //     matrixFront,
  //     {
  //       toValue: rotateXY(0,0),
  //       duration: 1500,
  //     }
  //   ).start();
  // }, [matrixFront])

  const initposition = () => {
    let dx = 45;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    refViewFront.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});
    //console.log("refVidwFront : ", refViewFront.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}}))

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    refViewBack.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    refViewRight.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    refViewLeft.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

  }

  const playGame = () => {
    let dx = 135 ;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    refViewFront.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});
    
    matrix = rotateXY(dx+180, dy);
    transformOrigin(matrix, origin);
    refViewBack.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx+90, dy);
    transformOrigin(matrix, origin);
    refViewRight.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx-90, dy);
    transformOrigin(matrix, origin);
    refViewLeft.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});


  }

  const renderFront = (color) => {
    return (
      <View
        ref={refViewFront}
        style={[styles.cubeFront, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  const renderBack = (color) => {
    return (
      <View
        ref={refViewBack}
        style={[styles.cubeBack, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  const renderLeft = (color) => {
    return (
      <View
        ref={refViewRight}
        style={[styles.cubeLeft, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  const renderRight = (color) => {
    return (
      <View
        ref={refViewLeft}
        style={[styles.cubeRight, (color) ? {backgroundColor: color} : null]}
      />
    )
  }




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
                              {renderFront('#4c72e0')}
                              {renderBack('#8697df')}
                              {renderLeft('#b5bce2')}
                              {renderRight('#e5afb9')}
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
                      <TouchableOpacity style={styles.seletedMenuItem} onPress={() => {playGame()}}>
                        <Image source={require("../assets/images/register/logo_game.png")}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Search')}}>
                        <Image source={require("../assets/images/register/logo_search.png")}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Home')}}>
                        <Image source={require("../assets/images/register/logo_logout.png")}/>
                      </TouchableOpacity>
                    </View>

                  </View>

              </SafeAreaView>
          );
}
