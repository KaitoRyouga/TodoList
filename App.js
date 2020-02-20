import React, { Component } from 'react';
import {Icon} from 'react-native-elements';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreeen from './components/HomeScreen'
import CalendarScreen from './components/CalendarScreen'
import SettingsScreen from './components/SettingsScreen';

const Tab = createBottomTabNavigator();


export default class TodoList extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              var colorName;
              var iconName;
              var typeIcon = null;
              if (route.name == 'Tasks') {
                colorName = focused ? 'green' : 'grey';
                iconName = 'tasks';
                typeIcon = 'font-awesome';
                // iconName = focused ? 'tasks' : 'tasks';
              } else if (route.name == 'Calendar') {
                colorName = focused ? 'green' : 'grey';
                // iconName = focused ? 'calendar' : 'calendar';
                iconName = 'calendar';
                typeIcon = 'font-awesome';;
              } else if (route.name == 'Settings') {
                colorName = focused ? 'green' : 'grey';
                iconName = 'settings';
              }

              return (
                <Icon
                  TouchableOpacity
                  name={iconName}
                  color={colorName}
                  type={typeIcon}
                  size={size}></Icon>
              );
            },
          })}>
          <Tab.Screen name="Tasks" component={HomeScreeen}></Tab.Screen>
          <Tab.Screen name="Calendar" component={CalendarScreen}></Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}