import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import MapDetails from '../screens/mapDetails';

const screens = {
Home: {
    screen: Home
},
MapDetails: {
    screen: MapDetails
},
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);