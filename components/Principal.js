import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
} from "react-native";
//import Login from './components/login';
import PagInicio from "./Inicio";
import Search from "./Search";
import Form from "./Form";
//import Account from './components/account';

//Para react navigation bottom
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

export default function Principal({url}) {
  const Tab = createBottomTabNavigator();

  function SettingsScreen() {
    const [modalVisibleResult, setModalVisibleResult] = useState(false);
    const [flightData, setFlightData] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);

    //Consulta que contiene todas las ofertas 
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
                const response = await fetch('https://lis03l2023gc180313.000webhostapp.com/Oferta/index/0', {
                    method: "GET",
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                const data = await response.json();
                setFlightData(data);
                console.log(data)
            } catch (error) {
                console.error('Hubo un problema con la solicitud fetch:', error);
            }
        }
        consultaApi()
    }, []);



    return (
      <ScrollView>
      <View style={styles.maincontainer}>
          {flightData.map((flight, index) => (
              <TouchableOpacity
                  key={index}
                  onPress={() => {
                      setSelectedFlight(flight); 
                      setModalVisibleResult(true); 
                  }}
              >
                  <View style={styles.resultscontainer}>
                     
                      <Text style={styles.midtextstyle}>De</Text>
              <Text style={styles.textLeft}>{flight.Origen_v}</Text>
              <Text style={styles.midtextstyle}>A</Text>
              <Text style={styles.textCenter}>{flight.Destino_v}</Text>
              <Text style={styles.midtextstyle}>Por tan solo:</Text>
              <Text style={styles.textRight}>{flight.Precio}</Text>
                  </View>
              </TouchableOpacity>
          ))}

<Modal
                transparent={true}
                animationType="slide"
                visible={modalVisibleResult}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <View style={styles.vistamodal}>
                    <View style={styles.modal}>
                        <Text style={styles.subtitulo}>Información del vuelo</Text>
                        {selectedFlight && ( // Verifica si hay un vuelo seleccionado
                            <View style={{alignItems:'left', margin: 15, width: '100%'}}>
                                <Text>Pais Salida: {selectedFlight.Origen_v}</Text>
                                <Text>Pais Destino: {selectedFlight.Destino_v}</Text>
                                <Text>Hora de salida: {selectedFlight.Hora_salida}</Text>
                                <Text>Fecha de salida: {selectedFlight.Fecha_inicio}</Text>
                                <Text>Aerolinea: {selectedFlight.Nombre_aerolinea}</Text>
                                <Text>Asientos disponibles: {selectedFlight.Asientos_disponibles}</Text>
                                <Text>Precio en oferta: ${selectedFlight.Precio}</Text>
                                {/* Otros detalles del vuelo */}
                            </View>
                        )}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                            <Button
                                title="Cerrar"
                                onPress={() => setModalVisibleResult(false)}
                            />
                            <Button
                                title="Comprar"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
      </View>
      </ScrollView>
  );
}

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#2c278d", borderRadius: 5 },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#9f9ea7",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={PagInicio}
        options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (                  
          <FontAwesomeIcons name="home" color={color} size={size} />   
          ),
        }}
        />


      <Tab.Screen 
      name="Buscar" 
      component={Search} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="search" color={color} size={size} />
            ),
          }}
          />

      <Tab.Screen name="Ajustes" 
      component={SettingsScreen} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="cog" color={color} size={size} />
            ),
          }}
          />

      <Tab.Screen
        name="Cuenta"
        component={Form}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="user-o" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  resultscontainer: {
    backgroundColor: "#a2a7b0",
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.1,
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textLeft: {
    flex: 1,
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 10,
    height: "100%",
    color: "blue",
  },
  textCenter: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 10,
    height: "100%",
    color: "blue",
  },
  textRight: {
    flex: 1,
    textAlign: "right",
    marginRight: 10,
    fontSize: 10,
    textAlignVertical: "center",
    height: "100%",
    color: "blue",
  },
  midtextstyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12,
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
  },
  vistamodal: {
    backgroundColor: "#000000aa",
    flex: 1,
    
  },
  subtitulo: {
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 40,
    borderRadius: 15,
    flex: 1,
    alignItems:'center'
  },
});
