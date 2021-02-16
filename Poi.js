import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View ,FlatList, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {fetchData} from './poiAction'
import List from './List'


const Tab = createBottomTabNavigator();




const Maps=()=>{
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    	<Text>Map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tab:{
    flex:1,
    backgroundColor: '#78A2CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class Poi extends Component{



	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};


	render(){
		const datas= this.props.data;
		return(
			  	<Tab.Navigator
			        screenOptions={({route})=>({
			          tabBarIcon:({focused})=>{
			            let iconName;
			            if (route.name==='List'){
			              iconName= "list-outline"
			            }
			            else iconName = 'earth-outline'

			            return <Ionicons name={iconName} size={30}/>
			          }
			        })}
			    >
			    	<Tab.Screen
			          name='Map'
			          component={Maps}
			        /> 
			        <Tab.Screen name='List'>
			          {props => <List {...props} data={datas} />}
			        </Tab.Screen>
			
			    </Tab.Navigator>
	    )
	}



};
export default Poi;

  

