import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {createContext, Component} from 'react';
import { Button, StyleSheet, Text, View ,FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Poi from './Poi';

const rootReducer = (state={}, action) => {
  return state
}

const store = createStore(rootReducer)




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


export default class App extends Component {


  render(){
    return (
      <Provider store={store}>
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
