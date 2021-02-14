import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View ,FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <Text h1>Welcome!</Text>
      <Text h3>We will show you all the nice interesting places you can go!</Text>
      <Button
        title='Let me show you'
        onPress = {()=>navigation.navigate('POI')}
       />
      <StatusBar style="auto" />
    </View>
    )
}


const List=()=> {
  const dataPoi = () => {
    return fetch('https://warply.s3.amazonaws.com/data/test_pois.json')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });

  };
  
  return (
    <View style={styles.tab}>
      <FlatList
        data={dataPoi}
        keyExtractor={({id},index)=>id}
        renderItem={({item})=>(
          <Text>{item.address}</Text>
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

const Poi = ()=>{
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
          name='List'
          component={List}
        />
        <Tab.Screen
          name='Map'
          component={Maps}
        /> 
      </Tab.Navigator>
   
  )
}



export default function App() {




    return (
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
      
    );
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
