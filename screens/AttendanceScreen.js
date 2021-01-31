import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Button } from 'react-native';
import db from '../config';

export default class AttendanceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      attendance: [],
      buttonColor: 'white',
      buttonColor2: 'white',
      presentPressedList: [],
      absentPressedList: [],
    };
  }
  showAttendance = () => {
    var classRef = db.ref('attendance/');
    classRef.on('value', (data) => {
      var allStudents = [];
      var classA = data.val();
      for (var i in classA) {
        allStudents.push(classA[i]);
      }
      allStudents.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({
        attendance: allStudents,
      });
    });
  };
  componentDidMount() {
    this.showAttendance();
  }
  changeColor = (roll_no, status) => {
    var color = '#006400';
    this.setState({
      buttonColor: color,
      buttonColor2: 'red',
    });
  };
  updateAttendance(roll_no,status){
    var id=''
    if(roll_no<=9){
      id='0'+roll_no
    } else{
      id=roll_no
    }
    var today=new Date();
    var date=today.getDate();
    var month=today.getMonth()+1;
    var year=today.getFullYear()
    if(date<10){
      date='0'+date
    }
    if(month<10){
      month='0'+month
    }
    today=date+'-'+month+'-'+year;
    var ref_path=id
    var class_ref=db.ref('attendance/'+ref_path)
    class_ref.update({
      [today]:status,
    })
  }
  goToTotalScreen=()=>{
    this.props.navigation.navigate('TotalStudentScreen')
  }
  render() {
    console.log(this.state.attendance[0]);
    return (
      <View>
        {this.state.attendance.map((student, i) => (
          <View key={i}>
            <View key={'name' + i} style={{ marginTop: 10 }}>
              {student.roll_no}. {student.name}
            </View>
            <TouchableOpacity
              style={
                this.state.presentPressedList.includes(i)
                  ? [styles.presentButton, { backgroundColor: 'green' }]
                  : styles.presentButton
              }
              onPress={() => {
                var presentPressedList = this.state.presentPressedList;
                presentPressedList.push(i);
                this.setState({ presentPressedList: presentPressedList });
                var roll_no = i + 1;
                this.changeColor(roll_no, 'present');
                this.updateAttendance(roll_no,'present')
              }}>
              Present
            </TouchableOpacity>
            <TouchableOpacity style={
                this.state.absentPressedList.includes(i)
                  ? [styles.absentButton, { backgroundColor: 'red' }]
                  : styles.absentButton
              }
              onPress={() => {
                var absentPressedList = this.state.absentPressedList;
                absentPressedList.push(i);
                this.setState({ absentPressedList: absentPressedList });
                var roll_no = i + 1;
                this.changeColor(roll_no, 'absent');
                this.updateAttendance(roll_no,'absent')
              }}>
              Absent
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={{backgroundColor:'blue',marginTop:20,marginLeft:150,width:100,height:30,fontSize:20,paddingLeft:20,paddingTop:5}} onPress={this.goToTotalScreen}>Submit</TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 20,
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    borderWidth: 4,
    marginTop:-20
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    marginLeft: 200,
    marginTop:-30
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginTop: 10,
  },
});
