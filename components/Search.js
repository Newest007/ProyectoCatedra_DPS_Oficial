import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions, Button, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Search = () => {
  const [origen, setOrigen] = useState('Seleccionar el origen');
  const [destino, setDestino] = useState('Seleccionar el destino');
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [activo, setActivo] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("Fecha de salida");
  const [fechaFin, setFechaFin] = useState("Fecha de retorno");
  const handleOpcionOrigen = (value) => {
    setOrigen(value)
  }
  const handleOpcionDestino = async (value) => {
    setDestino(value)
    try {
      const response = await axios.get(`https://lis03l2023gc180313.000webhostapp.com/Oferta/destino/${value}`);
      setFechaInicio(response.data[0].Fecha_inicio)
      setFechaFin(response.data[0].Fecha_fin)
    } catch (error) {
      console.error('Hubo un error al obtener los datos:', error);
    }

  }
  const handleActivo =() => {
    setActivo(!activo)
  }
  const handleSumarPersonas = () => {
    if(cantidadPersonas < 4){
    setCantidadPersonas(cantidadPersonas + 1);
  }
  }
  const handleRestarPersonas = () => {
    if(cantidadPersonas > 1){
    setCantidadPersonas(cantidadPersonas - 1);
    }
  }
  //Manejo de fecha 
  return (
    <>
      <View style={styles.MainContainerStyle}>
        <View style={styles.SearchCountriesContStyle}>
          <Text style={styles.BoldTextStyle}>¿A Donde Quieres viajar?</Text>

          {/** 
          <View style={styles.ContainerTextImputStyle}>
            <TouchableOpacity style={{ marginLeft: 15 }}>
             
            </TouchableOpacity>
             </View>
            */}

          <View>
            <Icon name='search' />
            <Picker
              selectedValue={origen}
              onValueChange={(value) => { handleOpcionOrigen(value) }}
              style={styles.inputPicker}
            >
              <Picker.Item label='Seleccionar el origen' value="Seleccionar el origen" />
              <Picker.Item label='Aeropuerto Internacional El Salvador (SAL)' value="Aeropuerto Internacional El Salvador (SAL)" />
            </Picker>
          </View>

          <TouchableOpacity>
            <Icon name='swap-vert' color='black' size={40} />
          </TouchableOpacity>
            {/** 
          <View style={styles.ContainerTextImputStyle}>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Icon name='search' />
            </TouchableOpacity>
            <TextInput style={styles.TextImputStyle} placeholder="Selecciona tu pais de llegada" />
          </View>*/}
          <View>
          <Picker
            selectedValue={destino}
            onValueChange={(value) => { handleOpcionDestino(value)}}
            style={styles.inputPicker}
          >
            <Picker.Item label='Seleccionar el destino' value="Seleccionar el destino" />
            <Picker.Item label='Mexico' value="Mexico" />
            <Picker.Item label='Estados Unidos' value="Estados-Unidos" />
          </Picker>
        </View>
        </View>

        

        <View style={styles.MainRadioButtonContainer}>
          <TouchableOpacity style={styles.RadioButtonContainer} onPress={handleActivo}>
            <Icon name={activo? 'radio-button-checked' : 'radio-button-unchecked'} color='blue' />
            <Text style={{ marginLeft: 5 }}>Ida y Vuelta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.RadioButtonContainer} onPress={handleActivo}>
            <Icon name={activo? 'radio-button-unchecked' : 'radio-button-checked'} color='blue' />
            <Text style={{ marginLeft: 5 }}>Solo Ida</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ContainerDatesMain}>
          <View style={styles.DateStyle}>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Icon name="event" />
            </TouchableOpacity>
            <TextInput style={{ marginRight: 15, marginLeft: 5 }} editable={false}>{fechaInicio !== "Fecha de salida"? fechaInicio:"Fecha de salida"} </TextInput>
          </View >

          <View style={styles.DateStyle}>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Icon name="event" />
            </TouchableOpacity>
            <TextInput style={{ marginRight: 15, marginLeft: 5 }} editable={false}>{fechaFin !== "Fecha de retorno"? fechaFin:"Fecha de retorno"}</TextInput>
          </View >
        </View>

        <View style={styles.ContainerPerson}>
          <View style={{ marginLeft: 15, }}>
            <Icon name="person" />
          </View>
          <Text style={styles.AddPersonStyle}>{cantidadPersonas} persona</Text>
          <View style={styles.IconAddRemove}>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={handleRestarPersonas}>
              <Icon name="remove" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSumarPersonas}>
              <Icon name="add" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>
          <View style={styles.SearchButton}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Buscar</Text>
          </View>
        </TouchableOpacity>


      </View>
    </>
  )
};

const styles = StyleSheet.create({
  MainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
    
  },
  BoldTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'

  },
  SearchCountriesContStyle: {
    marginTop: 35

  },

  ContainerTextImputStyle: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: 'black',       // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (horizontal, vertical)
    shadowOpacity: 0.5,         // Opacidad de la sombra (0 a 1)
    shadowRadius: 5,            // Radio de la sombra
    elevation: 5
  },
  TextImputStyle: {
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 15,
    flex: 1

  },
  MainRadioButtonContainer: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.03
    ,
    flexDirection: 'row',
    justifyContent: 'space-around',


  },
  RadioButtonContainer: {

    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',



  },
  ContainerDatesMain: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 18,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  DateStyle: {
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get("window").height * 0.05,
    shadowColor: 'black',       // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (horizontal, vertical)
    shadowOpacity: 0.5,         // Opacidad de la sombra (0 a 1)
    shadowRadius: 5,            // Radio de la sombra
    elevation: 5
  },
  ContainerPerson: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',       // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (horizontal, vertical)
    shadowOpacity: 0.5,         // Opacidad de la sombra (0 a 1)
    shadowRadius: 5,            // Radio de la sombra
    elevation: 5

  },
  IconAddRemove: {
    marginRight: 15,
    flexDirection: 'row',


  },
  AddPersonStyle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  SearchButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#2c278d',
    borderRadius: 18,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.05,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center',
    shadowColor: 'black',       // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (horizontal, vertical)
    shadowOpacity: 0.5,         // Opacidad de la sombra (0 a 1)
    shadowRadius: 5,            // Radio de la sombra
    elevation: 5



  }, inputPicker: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    marginBottom: 10,
  },

});

export default Search;
