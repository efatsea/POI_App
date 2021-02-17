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
import List from './List'
import MapView, {Marker} from 'react-native-maps'
import dat from './test_pois' 


const Tab = createBottomTabNavigator();




class Maps extends Component {
  
	mapMarker = () =>{
  	// dat.map((data)=>{
  	 	return(
	  			//<Marker
			  	//	key={data.id}
			  	//	coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }}
			  	///>	
			  	<MapView.Marker  coordinate={{latitude: 37.78825, longitude: 38.8888}}/>  	
	  	)
	 //})
  }

  render(){
  	return (
    <MapView
        style={{flex: 1}} 
        region={{latitude: 37.9838,longitude: 23.7275, latitudeDelta: 10.0922,longitudeDelta: 10.0421 }} 
        showsUserLocation={true} 
    >
    	{this.mapMarker()}  
    </MapView>
  );
  }
  
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

  

