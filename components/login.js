import React from 'react';
import { View, StyleSheet, Text, TextInput, Button, SafeAreaView, Image, Alert } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebase-config';

//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { _singInWithGoogle } from '../config/firebase/GoogleSingIn';
import { GoogleSignin } from "@react-native-google-signin/google-signin";


const FROM_COLOR = 'rgba(247, 247, 247, 1)';
const TO_COLOR = 'rgba(45, 40, 122, 1)';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log('Account created')
            const user = userCredential.user;
            console.log(user)
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    }
    
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=> {
            console.log('Signed In!')
            const user = userCredential.user;
            console.log(user)
            navigation.replace('Principal')
        })
        .catch(error => {
            console.log(error)
        })
    }

    async function googleSignIn(){
        _singInWithGoogle().then(data => {
            if(!data){
                console.log('=> Error no data')
                return 
            }
            console.log('=> success', data)
            navigation.replace('Principal')
        })
    }
    
     async function signOut () {
        try {
            await GoogleSignin.signOut();
            return(
                <Login/>
            )
            //setState({ user: null }); // Remember to remove the user from your app's state as well
          } catch (error) {
            console.error(error);
          }
      };

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.gradientContainer}>
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0" stopColor={FROM_COLOR} />
                            <Stop offset="1" stopColor={TO_COLOR} />
                        </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#grad)" />
                </Svg>
            </View>

            <View style={styles.contentContainer}>
                <Image
                    style={styles.logo}
                    source={require('../src/img/Logo1-sfondo.png')}
                    
                />

                <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} placeholder="Enter Your Email" />
                <TextInput  secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={styles.textInput} placeholder="Enter Your Password" />

                <View style={styles.buttonContainer}>
                    <Button
                        title="Iniciar Sesion"
                        color="#0e64d1"
                        onPress={handleSignIn}
                    />
                    <View style={styles.google}>
                    <Button
                        title="Crear Cuenta"
                        color="#0e64d1"
                        onPress={handleCreateAccount}
                    />
                    </View>
                    <View style={styles.google}>
                    <Button
                        title="Sign in with google"
                        color="#0e64d1"
                        onPress={()=>googleSignIn()}
                    />
                    </View>
                    <View style={styles.google}>
                    <Button
                        title="Sign out"
                        color="#0e64d1"
                        onPress={()=>signOut()}
                    />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TO_COLOR,
    },
    gradientContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 80,
        marginBottom: 100,
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#949292',
        marginVertical: 10,
        width: 350,
        height: 45,
        borderRadius: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: 350,
        height: 45,
        marginVertical: 10,
        borderRadius: 20,
        
    },
    text: {
        color: 'white',
        marginTop: 10,
    },
    google: {
        marginTop: 10
    },
});

export default Login;
