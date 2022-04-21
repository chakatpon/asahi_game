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
    Animated
} from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
const { width, height } = Dimensions.get('window')

const rotateXY = (dx, dy) => {
  const radX = (Math.PI / 180) * dy;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);

  const radY = (Math.PI / 180) * -dx;
  const cosY= Math.cos(radY);
  const sinY = Math.sin(radY);

  return [
    cosY, sinX * sinY, cosX * sinY, 0,
    0, cosX, -sinX, 0,
    -sinY, cosY * sinX, cosX * cosY, 0,
    0, 0, 0, 1
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
  cosX, -cosY * sinX, sinX * sinY, 0,
  sinX, cosX * cosY, -sinY * cosX, 0,
  0, sinY, cosY, 0,
  0, 0, 0, 1
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
export default class Game extends Component {
  constructor(props){
    super(props);
    this.animation = new Animated.ValueXY({x: 0, y: 0});

    // Origin Front
    this.dFX = 45;
    this.dFY = 0;
    this.originFront = { x: 0, y: 0, z: -170 };
    this.matrixFront = rotateXY(this.dFX, this.dFY);

    // Origin Back
    this.dBX = 225;
    this.dBY = 0;
    this.originBack = { x: 0, y: 0, z: -170 };
    this.matrixBack = rotateXY(this.dBX, this.dBY);

    // Origin Left
    this.dLX = -45;
    this.dLY = 0;
    this.originLeft = { x: 0, y: 0, z: -170 };
    this.matrixLeft = rotateXY(this.dLX, this.dLY);

    // Origin Back
    this.dRX = 135;
    this.dRY = 0;
    this.originRight = { x: 0, y: 0, z: -170 };
    this.matrixRight = rotateXY(this.dRX, this.dRY);

    // Front
    let inputRange = [0, 16];
    let outputRange = ['0deg', '3600deg'];
    this.rotateFrontX = this.animation.x.interpolate({inputRange, outputRange});

    inputRange = [0, 16];
    outputRange = ['45deg', '3645deg'];
    this.rotateFrontY = this.animation.y.interpolate({inputRange, outputRange});

    // Back
    inputRange = [0, 16];
    outputRange = ['0deg', '3600deg'];
    this.rotateBackX = this.animation.x.interpolate({inputRange, outputRange});

    inputRange = [0, 16];
    outputRange = ['225deg', '3825deg'];
    this.rotateBackY = this.animation.y.interpolate({inputRange, outputRange});

    // Left
    inputRange = [0, 16];
    outputRange = ['0deg', '3600deg'];
    this.rotateLeftX = this.animation.x.interpolate({inputRange, outputRange});

    inputRange = [0, 16];
    outputRange = ['-45deg', '3555deg'];
    this.rotateLeftY = this.animation.y.interpolate({inputRange, outputRange});

    // Right
    inputRange = [0, 16];
    outputRange = ['0deg', '3600deg'];
    this.rotateRightX = this.animation.x.interpolate({inputRange, outputRange});

    inputRange = [0, 16];
    outputRange = ['135deg', '3735deg'];
    this.rotateRightY = this.animation.y.interpolate({inputRange, outputRange});
    this.state = {};
  }


  UNSAFE_componentWillMount() {
    const { 
            matrixFront,
            matrixBack,
            matrixLeft,
            matrixRight,
            originFront,
            originBack,
            originLeft,
            originRight
                        } = this

    transformOrigin(matrixFront,    originFront);
    // this.refViewFront.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixFront}]}});
    transformOrigin(matrixBack,     originBack);
    // this.refViewBack.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixBack}]}});
    transformOrigin(matrixLeft,     originLeft);
    // this.refViewLeft.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixLeft}]}});
    transformOrigin(matrixRight,    originRight);
    // this.refViewRight.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixRight}]}});

  }

  componentDidMount() {
    const { 
            matrixFront,
            matrixBack,
            matrixLeft,
            matrixRight,
            originFront,
            originBack,
            originLeft,
            originRight
                        } = this

    //transformOrigin(matrixFront,    originFront);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixFront}]}});
    // transformOrigin(matrixBack,     originBack);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixBack}]}});
    // transformOrigin(matrixLeft,     originLeft);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixLeft}]}});
    // transformOrigin(matrixRight,    originRight);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixRight}]}});
  }

  flip = (val) => {
    // Origin Front
    const dFX = 0;
    const dFY = 0;
    const originFront = { x: 0, y: 0, z: -160 };
    const matrixFront = rotateXY(dFX, dFY);

    // Origin Back
    const dBX = 180;
    const dBY = 0;
    const originBack = { x: 0, y: 0, z: -160 };
    const matrixBack = rotateXY(dBX, dBY);

    // Origin Left
    const dLX = -90;
    const dLY = 0;
    const originLeft = { x: 0, y: 0, z: -160 };
    const matrixLeft = rotateXY(dLX, dLY);

    // Origin Back
    const dRX = 90;
    const dRY = 0;
    const originRight = { x: 0, y: 0, z: -160 };
    const matrixRight = rotateXY(dRX, dRY);

    transformOrigin(matrixFront,    originFront);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixFront}]}});
    transformOrigin(matrixBack,     originBack);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixBack}]}});
    transformOrigin(matrixLeft,     originLeft);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixLeft}]}});
    transformOrigin(matrixRight,    originRight);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 500}, {matrix: matrixRight}]}});

    this.animation[val].setValue(0);

    Animated.timing(this.animation[val], {
      toValue: 32,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    this.animation[val].setValue(0);
    Animated.timing(this.animation[val], {
      toValue: 33,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { rotateFrontX,   rotateFrontY,   matrixFront,
            rotateBackX,    rotateBackY,    matrixBack,
            rotateLeftX,    rotateLeftY,    matrixLeft,
            rotateRightX,   rotateRightY,   matrixRight } = this;
    return(
      <SafeAreaView style={styles.container}>
          <Image source={require("../assets/images/register/asahi_logo.png")} style={styles.logo}  />
          <View style={styles.wrapper}>
              <View style={styles.panelWrapper}>
                <View style={styles.registerContainer}>
                    <View style={styles.registerBox}>
                    <View style={styles.cubeContainer}>
                      <Animated.View
                        ref={component => this.refViewFront = component}
                        style={{
                          ...styles.front,
                          transform: [{rotateX: rotateFrontX}, {rotateY: rotateFrontY}, {perspective: 500}],
                        }}>
                            <Image style={styles.image2}  source={require("../assets/images/game/Kanji2.png")}/></Animated.View>
                      <Animated.View
                        ref={component => this.refViewBack = component}
                        style={{
                          ...styles.back,
                          transform: [{rotateX: rotateBackX}, {rotateY: rotateBackY}, {perspective: 500}],
                        }}
                      >
                      <Image style={styles.image2}  source={require("../assets/images/game/Kanji2.png")}/></Animated.View>
                      <Animated.View
                        ref={component => this.refViewLeft = component}
                        style={{
                          ...styles.left,
                          transform: [{rotateX: rotateLeftX}, {rotateY: rotateLeftY}, {perspective: 500}],
                        }}
                      >
                      <Image style={styles.image1}  source={require("../assets/images/game/Kanji1.png")}/></Animated.View>
                      <Animated.View
                        ref={component => this.refViewRight = component}
                        style={{
                          ...styles.right,
                          transform: [{rotateX: rotateRightX}, {rotateY: rotateRightY}, {perspective: 500}],
                        }}
                      >
                      <Image style={styles.image1}  source={require("../assets/images/game/Kanji1.png")}/></Animated.View>
                      
                      </View>
                      {/* <Button title="flip x " onPress={() => this.flip('x')} /> */}
                      {/* <Button title="Play" onPress={() => this.flip('y')} /> */}
                      <View style={styles.submitWrapper} >
                        <TouchableOpacity style={styles.submit} onPress={() => this.flip('y')}>
                          <Text style={styles.submitText}>เล่นเกมส์</Text>
                        </TouchableOpacity>
                      </View>
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
  
