import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import AttendanceScreen from './screens/AttendanceScreen'
import TotalStudentScreen from './screens/TotalStudentScreen'

export default class App extends React.Component{
  
  render(){
  return (
    <View>
    <AppContainer/>
    </View>
  )}}

  var appNavigator=createSwitchNavigator({
  AttendanceScreen:AttendanceScreen,
  TotalStudentScreen:TotalStudentScreen
})
const AppContainer=createAppContainer(appNavigator)
