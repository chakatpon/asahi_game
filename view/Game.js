import react, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Text,
    PanResponder,
} from 'react-native';
const { width, height } = Dimensions.get('window')

export default function Game () {

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove.bind(this)
    });

    function handlePanResponderMove(e, gestureState) {
        const {dx, dy} = gestureState;
        const y = `${dx}deg`;
        const x = `${-dy}deg`;
        this.refView.setNativeProps({style: {transform: [{perspective: 1000}, {rotateX: x}, {rotateY: y}]}});
      }

      return (
        <View >
            <TouchableOpacity {...panResponder} style={styles.cube}>
                <View style={styles.front}></View>
                <View style={styles.right}></View>
                <View style={styles.back}></View>
                <View style={styles.left}></View>
            </TouchableOpacity>
        </View>
      );
  }

const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      width: width,
      perspective: 800,
      perspectiveOrigin: "bottom left",
    },
    cube: {
      width: 200,
      height: 200,
      position: "relative",
      transformStyle: 'preserve-3d',
      animation: "spin 12s linear infinite",
      translateX: -100,
      translateY: -100,
      rotate: '45deg',
      translateX: 100,
      translateY: 100
      
    },
    front: {
        position: "absolute",
        width: 200,
        height: 200,
        translateZ: 100,
        backgroundColor: 'red'
    },
    right: {
        position: "absolute",
        width: 200,
        height: 200,
        // transform: [{rotateY: '-270deg' },{translateX: 150}],
        rotateY: '-270deg',
        translateX: 100,
        backgroundColor: 'blue'

    },
    back: {
        position: "absolute",
        width: 200,
        height: 200,
        // transform: [{rotateY:'180deg'}],
        translateZ: 100,
        rotateY: '180deg',
        backgroundColor: 'green'

    },
    left: {
        position: "absolute",
        width: 200,
        height: 200,
        // transform: [{rotateY: '270deg' },{translateX: -150}],
        rotateY: '270deg',
        translateX: -100,
        backgroundColor: 'yellow'

    }
  }
  

//   .front{
//     transform: translateZ(150px);
// }
// .right{
//     transform: rotateY(-270deg) translateX(150px);
//     transform-origin: 100% 0;
// }
// .back{
//     transform: translateZ(-150px) rotateY(180deg);
// }
// .left{
//     transform: rotateY(270deg) translateX(-150px);
//     transform-origin: 0 50%;
// }

