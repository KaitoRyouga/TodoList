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
    Modal
} from 'react-native';
import { Icon } from 'react-native-elements';
// import HomeScreen from './HomeScreen';

export default class ModalHomeScreen extends Component {

    constructor(props) {
        super()
        this.state = {
            modalVisible: false,
            link: false,
            myData: null
            // testParent: props.parentItems
        }
    }

    setModalVisible = (visible) => {
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                style = {{ flex: 1}}
            >
                <View style={styles.viewContainer}>
                    <View style={styles.viewContent}>
                        <Text style={styles.textContent}>My Lists</Text>
                        <Text style={styles.textContent}>Tags</Text>
                    </View>
                    <View style={styles.viewContentmore}>
                        <TouchableOpacity>
                            <Image
                                style={styles.more}
                                source={require('../images/more.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewEnd}>
                    <View style={styles.viewGrid}>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.setState({ modalVisible: !this.state.modalVisible });
                                    this.props.parentItems(true);
                                
                                }
                            }
                            style={styles.viewGridItem}
                        >
                            <View>
                                
                                <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 17 }}>All Tasks</Text>
                                <Text style={{ fontSize: 10 }}>4 ITEMS</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.lineBreak}></View>
                        <View style={styles.viewGridItem}>
                            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 17 }}>Personal</Text>
                            <Text style={{ fontSize: 10 }}>4 ITEMS</Text>
                        </View>
                    </View>
                    <View style={styles.viewGridContent}>
                        <View style={styles.viewGridItem}>
                            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 17 }}>Grocery List</Text>
                            <Text style={{ fontSize: 10 }}>0 ITEMS</Text>
                        </View>
                        <View style={styles.lineBreak}></View>
                        <View style={styles.viewGridItem}>
                            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 17 }}>Work</Text>
                            <Text style={{ fontSize: 10 }}>0 ITEMS</Text>
                        </View>
                    </View>
                    <View style={styles.viewGridContent}>
                        <View style={styles.viewGridItem}>
                            <TouchableOpacity
                                onPress = {
                                    () => {
                                        // this.props.onClickAdd(true)
                                        // this.setState({ showItems: true })
                                        // this.state.showItems.setShowItems(true);
                                        // this.props.parentItems(true);
                                        // console.log(this.state.showItems)
                                        this.storeData();
                                        this.getData();
                                        console.log('get data');
                                    }
                                }
                            >
                                <Icon name='add' color='grey'></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineBreak}></View>
                        <View style={styles.viewGridItem}>

                        </View>
                    </View>
                    <View style={styles.viewGridContent}>
                        <View style={styles.viewGridItem}>

                        </View>
                        <View style={styles.lineBreak}></View>
                        <View style={styles.viewGridItem}>

                        </View>
                    </View>
                    <View style={styles.viewGridContent}>
                        <View style={styles.viewGridItem}>
                            
                        </View>
                        <View style={styles.lineBreak}></View>
                        <View style={styles.viewGridItem}>

                        </View>
                    </View>
                    <View style={styles.viewGridContent}>
                        <View style={styles.viewGridItemBottom}>
                            
                        </View>
                        <View style={styles.lineBreak}></View>
                        <View style={styles.viewGridItemBottom}>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    more: {
        width: 25,
        height: 25,
        margin: 15,
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 4
    },
    textContent: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 20
    },
    viewContentmore: {
        flex: 1,
        marginTop: 10,
        alignItems: 'flex-end'
    },
    viewEnd: {
        // borderWidth: 2
    },
    viewGrid: {
        flexDirection: 'row',
        marginTop: 20,
    },
    viewGridItem: {
        borderWidth: 0.5,
        flex: 1,
        width: 100,
        height: 100,
        borderColor: 'grey',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    viewGridItemBottom: {
        flex: 1,
        width: 100,
        height: 100,
    },
    viewGridContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconItemGrid: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lineBreak: {
        borderWidth: 0.25,
        borderColor: 'grey',
        width: 0.1,
        height: 100
    }
})