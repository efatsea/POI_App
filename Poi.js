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


//There was an error fetcing the datas from the url(denied access), so I fetch them from the file.
const Tab = createBottomTabNavigator();

// The map screen
class Maps extends Component {
  
  render(){
  	const data =dat;
  	return (
	    <MapView
	        style={{flex: 1}} 
	        region={{latitude: 37.9838,longitude: 23.7275, latitudeDelta: 10.0922,longitudeDelta: 10.0421 }} 
	        showsUserLocation={true} 
	    >
	    {
	    	data.map((d)=>{
	    		if(d.longitude && d.latitude){
	    			return(
						<Marker
					  		key={d.id}
					  		coordinate={{ latitude: parseFloat(d.latitude), longitude: parseFloat(d.longitude) }}
				 		/>
				 	)
	    		}
	  	 		
			 })
	    }  
    	</MapView>
   );
  }
  
}
const ConnectedList = connect(state => ({ position: state.position }))(List);

//The class that hold the tabs of Map and List
class Poi extends Component{

	render(){
		const datas= this.props.data;
		return(
			  	<Tab.Navigator style={'styles.tab'}
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
  

