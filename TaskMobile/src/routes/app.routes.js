import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native'
import TaskList from '../screens/TaskList';
import TaskListAmanha from '../screens/TaskListAmanha';
import TaskListSemana from '../screens/TaskListSemana';
import TaskListMes from '../screens/TaskListMes';
import CustomDrawer from '../screens/Menu';
import commonStyles from '../commonStyles';

const App = createDrawerNavigator();

export const AppRoutes = () => {
  return (
      <App.Navigator screenOptions={{
        drawerLabelStyle:{fontSize:20, fontFamily:commonStyles.fontFamily,fontWeight:'normal'},
        headerShown:false
        }} drawerContent={(props) => <CustomDrawer {...props}/>}>
        <App.Screen  name="Home"  component={TaskList}  />
        <App.Screen  name="amanhã" component={TaskListAmanha}/>
        <App.Screen  name="semana" component={TaskListSemana}/>
        <App.Screen  name="mês" component={TaskListMes}/>
      </App.Navigator>
  );
};
