import React,{useState} from 'react'
import { View, StyleSheet, Image, Text, ScrollView, Modal,Button,TouchableHighlight, SafeAreaView, TextInput } from "react-native";

function Card({vuelos}) {
    const [vuelo, setVuelo] = useState(vuelos)
    console.log(vuelo)
    return (
        <View style={styles.listaItem}>
            <View style={styles.itemContainer}>
                <Image
                    style={styles.imgini}
                    source={require('../src/img/ny.jpg')}
                />
                <Text style={styles.tituloini}>{vuelos.Origen_v}</Text>
                <TouchableHighlight style={styles.boton}>
                    <Text style={styles.botonTexto}>USD</Text>
                </TouchableHighlight>
            </View>
        </View>

    )
}
const styles=StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    banner:{
        height:250,
        flex:1
    },
    contenedor:{
        marginHorizontal:10,
        marginBottom:10
    },
    titulo:{
        fontWeight: 'bold',
        fontSize:24,
        marginVertical:10
    },
    ciudad:{
        width:250,
        height:250,
        marginRight:10
    },
    mejores:{
        width:'100%',
        height:200,
        marginVertical:5,
        
    },

    //Imagenes de inicio
    imgini:{
        width:'100%',
        height:250,
        marginVertical:5,
        borderRadius:15
    },
    tituloinicio:{
        fontWeight: 'bold',
        fontSize:20,
        marginVertical:10
    },

    //
    
    listaItem:{
        flexBasis:'48%',
        
    },
    listado:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        marginLeft:2,
        marginRight:2,
        marginTop:10
    },
    vistaModal:{
        flex:1,
        backgroundColor:'#000000aa',
    },
    Modal:{
        flex:1,
        backgroundColor:'#fff',
        margin:50,
        padding:40,
        borderRadius:10,
    },
    subtitulo:{
        fontWeight:'bold',
        fontSize:14,
        justifyContent:'center'
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
        textDecorationLine:'underline'
    },
    boton: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        marginLeft:30,
        marginBottom:30,
        borderWidth: 3, 
        borderColor: '#FFF', 
        opacity:0.5
    },

    botonTexto: {
        color: 'black', 
        fontWeight: 'bold',
      },
})

export default Card