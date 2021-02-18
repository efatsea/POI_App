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
import datas from './test_pois.json'

//the list component

class List extends Component {

	componentDidMount() {
	    this.props.dispatch(fetchData());
	}



	render(){
		//An attemt to fetch the position of the user.
		//const {data} = this.props.data;
		//console.log(this.props.locat)

		return (

			<View >
		      <FlatList style={'styles.text'}
		        data={datas}
		        keyExtractor={({id},index)=>id}
		        renderItem={({item})=>(
		          <Text>{item.address}</Text>
		        )}
		      />
			</View>

	  );
	}
  
}

const mapStateToProps = (state)=>{
	return{
		data: state.data,
	}
  
};

export default connect(mapStateToProps)(List);
