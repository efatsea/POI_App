import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {createContext, Component} from 'react';
import { Button, StyleSheet, Text, View ,FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import * as thunk from 'redux-thunk'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Poi from './Poi';
import rootReducer from './rootReducer'


const store = createStore(rootReducer, applyMiddleware(thunk.default));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


//HomeScreen class
const HomeScreen = ({navigation}) =>{

  const location = []

  function handleClick(){
    navigation.navigate('POI')
  }

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Text style={styles.text}>Let's see all the nice and interesting places you can go!</Text>
      <Button style={styles.button}
        title='Let me show you'
        onPress = {()=>handleClick()}
       />
      <StatusBar style="auto" />
    </View>
    )
}


// Wrapper, to connect the redux store
class Wrapper extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator

        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{title: 'PoI App'}}

          />
          <Stack.Screen
            name='POI'
            component={Poi}
             options={{title: 'Points of Interest'}}
          />
        </Stack.Navigator>
      </NavigationContainer>

      )
  }
}
const ConnectedWrapper =connect(state=>({
  data: state.data
}))(Wrapper)



export default class App extends Component {
  //A state to save the location of the user, I try to connect it to redux
  //but it wasn't sucessful 
  state={
    location:null,
    errorMessage:null
  }

  //Find user location and ask permittion when the app starts.

  findCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition(
      position=>{
        const latitude=JSON.stringify(position.coords.latitude);
        const longitute=JSON.stringify(position.coords.longitude);
        this.setState({
          latitude,
          longitude
        });
      },
      {enableHighAccurency:true, timeout:20000, maximunAge:1000}
      )
  }

  findCurrentLocationAsync= async()=>{
    let {status} = await Permissions.askAsync
    (Permissions.LOCATION);

    if(status !=='granted'){
      this.setState({
        errorMessage:'Permission Denied. Some futures may not work'
      })
    }

    let location = await Location.getCurrentPositionAsync({})
    this.setState({location})
  }

  //We invoke the user location finder, when the app starts.
  componentDidMount() {
      this.findCurrentLocationAsync();
  }

  render(){
    return (
      <Provider store={store}>
        <ConnectedWrapper/>
      </Provider>
      
    );
  }
}

//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE9EA',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tab:{
    flex:1,
    backgroundColor: '#78A2CC',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text:{
    color:'#3c2e3d',
    marginBottom:'10%',
    fontWeight:'bold',

  },

});
