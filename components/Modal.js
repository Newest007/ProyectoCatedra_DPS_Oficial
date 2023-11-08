import React, { useState } from "react";

import { View,Text, Modal, TouchableHighlight, TouchableOpacity, Image,  StyleSheet } from "react-native";
const transparent ='rgba(0,0,0.5)';

const ModalExample =() =>{

    const[openModal, setOpenModal]=React.useState(false);

    function modal_render(dato){
        return(
            <Modal visible={openModal} animationType="slide" transparent={true}>

                <View style={styles.modal_1}>

                    <View style={styles.modal_inter}>
                        <Image style={{height:60,width:'90%'}} source={require('../src/img/Logo1-sfondo.png') }></Image>
                        
                        <Image
                        style={styles.imgini}
                        source={require('../src/img/ny.jpg')}
                        />
                        
                        
                        <Text>Operado por: </Text>
                        <Text>Origen: {dato} </Text>
                        <Text>Destino: </Text>
                        <Text>Hora - Salida: </Text>
                        <Text>Precio: </Text>

                        <View style={{ flexDirection: 'row', marginTop:40 }}>
                            <TouchableOpacity onPress={() => setOpenModal(false)} style={{ flex: 1, alignItems: 'center', backgroundColor: '#EA5F5F', padding:5, borderRadius:10, marginRight:5,borderWidth:1, borderColor:'red'  }}>
                                <Text style={{ color: 'white' }}>Salir</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setOpenModal(false)} style={{ flex: 1, alignItems: 'center', backgroundColor: '#69C353', padding:5, borderRadius:10,marginLeft:5  }}>
                                <Text style={{ color: 'white' }}>Continuar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </Modal>
        )
    }

    return(




        <View style={{flex:1, backgroundColor:'cyan', alignItems:'center',justifyContent:'center' }}>

            <Text style={{fontSize:40, textTransform:'capitalize', textAlign:'center', fontWeight:'600', color:'black'}}>
                Resposive Modal
            </Text>

            <TouchableOpacity style={styles.Boton_touch}
                onPress={()=>setOpenModal(true)}>

                <Text style={{color:'black', fontSize:20,}}>Ver Oferta</Text>                
            </TouchableOpacity>
            {modal_render(5)}
        </View>






    );
}
export default ModalExample;

const styles = StyleSheet.create({
    //Imagenes de inicio
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
        backgroundColor: transparent
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