import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { server, showError } from "../common";

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        async function loadStorage() {
            
            const storageUser = JSON.parse(await AsyncStorage.getItem('userData'));
            
       
            if(storageUser){
               
                setUser(storageUser);
                
                axios.defaults.headers.common['Authorization'] = `bearer ${storageUser.token}`;
                setLoading(false);
            }

            setLoading(false);
        }
        loadStorage();
    },[])
    
    async function signin(email, password ){
        try {
          const res= await axios.post(`${server}/user/login`,{
            email: email,
            password: password
          });
          
          setUser(res.data);
          AsyncStorage.setItem('userData', JSON.stringify(res.data))
          axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;  
          
          } catch (error) {
            showError(error);
        }
      }

      async function signOut(){
        delete axios.defaults.headers.common['Authorization']
        await AsyncStorage.removeItem('userData').then(()=>{
          setUser(null);
        });
        
      }
    
    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, signin, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;