import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Text
} from 'react-native';
const { width, height } = Dimensions.get('window')
export default class LockScreenPinCode extends Component {

    render() {
            return(
            <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/asahi_logo.png")} style={styles.logo}  />
                <ImageBackground source={require("../assets/images/asahi_background.png")} style={styles.backgroundImage}  />
                <View style={styles.pincodeContainer}>
                    <View>
                        <Text style={styles.pincodeText}>Enter PinCode</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
        height: height,
        width: width,
    },
    logo: {
        position:"absolute",
        width: width/3,
        top:-60,
        left: 0,
        right: 0,
        resizeMode: 'contain'
    },
    pincodeContainer: {
        marginTop: 75
    },
    pincodeText: {
        color: '#fff'
    }
  });
  
