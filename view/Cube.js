import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE, { Renderer } from 'expo-three';
import { GLView } from 'expo-gl';



const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ opacity: 0.5});

const { width, height } = Dimensions.get('window');
export default class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpin: false,
      gl : '',
      scene: new THREE.Scene(),
      camera: '',
      cube: new THREE.Mesh(geometry, material),
      renderer: ''
    }
  }

  _onGLContextCreate = async (gl) => {
    // Do graphics stuff here!
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    const loader = new THREE.TextureLoader();
    const paths = [
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png",
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png",
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png",
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png",
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png",
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png"
    ]

    const materials = []; // an array of materials you'll pass into the constructor of THREE.Mesh
    await paths.forEach(path => {
      materials.push(
        new THREE.MeshBasicMaterial({
          map: loader.load(path),
          color: 0xffffff
        }));
    });
    const geometry = new THREE.BoxBufferGeometry(2.2, 2.2, 2.2);

    const  cube = new THREE.Mesh(geometry, materials)
    scene.add(cube);
    camera.position.z = 5;
    renderer.render(scene, camera);
    const animate = () => {
      // cube.rotation.x += 0.07;
      cube.rotation.y += 0.1;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }




  render() {
    return (
      <View style={styles.container}>
        <GLView
          style={{flex:1, zIndex: 100 }}
          onContextCreate={this._onGLContextCreate}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: width,
    height: height
  },
  screen: {
    width: width,
    height: height,
    zIndex: 100
  }
});
