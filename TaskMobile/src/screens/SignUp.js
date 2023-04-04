import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import { useNavigation } from '@react-navigation/native';
import {server, showError, showSuccess} from '../common';
import axios from 'axios';

export default function Auth() {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

 
  const registro= async () => {
    try {
        await axios.post(`${server}/user/registro`,{
          name: name,
          email:email,
          password: password,
          confirmPassword: confirmPassword,

        });
        showSuccess('Usuário cadastrado!');
        navigation.navigate('Login')
        } catch (error) {
        showError(error);
        console.log(error)
        }  
};
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Crie a sua conta</Text>
            <AuthInput
              icon='user'
              placeholder="Nome"
              value={name}
              style={styles.input}
              onChangeText={(text) => setName(text)}
            />
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
            <AuthInput
              icon='asterisk'
              placeholder="Confirmação de senha"
              value={confirmPassword}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          <TouchableOpacity onPress={registro}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Registrar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={()=> navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Já possui conta?</Text>
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
