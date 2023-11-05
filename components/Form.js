import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput, SafeAreaView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Form() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [pasaporte, setPasaporte] = useState('');
    const [correo, setCorreo] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
          try {
            const nombre = await AsyncStorage.getItem('userName');
            const apellido = await AsyncStorage.getItem('userLastName')
            const correo = await AsyncStorage.getItem('userEmail');
    
            if (correo !== null) {
              setCorreo(correo);
            }
            if (nombre !== null) {
              setNombre(nombre);
            }
            if (apellido !== null) {
              setApellido(apellido);
            }


          } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
          }
        };
    
        obtenerDatosUsuario();
    }, []);


    const registrarDatos = () => {
        axios.get(`https://lis03l2023gc180313.000webhostapp.com/Usuario/index/${correo}`)
            .then(response => {
                if(response.data === 0){
                    const datosUsuario = new FormData();
                    datosUsuario.append('Nombres', nombre);
                    datosUsuario.append('Apellidos', apellido);
                    datosUsuario.append('dui_passport', pasaporte);
                    datosUsuario.append('correo_usuario', correo);

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
                    guardarDatos();
                    Alert.alert('Datos guardados con éxito!');
                }
                else{
                    console.log(response.data)
                    Alert.alert('Ya existe un registro con este correo')
                }
            })
            .catch(error => {
            console.error('Error:', error);
        });
    }

    async function signOut () {
        if(nombre!=''){
            try {
                await GoogleSignin.signOut();
                return(
                    AsyncStorage.clear(),
                    navigation.navigate('Login')
                )
                //setState({ user: null }); // Remember to remove the user from your app's state as well
            } catch (error) {
                console.error(error);
            }
        }
        else{
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView>
            <View style={{ alignItems: "center", height: "100%", justifyContent: "center" }}>
                <View style={{ marginBottom: 20 }}>
                    <Image
                        source={require('../src/img/Logo1.png')}
                        style={{ width: 350, height: 100 }}
                    />
                </View>
                <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ width: "60%", fontSize: 18, fontWeight: "bold" }}>Informacion Personal</Text>
                    <Text style={{ width: "25%", textAlign: "center", fontSize: 15, color: "blue" }}>Editar</Text>
                </View>
                <View style={{
                    width: "80%", height: "50%", flexDirection: "column", justifyContent: "space-around",
                    marginTop: 20
                }}>
                    <View>
                        <Text>Nombre</Text>
                        <TextInput onChangeText={(text) => setNombre(text)} style={styles.inputs}>{nombre}</TextInput>
                    </View>
                    <View>
                        <Text>Apellido</Text>
                        <TextInput onChangeText={(text) => setApellido(text)} style={styles.inputs}>{apellido}</TextInput>
                    </View>
                    <View>
                        <Text>Correo Electronico</Text>
                        <TextInput  editable={false} style={styles.inputs}>{correo}</TextInput>
                    </View>
                    <View>
                        <Text>Pasaporte</Text>
                        <TextInput onChangeText={(text) => setPasaporte(text)} style={styles.inputs}>{pasaporte}</TextInput>
                    </View>
                    <View>
                        <Text>Numero de Telefono</Text>
                        <View style={{ flexDirection: "row", height: 40 }}>
                            <View style={{ backgroundColor: "blue", justifyContent: "center", width: "15%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
                                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>+503</Text>
                            </View>
                            <TextInput style={{ backgroundColor: '#dcdcdc', width: "85%", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                            />
                        </View>
                    </View>
                    <Button
                    title="Guardar Datos"
                    color="#0e64d1"
                    onPress={()=>registrarDatos()}
                    />
                </View>
                <View>
                    <Button
                    title="Cerrar Sesión"
                    color="#0e64d1"
                    onPress={()=>signOut()}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputs: {
        backgroundColor: '#dcdcdc',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 40
    },
});
