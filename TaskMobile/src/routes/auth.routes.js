import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Auth';
import Register from '../screens/SignUp'


const Auth = createStackNavigator();

export const AuthRoutes = () => {
  return (
      <Auth.Navigator screenOptions={{headerShown:false}}>
        <Auth.Screen name="Login" component={Login} />
        <Auth.Screen name="Register" component={Register} />
      </Auth.Navigator>
  );
};


