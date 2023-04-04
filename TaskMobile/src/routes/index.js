import React, { useContext } from 'react';
import {View, ActivityIndicator} from 'react-native';
import { AuthContext } from '../context/auth';
import { AuthRoutes } from './auth.routes';
import{ AppRoutes} from './app.routes'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Routes = () => {

  const {signed, loading } = useContext(AuthContext);
 
  if(loading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
   
   signed ? <AppRoutes /> : <AuthRoutes/>
  )
};


