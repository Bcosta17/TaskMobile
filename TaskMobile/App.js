import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './src/routes';
import AuthProvider from './src/context/auth';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {  
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}
