import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './Home';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const UsersManager = StackNavigator({
	Home: { screen: HomeScreen },
	Login: { screen: Login },
	Register: {screen: Register},
	Home: {screen: Home}
	
 });
export default UsersManager;