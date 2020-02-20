import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {Icon} from 'react-native-elements';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class ModalTypes extends Component {

    constructor(props) {
        super()
        this.state = {
          modalVisible: false,
          circleToday: false,
          circleTomorrow: false,
          circleUpcomming: false,
          circleSomeday: false,
          types: ''
        };
    }

    setModalTypesVisible = (visible) => {
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.viewContainer}>
              <View style={styles.viewTitle}>
                <Text style = {{
                    fontSize: 20
                }}>Choose: </Text>
              </View>
              <View>
                <TouchableOpacity
                    onPress = {
                        () => {
                            this.setState({
                              circleToday: !this.state.circleToday,
                              types: 'today',
                            });
                        }
                    }
                >
                    <View style={styles.viewCheckboxContent}>
                        <Icon name={this.state.circleToday ? 'dot-circle-o' : 'circle-o'} type="font-awesome"></Icon>
                    <Text style={styles.itemContent}>Today</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {
                        () => {
                            this.setState({ circleTomorrow: !this.state.circleTomorrow, types: 'tomorrow' })
                        }
                    }
                >
                    <View style={styles.viewCheckboxContent}>
                        <Icon name={this.state.circleTomorrow ? 'dot-circle-o' : 'circle-o'} type="font-awesome"></Icon>
                    <Text style={styles.itemContent}>Tomorrow</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {
                        () => {
                            this.setState({
                              circleUpcomming: !this.state.circleUpcomming,
                              types: 'upcomming',
                            });
                        }
                    }
                >
                    <View style={styles.viewCheckboxContent}>
                        <Icon name={this.state.circleUpcomming ? 'dot-circle-o' : 'circle-o'} type="font-awesome"></Icon>
                    <Text style={styles.itemContent}>Upcomming</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {
                        () => {
                            this.setState({
                              circleSomeday: !this.state.circleSomeday,
                              types: 'someday',
                            });
                        }
                    }
                >
                    <View style={styles.viewCheckboxContent}>
                        <Icon name={this.state.circleSomeday ? 'dot-circle-o' : 'circle-o'} type="font-awesome"></Icon>
                    <Text style={styles.itemContent}>Someday</Text>
                    </View>
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                  <TouchableOpacity
                    onPress = {
                        () => {
                            this.props.createData(this.props.text,this.state.types);
                            this.setModalTypesVisible(!this.state.modalVisible);
                        }
                    }
                  >
                    <Text style={{
                        backgroundColor: 'green',
                        padding: 5,
                        borderRadius: 5,
                        color: 'white'
                    }}>
                        OK
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
    }
}

const styles = StyleSheet.create({
  viewContainer: {
    width: screenWidth/7*5,
    height: 200,
    backgroundColor: 'aliceblue',
    marginTop: screenHeight/10*3,
    marginLeft: screenWidth/7,
    borderRadius: 20
  },
  itemContent: {
    marginLeft: 10,
    fontSize: 17,
  },
  viewCheckboxContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 20
  },
  viewTitle: {
      alignItems: 'center'
  },
  button: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 50
  }
});