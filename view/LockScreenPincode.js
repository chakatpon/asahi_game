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

    onPress1 = () => {
      console.log(this.props.tag, '1');
    }

    onPress2 = () => {
      console.log(this.props.tag, '2');
    }

    onPress3 = () => {
      console.log(this.props.tag, '3');
    }
    
    onPress4 = () => {
      console.log(this.props.tag, '4');
    }

    onPress5 = () => {
      console.log(this.props.tag, '5');
    }
    
    onPress6 = () => {
      console.log(this.props.tag, '6');
    }

    onPress7 = () => {
      console.log(this.props.tag, '7');
    }

    onPress8 = () => {
      console.log(this.props.tag, '8');
    }

    onPress9 = () => {
      console.log(this.props.tag, '9');
    }
    
    onPressBackSpace = () => {
      console.log(this.props.tag);
    }
    
    onPress0= () => {
      console.log(this.props.tag, '0');
    }
      

    render() {
            return(
            <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/asahi_logo.png")} style={styles.logo}  />
                <View style={styles.wrapper}>
                    <View style={styles.pincodeContainer}>
                        <View style={styles.pincodeBox}>
                            <Text style={styles.pincodeText}>Enter PassCode</Text>
                        </View>
                        <View style={styles.codeContainer}>
                            <View style={styles.code}></View>
                            <View style={styles.code}></View>
                            <View style={styles.code}></View>
                            <View style={styles.code}></View>
                            <View style={styles.code}></View>
                            <View style={styles.code}></View>
                        </View>
                    </View>
                    <View style={styles.panelWrapper}>
                        <View style={styles.buttonContainer} >
                            <View style={styles.row}>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress1}>
                                      <Text style={styles.buttonLabel}>
                                        1
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress2}>
                                      <Text style={styles.buttonLabel}>
                                        2
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress3}>
                                      <Text style={styles.buttonLabel}>
                                        3
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.row}>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress4}>
                                      <Text style={styles.buttonLabel}>
                                        4
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress5}>
                                      <Text style={styles.buttonLabel}>
                                        5
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress6}>
                                      <Text style={styles.buttonLabel}>
                                        6
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.row}>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress7}>
                                      <Text style={styles.buttonLabel}>
                                        7
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress8}>
                                      <Text style={styles.buttonLabel}>
                                        8
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress9}>
                                      <Text style={styles.buttonLabel}>
                                        9
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.row}>
                                <View style={styles.empty}></View>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={this.onPress0}>
                                      <Text style={styles.buttonLabel}>
                                        0
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.empty} >
                                    <TouchableOpacity style={styles.relative} onPress={this.onPress0}>
                                    <Image source={require("../assets/images/asahi_close_btn.png")} style={styles.closeButton}  />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                    </View>
            <ImageBackground source={require("../assets/images/asahi_background.png")} style={styles.backgroundImage}  />

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
    wrapper: {
        height: height,
        width: width,
        resizeMode: 'contain'
    },
    backgroundImage: {
        top: -450,
        height: height,
        width: height,
        resizeMode: 'cover'
    },
    logo: {
        position:"absolute",
        width: width/3,
        top:-70,
        left: 0,
        right: 0,
        resizeMode: 'contain'
    },
    pincodeContainer: {
        marginTop: 120,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: width,
    },
    pincodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: width/2,
    },
    pincodeText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        color: 'gray',
        height: 50,
        width: width/2,
    },
    codeContainer: {
        flex:1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center",
        width: width/2,
    },
    code: {
        width: 13,
        height: 13,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: 'red'
    },

    panelWrapper: {
        height: height/2,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 220,
        height: height/1.8,
        width: width/1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex:1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center",
        height: 80,
        width: width/1.5,

    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonLabel: {
      color: 'red',
      width: 80,
      height: 80,
      borderRadius: 80,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 30,
    },
    empty: {
        width: 80,
        height:80
    },
    relative: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        textAlignVertical: "center",
    },
    closeButton: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    }
  });
  
