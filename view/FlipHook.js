import React, {Component} from 'react';
import {View, Animated, StyleSheet, Button} from 'react-native';

export default class Container extends Component {
  constructor() {
    super();
    this.animation = new Animated.ValueXY({x: 0, y: 0});
    const inputRange = [0, 10];
    const outputRange = ['0deg', '360deg'];
    this.rotateX = this.animation.x.interpolate({inputRange, outputRange});
    this.rotateY = this.animation.y.interpolate({inputRange, outputRange});
  }
  flip = (val) => {
    this.animation[val].setValue(0);
    Animated.timing(this.animation[val], {
      toValue: 10,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };
  render() {
    const {rotateX, rotateY} = this;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...styles.item,
            transform: [{rotateX}, {rotateY}, {perspective: 500}],
          }}
        />
        <Button title="flip x " onPress={() => this.flip('x')} />
        <Button title="flip y " onPress={() => this.flip('y')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  item: {
    height: 200,
    width: 200,
    backgroundColor: 'red',
    marginBottom: 20,
  },
});