import React, {Component ,useState} from 'react';
import { render } from 'react-dom';
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

  constructor(props){
    super();
    this.state = {
      pincode: ['','','','','','']
    };
  }
  //  [pincode, setPincode] = useState([])

     onPress1 = () =>  {
      console.log("press button ", '1');
      this.typePincode('1');
    }

     onPress2 = () =>  {
      console.log("press button ", '2');
      this.typePincode('2');
    }

     onPress3 = () =>  {
      console.log("press button ", '3');
      this.typePincode('3');
    }
    
     onPress4 = () =>  {
      console.log("press button ", '4');
      this.typePincode('4');
    }

     onPress5 = () =>  {
      console.log("press button ", '5');
      this.typePincode('5');
    }
    
     onPress6 = () =>  {
      console.log("press button ", '6');
      this.typePincode('6');
    }

     onPress7 = () => {
      console.log("press button ", '7');
      this.typePincode('7');
    }

     onPress8 = () => {
      console.log("press button ", '8');
      this.typePincode('8');
    }

     onPress9 = () => {
      console.log("press button ", '9');
      this.typePincode('9');
      console.log("this.state.pincode : ", this.state.pincode)
    }
    
     onPress0 = () => {
      console.log("press button ", '0');
      this.typePincode('0')
    }

     onPressBackSpace = () => {
      console.log("press button backspace");
      this.removePinCode();
    }

     typePincode = (num) => {
       let tempcode = this.state.pincode;
       for(let i = 0; i < tempcode.length; i++) {
         if(tempcode[i] == ''){
           tempcode[i] = num;
           break;
         }else {
           continue;
         }
       }
       this.setState({pincode: tempcode});

      console.log("this.state.pincode : ", this.state.pincode)
    }

     removePinCode = () => {
      let tempcode = this.state.pincode;
      for(let i = (tempcode.length-1); i >= 0; i--) {
        if(tempcode[i] != ''){
          tempcode[i] = '';
          break;
        }else {
          continue;
        }
      }
      this.setState({pincode: tempcode});

     console.log("this.state.pincode : ", this.state.pincode)
    }

     renderCode = () => {
      let codes = [] 
      for(let i=0; i < 6; i++){
        if(pincode[i]) {
          codes.push((<View key={i} style={styles.code2}></View>));
          continue;
        }else {
          codes.push((<View key={i} style={styles.code1}></View>));
          continue;
        }
      }
      return codes
    }
      
    render() {
        return <SafeAreaView style={styles.container}>
                <Image source={require("../assets/images/pincode/asahi_logo.png")} style={styles.logo}  />
                <View style={styles.wrapper}>
                    <View style={styles.pincodeContainer}>
                        <View style={styles.pincodeBox}>
                            <Text style={styles.pincodeText}>Enter PassCode</Text>
                        </View>
                        <View style={styles.codeContainer}>
                          {this.state.pincode.map((pin,i)=> {
                            let style = (pin != '') ? styles.code2 : styles.code1;
                            return <View key={i} style={style}></View>
                          })}
                        </View>
                    </View>
                    <View style={styles.panelWrapper}>
                        <View style={styles.buttonContainer} >
                            <View style={styles.row}>
                                    <TouchableOpacity style={styles.touch} onPress={this.onPress1}>
                                      <Text style={styles.buttonLabel}>
                                        1
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touch} onPress={this.onPress2}>
                                      <Text style={styles.buttonLabel}>
                                        2
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress3}>
                                      <Text style={styles.buttonLabel}>
                                        3
                                      </Text>
                                    </TouchableOpacity>
                            </View>


                            <View style={styles.row}>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress4}>
                                      <Text style={styles.buttonLabel}>
                                        4
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress5}>
                                      <Text style={styles.buttonLabel}>
                                        5
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress6}>
                                      <Text style={styles.buttonLabel}>
                                        6
                                      </Text>
                                    </TouchableOpacity>
                            </View>


                            <View style={styles.row}>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress7}>
                                      <Text style={styles.buttonLabel}>
                                        7
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress8}>
                                      <Text style={styles.buttonLabel}>
                                        8
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress9}>
                                      <Text style={styles.buttonLabel}>
                                        9
                                      </Text>
                                    </TouchableOpacity>
                            </View>


                            <View style={styles.row}>
                                <View style={styles.empty}></View>
                                    <TouchableOpacity style={styles.touch}  onPress={this.onPress0}>
                                      <Text style={styles.buttonLabel}>
                                        0
                                      </Text>
                                    </TouchableOpacity>
                                <View style={styles.empty} >
                                    <TouchableOpacity style={styles.relative} onPress={this.onPressBackSpace}>
                                    <Image source={require("../assets/images/pincode/asahi_close_btn.png")} style={styles.closeButton}  />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                    <ImageBackground source={require("../assets/images/pincode/asahi_background.png")} style={styles.backgroundImage}  />
                    </View>

                </View>

            </SafeAreaView>;
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
        top: -300  ,
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
        resizeMode: 'contain'
    },
    pincodeContainer: {
        marginTop: 240,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
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
    code1: {
        width: 13,
        height: 13,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: 'red'
    },

    code2: {
      width: 13,
      height: 13,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: 'red',
      backgroundColor: 'red'
  },

    panelWrapper: {
        height: height/2,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: -300,
        height: height/1.8,
        width: width,
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
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 30,
    },
    empty: {
        width: 120,
        height: 120
    },
    relative: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        textAlignVertical: "center",
        zIndex: 10
    },
    touch: {
      width: 120,
      height: 120,
      borderRadius: 120,
      borderWidth: 2,
      borderColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    },
    closeButton: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        zIndex: 10
    }
  });
  
