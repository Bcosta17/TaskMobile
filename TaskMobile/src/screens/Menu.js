import React, {useContext} from "react";
import {View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../context/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CustomDrawer(props){
    const {user, signOut} = useContext(AuthContext);
    return(
      <DrawerContentScrollView {...props} labelStyle={styles.labelStyle} >
        <View style={styles.header}>
            <Icon name='user-circle-o' color={'#333'} size={65}/>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.user}>{user && user.nome}</Text>
        </View>
        <TouchableOpacity onPress={signOut}>
            <View >
                <Icon name='sign-out' marginBottom={10} marginLeft={14} size={30} color={'#800'}/>
            </View>
        </TouchableOpacity>
        <DrawerItemList {...props}/>
       
      </DrawerContentScrollView>
        
        
    );
}

const styles = StyleSheet.create({
   header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
   },
   title:{
    fontFamily:commonStyles.fontFamily,
    fontSize: 18,
    marginTop: 5,
   },
   user:{
    fontFamily:commonStyles.fontFamily,
    fontSize: 20,
    fontWeight:'bold',
    paddingBottom:25,
   },
   logoutIcon:{
    marginLeft: 10,
    marginBottom: 10,
   }
  });