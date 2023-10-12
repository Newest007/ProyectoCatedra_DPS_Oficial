import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import Login from './components/login';
import Principal from './components/Principal';
import Splash from './components/Splash';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //<Splash/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Splash'} component={Splash}  options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} /*options={{headerShown: false}}*//>
        <Stack.Screen name="Principal" component={Principal} /*options={{headerShown: false}}*//>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
