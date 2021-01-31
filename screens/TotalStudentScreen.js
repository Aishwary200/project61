import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import db from '../config';

export default class TotalStudentScreen extends React.Component{
  render(){
    return(
      <View>
    <Text style={{backgroundColor:'yellow',fontStyle:'bold',fontSize:20,paddingLeft:85,height:50,paddingTop:10,marginTop:50}}>Message Submited</Text>
      </View>
    )
  }
  
}