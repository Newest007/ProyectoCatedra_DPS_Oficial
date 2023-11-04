import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from '@react-navigation/native';

export default function Form() {

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
          try {
            const nombre = await AsyncStorage.getItem('userName');
            const apellido = await AsyncStorage.getItem('userFamily')
            const correo = await AsyncStorage.getItem('userEmail');
    
            if (correo !== null) {
              setUserEmail(correo);
            }
            if (nombre !== null) {
              setUserName(nombre);
            }
            if (apellido !== null) {
              setUserLastName(apellido);
            }


          } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
          }
        };
    
        obtenerDatosUsuario();
    }, []);

    async function signOut () {
        AsyncStorage.clear()
        navigation.navigate('Login')
        /**try {
            //await GoogleSignin.signOut();
            return(
                AsyncStorage.clear(),
                navigation.navigate('Login')
            )
            //setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }*/
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
                        <TextInput style={styles.inputs}>{userName}</TextInput>
                    </View>
                    <View>
                        <Text>Apellido</Text>
                        <TextInput style={styles.inputs}>{userLastName}</TextInput>
                    </View>
                    <View>
                        <Text>Correo Electronico</Text>
                        <TextInput style={styles.inputs}>{userEmail}</TextInput>
                    </View>
                    <View>
                        <Text>Pasaporte</Text>
                        <TextInput style={styles.inputs} />
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
                </View>
                <Button
                    title="Cerrar Sesión"
                    color="#0e64d1"
                    onPress={()=>signOut()}
                />
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
