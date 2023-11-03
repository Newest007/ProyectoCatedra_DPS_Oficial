import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, ScrollView, Modal, Button, TouchableHighlight, SafeAreaView, TextInput } from "react-native";
import axios from 'axios'
import Card from "./Card";

const Inicio = () => {

    const [modalVisibleplaya, SetModalVisibleplaya] = useState(false);
    const [loading, setLoading] = useState(true);
    const [vuelos, setVuelos] = useState(null)
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", " X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    headers.append("Access-Control-Allow-Credentials", "false");
    headers.append("GET", "POST", "OPTIONS");

    useEffect(() => {
        fetch("https://lis03l2023gc180313.000webhostapp.com/Oferta/index/2", {
            method: "GET",
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setVuelos(data);
                setLoading(false);
                console.log(data)

            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }, []);






    return (
        <>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>

                    <Modal transparent={true} animationType="slide" visible={modalVisibleplaya} onRequestClose={() => {
                        alert('modal has been closed');
                    }}>

                        <View style={styles.vistaModal}>
                            <View style={styles.Modal}>
                                <Text style={styles.subtitulo}>Ir a la Playa</Text>
                                <Text>El Salvador Cuenta con hermosas playas a nivel Centroamericano</Text>
                                <Button title="Cerrar" onPress={() => { SetModalVisibleplaya(!modalVisibleplaya) }}></Button>
                            </View>
                        </View>

                    </Modal>

                    <View style={{ width: 430, height: 135, backgroundColor: '#cdcbf0', }}>
                        <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop: 10, marginRight: 40, }}>
                            Hola.. Adonde deseas viajar
                        </Text>
                        <TextInput
                            style={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: 15,
                                marginTop: 20,
                                marginRight: 40,
                                color: 'black',
                                backgroundColor: '#f3f3f3',
                                padding: 10,
                                borderRadius: 18,
                                width: 300,
                            }}
                            placeholder="Selecciona tu destino"
                        />
                    </View>



                    <View style={styles.contenedor}>

                        <Text style={styles.tituloinicio}>Vuelos en promocion
                            <Text style={{ fontSize: 15, textDecorationLine: 'underline', color: 'blue' }}>Mas Promociones</Text>
                        </Text>
                        <View style={styles.listado}>

                            {loading ? (
                                <View><Text>Cargando...</Text></View>
                            ) : (
                                <Card vuelos={vuelos} />
                            )}

                        </View>


                        <Text style={styles.titulo}>¿Que hacer en El Salvador?</Text>
                        <ScrollView horizontal>
                            <View>
                                <TouchableHighlight onPress={() => { SetModalVisibleplaya(!modalVisibleplaya) }}>
                                    <Image
                                        style={styles.ciudad}
                                        source={require('../src/img/test/actividad1.jpg')}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View>
                                <Image
                                    style={styles.ciudad}
                                    source={require('../src/img/test/actividad2.jpg')}
                                />
                            </View>
                            <View>
                                <Image
                                    style={styles.ciudad}
                                    source={require('../src/img/test/actividad3.jpg')}
                                />
                            </View>
                            <View>
                                <Image
                                    style={styles.ciudad}
                                    source={require('../src/img/test/actividad4.jpg')}
                                />
                            </View>
                            <View>
                                <Image
                                    style={styles.ciudad}
                                    source={require('../src/img/test/actividad5.jpg')}
                                />
                            </View>
                        </ScrollView>


                    </View>
                </ScrollView>
            </SafeAreaView>
        </>

    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    banner: {
        height: 250,
        flex: 1
    },
    contenedor: {
        marginHorizontal: 10,
        marginBottom: 10
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 10
    },
    ciudad: {
        width: 250,
        height: 250,
        marginRight: 10
    },
    mejores: {
        width: '100%',
        height: 200,
        marginVertical: 5,

    },

    //Imagenes de inicio
    imgini: {
        width: '100%',
        height: 250,
        marginVertical: 5,
        borderRadius: 15
    },
    tituloinicio: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },

    //

    listaItem: {
        flexBasis: '48%',

    },
    listado: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10
    },
    vistaModal: {
        flex: 1,
        backgroundColor: '#000000aa',
    },
    Modal: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 50,
        padding: 40,
        borderRadius: 10,
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 14,
        justifyContent: 'center'
    },
    itemContainer: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 15,
        overflow: 'hidden',
    },
    tituloini: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#475657',
        textDecorationLine: 'underline'
    },
    boton: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        marginLeft: 30,
        marginBottom: 30,
        borderWidth: 3,
        borderColor: '#FFF',
        opacity: 0.5
    },

    botonTexto: {
        color: 'black',
        fontWeight: 'bold',
    },
})

export default Inicio;
