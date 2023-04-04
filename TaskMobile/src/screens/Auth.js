import React, {useState,useContext} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth';


export default function Auth() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {signin} = useContext(AuthContext);
  
  function handlerLogin(){
    signin(email, password);
  }
  
  return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}> Informe seus dados </Text>
          <AuthInput
            icon='at'
            placeholder="E-mail"
            value={email}
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <AuthInput
            icon='lock'
            placeholder="Senha"
            value={password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />      
          <TouchableOpacity onPress={handlerLogin}>
            <View style={styles.button} >
              <Text style={styles.buttonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={()=> navigation.navigate('Register')}>
          <Text style={styles.buttonText}>
               Ainda não possui conta?
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
});
