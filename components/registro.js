import React from 'react';
import { View, StyleSheet, TextInput, Button, SafeAreaView, Image, Alert } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

const FROM_COLOR = 'rgba(247, 247, 247, 1)';
const TO_COLOR = 'rgba(45, 40, 122, 1)';

const Registro = ({ children }) => {

    //const [usuario, setUser] = React.useState('');
    const [correo, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confPass, setConfPass] = React.useState('');

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {

        if(password == confPass){
            createUserWithEmailAndPassword(auth,correo,password)
            .then((userCredential)=>{
                console.log('Account created')
                const user = userCredential.user;
                Alert.alert('Usuario creado correctamente!');
                AsyncStorage.setItem('userEmail', correo);
                navigation.navigate('Principal');
                console.log(user);
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
        }
        else{
            Alert.alert('Las contraseñas no coinciden')
        }
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

                <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} placeholder="Ingresa tu Correo" />
                <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={styles.textInput} placeholder="Ingresa tu Contraseña" />
                <TextInput secureTextEntry={true} onChangeText={(text) => setConfPass(text)} style={styles.textInput} placeholder="Confirma tu contraseña" />

                <View style={styles.buttonContainer}>
                    <Button
                        title="Guardar Datos"
                        color="#0e64d1"
                        onPress={handleCreateAccount}
                    />
                </View>
                
            </View>

            {children}
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
});

export default Registro;
