import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
//import Login from './components/login';
import PagInicio from './Inicio';
import Search from './Search';
//import Account from './components/account';


//Para react navigation bottom
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export default function Principal() {

  const Tab = createBottomTabNavigator();
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#2c278d', borderRadius: 5, },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#9f9ea7',
      }}>

      <Tab.Screen 
        name="Inicio" 
        component={PagInicio}
        options={{
        tabBarIcon: ({ color, size }) => (                  
            <FontAwesomeIcons name="home" color={color} size={size} />   
          ),
        }}
      />

      <Tab.Screen 
      name="Buscar" 
      component={Search} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="search" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="Ajustes" component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="cog" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="Cuenta" component={Search} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="user-o" color={color} size={size} />
          ),
        }}
      />
       
    </Tab.Navigator>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});