import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ModalHomeScreen from './ModalHomeScreen'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { getKey, addData, changeComplete, remove } from './AsynStorage';
import uuid from 'react-native-uuid';
import ModalTypes from './ModalTypes'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class ItemAsyn extends Component {

  render() {
    return (
      
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.complete(this.props.task.id)
            }}
          >
            <View style={styles.viewCheckboxContent}>
              {/* {console.log(this.props.task)} */}
              <Fontisto name={this.props.task.complete ? 'checkbox-active' : 'checkbox-passive'} color="grey" size={20}></Fontisto>
              <Text style={[styles.itemContent, this.props.task.complete ? styles.itemContentInactive : {}]}>{this.props.task.name}</Text>
            </View>
          </TouchableOpacity>
          {
            this.props.task.complete &&
            <View style={{
              marginRight: 20
            }}>
              <TouchableOpacity
                onPress = {
                  () => {
                    this.props.removeTask(this.props.task.id)
                  }
                }
              >
                <Icon name='cancel' color='grey'></Icon>
              </TouchableOpacity>
            </View>
          }
        </View>
      
    )
  }
}

export default class HomeScreen extends Component {

  constructor(props) {
    super()
    this.state = {
      showItemsToday: false,
      showItemsTomorrow: false,
      showItemsUpcoming: false,
      showItemsSomeday: false,
      iconCheckbox: false,
      itemActive: false,
      colorIconActive: false,
      modalVisible: false,
      text: '',
      tasks: [],
      loading: false
    };
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    getKey().then(tasksData => {
      this.setState({
        tasks: tasksData
      })
    }).catch(error =>{
      console.error(error)
    })
  }

  createData = (name, types) => {
    addData(name, types).then(task => {
      this.setState({
        tasks: [].concat([task], this.state.tasks)
      })
    })
  }

  setShowItems = (show) => {
    this.setState({
      showItems: show
    });
  }

  loadComplete = (id) => {
    changeComplete(id).then(taskId => {
      this.setState({ tasks: taskId })
      // console.log(taskId)
    })
  }

  removeTask = (id) => {
    remove(id).then(taskId => {
      this.setState({ tasks: taskId })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewTop}>
          <TouchableOpacity
            onPress={() => {
              this.refs.ModalHomeScreen.setModalVisible(
                !this.state.modalVisible,
              );
            }}>
            <Image
              style={styles.grid}
              source={require('../images/grid.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.allTasks}>ALL TASKS</Text>
          <TouchableOpacity>
            <Image
              style={styles.more}
              source={require('../images/more.png')}></Image>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollViewCenter}>
          <View>
            <View style={styles.contentRow}>
              <Text style={styles.textContentRow}>Today</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showItemsToday: !this.state.showItemsToday});
                }}>
                <Icon name="add" color="green"></Icon>
              </TouchableOpacity>
            </View>
            {
              this.state.showItemsToday &&
              <View style={styles.ViewItemContent}>
                {
                  this.state.tasks.map((task) => {
                    if(task.type == 'today'){
                      return (
                        <ItemAsyn task={task} complete={this.loadComplete} key={task.id} removeTask={this.removeTask}></ItemAsyn>
                      );
                    }
                  })
                }
              </View>
            }
            <View style={styles.contentRow}>
              <Text style={styles.textContentRow}>Tomorow</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showItemsTomorrow: !this.state.showItemsTomorrow });
                }}>
                <Icon name="add" color="green"></Icon>
              </TouchableOpacity>
            </View>
            {
              this.state.showItemsTomorrow &&
              <View style={styles.ViewItemContent}>
                {
                  this.state.tasks.map((task) => {
                    if (task.type == 'tomorrow') {
                      return (
                        <ItemAsyn task={task} complete={this.loadComplete} key={task.id} removeTask={this.removeTask}></ItemAsyn>
                      );
                    }
                  })
                }
              </View>
            }
            <View style={styles.contentRow}>
              <Text style={styles.textContentRow}>Upcoming</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showItemsUpcoming: !this.state.showItemsUpcoming });
                }}>
                <Icon name="add" color="green"></Icon>
              </TouchableOpacity>
            </View>
            {
              this.state.showItemsUpcoming &&
              <View style={styles.ViewItemContent}>
                {
                  this.state.tasks.map((task) => {
                    if(task.type == 'upcomming') {
                      return (
                        <ItemAsyn task={task} complete={this.loadComplete} key={task.id} removeTask={this.removeTask}></ItemAsyn>
                      );
                    }
                  })
                }
              </View>
            }
            <View style={styles.contentRow}>
              <Text style={styles.textContentRow}>Someday</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showItemsSomeday: !this.state.showItemsSomeday });
                }}>
                <Icon name="add" color="green"></Icon>
              </TouchableOpacity>
            </View>
          </View>
          {
            this.state.showItemsSomeday &&
            <View style={styles.ViewItemContent}>
              {
                this.state.tasks.map((task) => {
                  if (task.type == 'someday') {
                    return (
                      <ItemAsyn task={task} complete={this.loadComplete} key={task.id} removeTask={this.removeTask}></ItemAsyn>
                    );
                  }
                })
              }
            </View>
          }
        </ScrollView>
        <View style={styles.viewBottom}>
          <View style={{flex: 4}}>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.inputTasks}
                placeholder="I want to ..."
                onChangeText={value =>
                  this.setState({text: value})
                }></TextInput>
            </KeyboardAvoidingView>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.refs.ModalTypes.setModalTypesVisible(true)
              }}>
              <Image
                style={{width: 50, height: 50, marginBottom: 10}}
                source={require('../images/add_active.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <ModalHomeScreen
          ref={'ModalHomeScreen'}
          parentItems={this.setShowItems}></ModalHomeScreen>
        <ModalTypes ref={'ModalTypes'} createData={this.createData} text={this.state.text} showData={this.showData}></ModalTypes>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  grid: {
    width: 20,
    height: 20,
    margin: 15,
  },
  more: {
    width: 25,
    height: 25,
    margin: 15,
  },
  allTasks: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.1
  },
  scrollViewCenter: {
    flex: 1
  },
  contentRow: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContentRow: {
    color: 'green',
    fontSize: 20
  },
  inputTasks: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10,
    paddingLeft: 20
  },
  viewBottom: {
    // marginTop: screenHeight/10*5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.1
  },
  ViewItemContent: {
    marginLeft: 50
  },
  itemContent: {
    marginLeft: 10,
    fontSize: 17,
  },
  itemContentInactive: {
    textDecorationLine: 'underline line-through',
    color: 'grey'
  },
  viewCheckboxContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }

});

