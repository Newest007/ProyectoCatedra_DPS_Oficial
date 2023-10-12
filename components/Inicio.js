import React, { useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView, Modal,Button,TouchableHighlight, SafeAreaView, TextInput } from "react-native";

const Inicio = () => {

    const[modalVisibleplaya, SetModalVisibleplaya]=useState(false);

  return (
    <>
    <SafeAreaView style={styles.safeArea}>
    <ScrollView>

        <Modal transparent={true} animationType="slide" visible={modalVisibleplaya} onRequestClose={()=>{
            alert('modal has been closed');}}>

            <View style={styles.vistaModal}>
                <View style={styles.Modal}>
                    <Text style={styles.subtitulo}>Ir a la Playa</Text>
                    <Text>El Salvador Cuenta con hermosas playas a nivel Centroamericano</Text>
                    <Button title="Cerrar" onPress={()=>{SetModalVisibleplaya(!modalVisibleplaya)}}></Button>
                </View>
            </View>

        </Modal>

        <View style={{width:430, height: 150, backgroundColor:'#cdcbf0',}}>
            <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop:10 }}>
                Hola.. Adonde deseas viajar
            </Text>
            <TextInput
            style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 15,
                marginTop:20,
                marginLeft: 2,
                color: 'black',
                backgroundColor: '#f3f3f3',
                padding: 10,
                borderRadius:18,
                width:350
            }}
            placeholder="Selecciona tu destino"
            />


        </View>



        <View style={styles.contenedor}>

        <Text style={styles.tituloini}>Vuelos en promocion       
        <Text style={{fontSize:15, textDecorationLine:'underline', color:'blue'}}>Mas Promociones</Text></Text>
                <View style={styles.listado}>
                    
                    <View style={styles.listaItem}>
                        <Image
                        style={styles.imgini}
                        source={require('../src/img/ny.jpg')}
                        />
                    </View>
                    <View style={styles.listaItem}>
                        <Image
                        style={styles.imgini}
                        source={require('../src/img/lima.jpg')}
                        />
                    </View>
                    <View style={styles.listaItem}>
                        <Image
                        style={styles.imgini}
                        source={require('../src/img/los-angeles.jpg')}
                        />
                    </View>
                    <View style={styles.listaItem}>
                        <Image
                        style={styles.imgini}
                        source={require('../src/img/rio-j.jpg')}
                        />
                    </View>
                </View>
            <Text style={styles.titulo}>¿Que hacer en El Salvador?</Text>
            <ScrollView horizontal>
                <View>
                    <TouchableHighlight onPress={()=>{SetModalVisibleplaya(!modalVisibleplaya)}}>
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
    tituloini:{
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
        marginRight:2
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
    }
})

export default Inicio;
