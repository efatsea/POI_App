import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {createContext, Component} from 'react';
import { Button, StyleSheet, Text, View ,FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import * as thunk from 'redux-thunk'
import Poi from './Poi';
import rootReducer from './rootReducer'



const store = createStore(rootReducer, applyMiddleware(thunk.default));


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>We will show you all the nice interesting places you can go!</Text>
      <Button
        title='Let me show you'
        onPress = {()=>navigation.navigate('POI')}
       />
      <StatusBar style="auto" />
    </View>
    )
}

class Wrapper extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name='POI'
            component={Poi}
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

  render(){
    return (
      <Provider store={store}>
        <ConnectedWrapper/>
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab:{
    flex:1,
    backgroundColor: '#78A2CC',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
