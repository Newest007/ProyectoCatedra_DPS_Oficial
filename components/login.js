import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, SafeAreaView, Image, Alert } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';

//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { _singInWithGoogle } from '../config/firebase/GoogleSingIn';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




const FROM_COLOR = 'rgba(247, 247, 247, 1)';
const TO_COLOR = 'rgba(45, 40, 122, 1)';

const Login = () => {

    const [correo, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(() => {
        const limpiarAsyncStorage = async () => {
            try {
                await AsyncStorage.clear();
                console.log('AsyncStorage limpiado con éxito.');
            } catch (error) {
                console.error('Error al limpiar AsyncStorage:', error);
            }
        };

        limpiarAsyncStorage();
    }, []);

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, correo, password)
            .then((userCredential) => {
                console.log('Signed In!')
                const user = userCredential.user;
                console.log(user)
                AsyncStorage.setItem('userEmail', correo);
                navigation.navigate('Principal')

            })
            .catch(error => {
                console.log(error)
            })
    }

    async function googleSignIn() {
        _singInWithGoogle().then(data => {
            if (!data) {
                console.log('=> Error no data')
                return
            }
            console.log('=> success', data);
            AsyncStorage.setItem('userName', data.user.givenName);
            AsyncStorage.setItem('userFamily', data.user.familyName);
            AsyncStorage.setItem('userEmail', data.user.email);
            axios.get(`https://lis03l2023gc180313.000webhostapp.com/Usuario/index/${data.user.email}`)
                .then(response => {
                    if(response.data === 0){
                        const datosUsuario = new FormData();
                        datosUsuario.append('Nombres', data.user.givenName);
                        datosUsuario.append('Apellidos', data.user.familyName);
                        datosUsuario.append('dui_passport', '12122323');
                        datosUsuario.append('contrasenia', '123456');
                        datosUsuario.append('correo_usuario', data.user.email);
                        const guardarDatos = async () => {
                            try {
                                const response = await axios.post('https://lis03l2023gc180313.000webhostapp.com/Usuario/index/', datosUsuario, {
                                    headers: {
                                        'Accept': '*/*',
                                        'Accept-Encoding': 'gzip, deflate, br',
                                        'Connection': 'keep-alive',
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                        
                                console.log(response.data);
                            } catch (error) {
                                console.error('Error:', error);
                            }
                        }
                        guardarDatos()
                    }
                    else{
                        console.log(response.data)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            navigation.navigate('Principal')
        })
    }

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
                <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={styles.textInput} placeholder="Enter Your Password" />

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
                            onPress={() => navigation.navigate('Registro')}
                        />
                    </View>
                    <View style={styles.google}>
                        <Button
                            title="Iniciar Sesión con Google"
                            color="#0e64d1"
                            onPress={() => googleSignIn()}
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
