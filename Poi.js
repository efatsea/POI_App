import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View ,FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


const Tab = createBottomTabNavigator();


const List=({data})=> {
  return (

		<View style={styles.tab}>
	      <FlatList
	        data={data}
	        keyExtractor={({id},index)=>id}
	        renderItem={({item})=>(
	          <Text>{item.address}, {item.id}</Text>
	        )}
	      />
		</View>

  );
}

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

export default class Poi extends Component{

	constructor(props){
		super(props);
		this.state={
			data:[],
			isLoading: true
		};
	}


	componentDidMount() {
	    fetch('https://warply.s3.amazonaws.com/data/test_pois.json')
	      .then((response) => response.json())
	      .then((json) => {
	        this.setState({ data: json });
	      })
	      .catch((error) => console.error(error))
	      .finally(() => {
	        this.setState({ isLoading: false });
	      });
	  }

	render(){
		const datas= this.state.data;
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

		        <Tab.Screen name='List'>
		          {props => <List {...props} data={datas} />}
		          
		        </Tab.Screen>
		        <Tab.Screen
		          name='Map'
		          component={Maps}
		        /> 
		      </Tab.Navigator>
		    
	    )
	}



};