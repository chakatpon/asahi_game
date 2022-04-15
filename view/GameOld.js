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
    PanResponder
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
const { width, height } = Dimensions.get('window')
export default function Game({navigation}) {

const rotateXY = (dx, dy) => {
  const radX = (Math.PI / 180) * dy;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);

  const radY = (Math.PI / 180) * -dx;
  const cosY= Math.cos(radY);
  const sinY = Math.sin(radY);

  return [
    cosY, 
    sinX * sinY, 
    cosX * sinY, 
    0,
    0, 
    cosX, 
    -sinX, 
    0,
    -sinY, 
    cosY * sinX, 
    cosX * cosY, 
    0,
    0, 
    0, 
    0, 
    1
  ];
};

const rotateXZ = (dx, dy) => {
  const radX = (Math.PI / 180) * dx;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);

  const radY = (Math.PI / 180) * dy;
  const cosY= Math.cos(radY);
  const sinY = Math.sin(radY);

  return [
    cosX, 
    -cosY * sinX, 
    sinX * sinY, 
    0,
    sinX, 
    cosX * cosY,
    -sinY * cosX,
    0,
    0, 
    sinY, 
    cosY, 
    0,
    0, 
    0, 
    0, 
    1
  ];
};

const transformOrigin = (matrix, origin) => {
  const { x, y, z } = origin;

  const translate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  MatrixMath.multiplyInto(matrix, translate, matrix);

  const untranslate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
  MatrixMath.multiplyInto(matrix, matrix, untranslate);
};

  const refViewFront = useRef();
  const refViewBack = useRef();
  const refViewLeft = useRef();
  const refViewRight = useRef();
  // const [matrixFront, setMatrixFront] = useState(rotateXY(45, 0));
  // const [matrixBack, setMatrixBack] = useState(rotateXY(225, 0));
  // const [matrixLeft, setMatrixLeft] = useState(rotateXY(-45, 0));
  // const [matrixRight, setMatrixRight] = useState(rotateXY(135, 0));

  // const matrixFront = useRef(rotateXY(45, 0)).current;
  // const matrixBack  = useRef(rotateXY(225, 0)).current;
  // const matrixLeft  = useRef(rotateXY(-45, 0)).current;
  // const matrixRight = useRef(rotateXY(135, 0)).current;

  const matrixFront  = useSharedValue(rotateXY(45, 0));
  const matrixBack   = useSharedValue(rotateXY(225, 0));
  const matrixLeft   = useSharedValue(rotateXY(-45, 0));
  const matrixRight  = useSharedValue(rotateXY(135, 0));
  
  console.log('matrixFront First : ', matrixFront);
  console.log('matrixBack First : ', matrixBack);
  console.log('matrixLeft First : ', matrixLeft);
  console.log('matrixRight First : ', matrixRight);

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
  },
  cubeBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
  },
  cubeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
  },
  cubeRight: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    zIndex: 110,
  }
});


  useEffect(() => {
    initposition();
  })


  const initposition = () => {
    let dx = 45;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    console.log("matrix init1 : ", matrix)
    console.log("matrixFront init1 : ", matrixFront.value)
    transformOrigin(matrixFront.value, origin);
    refViewFront.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixFront.value}]}});

    matrix = rotateXY(dx + 180, dy);
    console.log("matrix init2 : ", matrix)
    console.log("matrixBack init2 : ", matrixBack.value)
    transformOrigin(matrixBack.value, origin);
    refViewBack.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixBack.value}]}});

    matrix = rotateXY(dx - 90, dy);
    console.log("matrix init3 : ", matrix)
    console.log("matrixLeft init3 : ", matrixLeft.value)
    transformOrigin(matrixLeft.value, origin);
    refViewLeft.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixLeft.value}]}});

    matrix = rotateXY(dx + 90, dy);
    console.log("matrix init4 : ", matrix)
    console.log("matrixRight init4 : ", matrixRight.value)
    transformOrigin(matrixRight.value, origin);
    refViewRight.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixRight.value}]}});

  }

  const playGame = () => {
    let dx = 135 ;
    let dy = 0;
    const origin = { x: 0, y: 0, z: -164 };
    let matrix = rotateXY(dx, dy);
    console.log("matrix play1 : ", matrix)
    console.log("matrixFront play1 : ", matrixFront.value)
    transformOrigin(matrixFront.value, origin);
    refViewFront.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixFront.value}]}});

    matrix = rotateXY(dx + 180, dy);
    console.log("matrix play2 : ", matrix)
    console.log("matrixBack play2 : ", matrixBack.value)
    transformOrigin(matrixBack.value, origin);
    refViewBack.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixBack.value}]}});

    matrix = rotateXY(dx - 90, dy);
    console.log("matrix play3 : ", matrix)
    console.log("matrixLeft play3 : ", matrixLeft.value)
    transformOrigin(matrixLeft.value, origin);
    refViewLeft.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixLeft.value}]}});

    matrix = rotateXY(dx + 90, dy);
    console.log("matrix play4 : ", matrix)
    console.log("matrixRight play4 : ", matrixRight.value)
    transformOrigin(matrixRight.value, origin);
    refViewRight.current.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrixRight.value}]}});


  }

  const renderFront = (color) => {
    return (
      <Animated.View
        ref={refViewFront}
        style={[styles.cubeFront, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  const renderBack = (color) => {
    return (
      <Animated.View
        ref={refViewBack}
        style={[styles.cubeBack, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  const renderLeft = (color) => {
    return (
      <Animated.View
        ref={refViewRight}
        style={[styles.cubeLeft, (color) ? {backgroundColor: color} : null]}
      />
    )
  }

  const renderRight = (color) => {
    return (
      <Animated.View
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
