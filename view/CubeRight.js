import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
}  from 'three';
import ExpoTHREE, { Renderer, TextureLoader} from 'expo-three';
import { GLView } from 'expo-gl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Device from 'expo-device';

const endpoint  = 'https://asahigame.dev.kanda.digital/api';
const apiKey    = '818EY26UYbZEYPZ76QwH4nVcTCtsLpYMnJQuI7Jn';
const deviceUID = Device.osBuildId;
const deviceName = Device.deviceName+"_expo";



const { width, height } = Dimensions.get('window');
export default class CubeRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpin: false,
      gl : '',
    }
  }

  UNSAFE_componentWillMount () {
    
  }



  _onGLContextCreate = async (gl) => {
    // Do graphics stuff here!
    await AsyncStorage.getItem('@paths')
    .then((data) => {
      const paths = JSON.parse(data)

      console.log("GET PATHS FROM STORE : ", paths)
      this.setState({
        ...this.state,
        paths: paths
      })
      console.log('path', paths);

    });
    const sceneColor = 0x6ad6f0;
    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);
    const camera = new PerspectiveCamera( 75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    const loader = new TextureLoader();
    loader.setCrossOrigin("Anonymous")
    loader.crossOrigin = "Anonymous"
    const paths = [
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png", // 1
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png", // 2
        require("../assets/images/game/cubeSide.png"), // 3 not show
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png", // 4
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png", // 5
        "https://asahigame.dev.kanda.digital/storage/xvK9p1e9ZFzirQDNFKAhqiUbMyjlllh1x0DFOrTA.png"// 6
    ]

  //   Example 
  //   const paths = [
  //     "https://www.dlf.pt/png/list/7/73398_dice-faces-png.png", // 1
  //     "https://www.pinclipart.com/picdir/middle/77-771472_dice-clipart-number-dice-face-3-png-transparent.png", // 2
  //     require("../assets/images/game/cubeSide.png"), // 3 not show
  //     "https://w7.pngwing.com/pngs/931/801/png-transparent-dice-dice-face-text-rectangle-orange.png", // 4
  //     "https://www.pinclipart.com/picdir/middle/21-214197_making-five-side-of-dice-clipart.png", // 5
  //     "https://www.clipartmax.com/png/middle/235-2353386_open-dice-number-6.png"// 6
  // ]

    
    // const materials = []; // an array of materials you'll pass into the constructor of THREE.Mesh
    let materials = await this.state.paths.map(path => {
      console.log('loader.load(path) : ', loader.load(path))
        return new THREE.MeshBasicMaterial({
          map: loader.load(path),
          color: 0xffffff
        });
    });

    const geometry = new BoxBufferGeometry(2, 2, 2);
    const  cube = new Mesh(geometry, materials)
    scene.add(cube);
    camera.position.z = 5;
    renderer.render(scene, camera);
    const animate = () => {
      // cube.rotation.x += 0.07;
      requestAnimationFrame(animate);
      cube.rotation.y += 0.4;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }




  render() {
    return (
      <View style={styles.container}>
        <GLView
          style={{flex:1, zIndex: 100, top: -60 }}
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
