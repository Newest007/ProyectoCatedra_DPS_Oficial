import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, Modal, Button, TouchableHighlight, SafeAreaView, TextInput,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function Card({url}) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [vuelos, setVuelos] = useState(null)
    //Datos del vuelo
    const [precio, setPrecio] = useState(0)
    const [destino, setDestino] = useState("")
    const [origen, setOrigen] = useState("")
    const [aerolinea, setAerolinea] = useState("")
    const [hora, setHora] = useState("")
    const [imagen, setImagen] = useState("")
    const [listaVuelos, setListaVuelos] = useState("")

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", " X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    headers.append("Access-Control-Allow-Credentials", "false");
    headers.append("GET", "POST", "OPTIONS");

    useEffect(() => {
        const consultaApi = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }

                const data = await response.json();
                //console.log(data)
                const precios = data.map(vuelo => vuelo.Precio);
                const destinos = data.map(vuelo => vuelo.Destino_v);
                const origenes = data.map(vuelo => vuelo.Origen_v);
                const aerolinea = data.map(vuelo => vuelo.Nombre_aerolinea);
                const hora = data.map(vuelo => vuelo.Hora_salida)
                const imagenes = data.map(vuelo => {setImagen(vuelo.imagen)
                })
                const vuelos = data.map(vuelo => vuelo)

                setPrecio(precios)
                setDestino(destinos)
                setOrigen(origenes)
                setAerolinea(aerolinea)
                setHora(hora)
                setListaVuelos(vuelos)


            } catch (error) {
                console.error('Hubo un problema con la solicitud fetch:', error);
            }
        }
        const datos = consultaApi()
        setVuelos(datos);
        setLoading(false);
    }, []);
    
    //MODAL
    const[openModal, setOpenModal]=React.useState(false);

    function modal_render(aerolinea, origen, destino, precio,imagen){
        return(
            <Modal visible={openModal} animationType="slide" transparent={true}>

                <View style={styles.modal_1}>

                    <View style={styles.modal_inter}>
                        <Image style={{height:60,width:'90%'}} source={require('../src/img/Logo1-sfondo.png') }></Image>
                        
                        <Image
                        style={styles.imgini}
                        source={{ uri: imagen }}
                        />
                        <Text>Operado por: {aerolinea} </Text>
                        <Text>Origen: {origen}   </Text>
                        <Text>Destino: {destino} </Text>
                        <Text>Hora - Salida: {hora} </Text>
                        <Text>Precio:${precio} </Text>

                        <View style={{ flexDirection: 'row', marginTop:40 }}>
                            <TouchableOpacity onPress={() => setOpenModal(false)} style={{ flex: 1, alignItems: 'center', backgroundColor: '#EA5F5F', padding:5, borderRadius:10, marginRight:5,borderWidth:1, borderColor:'red'  }}>
                                <Text style={{ color: 'white' }}>Salir</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setOpenModal(false); navigation.navigate('CreditCard')}} style={{ flex: 1, alignItems: 'center', backgroundColor: '#69C353', padding:5, borderRadius:10,marginLeft:5  }}>
                                <Text style={{ color: 'white' }}>Comprar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.listaItem}>
            <View style={styles.itemContainer}>
                <Image
                    style={styles.imgini}
                    source={{ uri: imagen }}
                />
                <Text style={styles.tituloini}>{destino}</Text>
                <TouchableHighlight style={styles.boton}  onPress={()=>setOpenModal(true)}>
                    <Text style={styles.botonTexto}>${precio}</Text>
                </TouchableHighlight>
            </View>
            {modal_render(aerolinea,origen, destino, precio,imagen)
            }
        </View>

    )
}
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

    imgini:{
        width:'100%',
        height:200,
        marginVertical:5,
        borderRadius:15
    },
    tituloinicio:{
        fontWeight: 'bold',
        fontSize:20,
        marginVertical:10
    },
    modal_1:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0.5)'
    },
    modal_inter:{
        backgroundColor: 'white',
        padding:15, 
        width:'90%',
        height:500,
        borderRadius:15,
        borderWidth: 1, 
        borderColor: '#2c278d'
    },
    Boton_touch:{
        marginTop:20, 
        backgroundColor:'yellow',
        borderRadius:10, 
        padding:10
    },
    
})

export default Card