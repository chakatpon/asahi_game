import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

export default class Pincode extends Component {

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
  
  onPressHideKeyboard = () => {
    console.log(this.props.tag);
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: "row"}}>
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
        <View style={{flexDirection: "row"}}>
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
        <View style={{flexDirection: "row"}}>
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
        <View style={{flexDirection: "row"}}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressBackSpace}>
              <Text style={styles.buttonLabel}>
                &larr;
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPress0}>
              <Text style={styles.buttonLabel}>
                0
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onPressHideKeyboard}>
              <Text style={styles.buttonLabel}>
                &crarr;
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "grey",
    width: 270,
    fontSize: 19,
  },
  buttonLabel: {
    color: '#fff',
    width:60,
    height: 60,
    borderWidth: 1,
    borderColor: "#d6d7da",
    borderRadius: 60,
    padding: 10,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
  },
  button: {
    width:60,
    height: 60,
    margin: 10
  },
});