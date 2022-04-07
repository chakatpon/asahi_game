
import { createAppContainer }     from 'react-navigation';
import { createStackNavigator }   from '@react-navigation/stack';
import Game                       from '../view/Game';
import Register                   from '../view/Register';
import Home                       from '../view/Home';
import 'react-native-gesture-handler';

const screens = {
  Register: {
    screen: Register
  },
  Home: {
    screen: Home
  },
  Game: {
    screen: Game
  },
  initialRouteName: 'Register',
}

const HomeStack = createStackNavigator(screens)
export default createAppContainer(HomeStack)