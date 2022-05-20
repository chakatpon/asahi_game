import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE, { Renderer } from 'expo-three';
import { GLView } from 'expo-gl';



const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

const { width, height } = Dimensions.get('window');
export default class App extends Component {
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
    await this.setState({
      ...this.state,
      gl: gl,
      camera: new THREE.PerspectiveCamera( 75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000),
      renderer: new Renderer({ gl })
    })

    const { renderer, scene, camera, cube } = this.state
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera( 75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    // const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    const loader = new THREE.TextureLoader();
    const paths = [
      require("./assets/images/game/kanji1.png"),
      require("./assets/images/game/kanji2.png"),
      require("./assets/images/game/kanji2.png"),
      require("./assets/images/game/kanji1.png"),
      require("./assets/images/game/kanji1.png"),
      require("./assets/images/game/kanji2.png")
    ]

    const materials = []; // an array of materials you'll pass into the constructor of THREE.Mesh
    await paths.forEach(path => {
      materials.push(
        new THREE.MeshBasicMaterial({
          map: loader.load(path)
        }));
    });
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    // const cube1 = new THREE.Mesh(geometry, materials);
    await this.setState({
      ...this.state,
      cube: new THREE.Mesh(geometry, materials)
    })
    scene.add(this.state.cube);
    camera.position.z = 5;
    renderer.render(scene, camera);
    const animate = () => {
      // cube.rotation.x += 0.07;
      // cube.rotation.y += 0.1;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }


  _createAnimate = async () => {
    const { gl, cube, renderer, scene, camera }  = this.state;
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //   75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    // const renderer = new Renderer({ gl });
    // renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // camera.position.z = 5;
    const animate = () => {
      // cube.rotation.x += 0.07;
      if(this.state.isSpin){
        cube.rotation.y = cube.rotation.y - cube.rotation.y;
        this.setState({
          ...this.state,
          isSpin: true
        })
        console.log('this.state.isSpin : ',this.state.isSpin)
      }else {
        cube.rotation.y += 0.1;
        this.setState({
          ...this.state,
          isSpin: false
        })
        console.log('else this.state.isSpin : ',this.state.isSpin)
      }
      
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
        <TouchableOpacity style={styles.spin} onPress={this._createAnimate}><Text>Spin</Text></TouchableOpacity>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    width: width,
    height: height
  },
  screen: {
    width: width,
    height: height,
    zIndex: 100
  },
  spin: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    color: 'white'
  }
});
