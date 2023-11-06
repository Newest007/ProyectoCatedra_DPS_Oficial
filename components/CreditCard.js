import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CreditCard({ route }) {
  const { flightData } = route.params;
  console.log("DATOS QUE SE GUARDAN:",flightData);
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState(""); //ESTADO PARA EL NUMERO DE LA TARJETA
  // const [dateEnd, setDateEnd] = useState('');
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [code, setCode] = useState("");
  const [backCard, setBackCard] = useState(false); //ESTADO QUE ACTIVARA LA PARTE DE ATRAS DE LA TARJETA
  const [modalVisible, setModalVisible] = useState(false);
  const formatCardNumber = (input) => {
    // Elimina espacios y limita a 16 dígitos
    const formatted = input.replace(/\s/g, "").slice(0, 16);
    let formattedWithSpaces = "";

    for (let i = 0; i < formatted.length; i += 4) {
      formattedWithSpaces += formatted.slice(i, i + 4) + " ";
    }

    return formattedWithSpaces.trim();
  };

  const formatExpiryDate = (month, year) => {
    if (!month) {
      return "";
    }
    return `${month}/${year}`;
  };

  //Validaciones de pago
  const confirmarPago = () => {
    const cardNumberRegex = /^(?:[0-9]{4}-){3}[0-9]{4}$|^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    const cvvRegex = /^[0-9]{3,4}$/;
    //Obteniendo los ultimos 2 valores del año actual
    const currentYear = new Date().getFullYear().toString().slice(-2);
        
    if (
      cardNumberRegex.test(cardNumber) &&
      expiryDateRegex.test(expiryMonth + "/" + expiryYear) &&
      cvvRegex.test(code) &&
      parseInt(expiryYear, 10) >= currentYear
    ) {
      setModalVisible(true);
    } else {
      Alert.alert("Debes de llenar todos los datos correctamente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pagostyle}>PAGO DE VUELO</Text>
      {backCard == false ? (
        <View style={styles.card}>
          <View style={{ marginTop: 40, margin: 25, flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="integrated-circuit-chip"
              size={50}
              color="#E5D41F"
            />
            <Image
              style={{ height: 60, width: "90%" }}
              source={require("../src/img/Logo1-sfondo.png")}
            ></Image>
          </View>
          <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
          <Text style={styles.carDate}>
            {formatExpiryDate(expiryMonth, expiryYear)}
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={{ backgroundColor: "black", marginTop: 20, height: 40 }}>
            <Text></Text>
          </View>
          <View>
            <Text style={styles.cardNumber}>{code}</Text>
          </View>
        </View>
      )}
      <View style={styles.containerarrows}>
        <TouchableOpacity
          onPress={() => {
            setBackCard(false);
          }}
        >
          <Entypo name="arrow-bold-left" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setBackCard(true);
          }}
        >
          <Entypo name="arrow-bold-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={(text) => {
          setCardNumber(text);
          setBackCard(false);
        }}
        maxLength={16} // 16 dígitos sin contar los espacios
      />
      <View style={styles.expiryInputContainer}>
        <TextInput
          style={styles.expiryInput}
          placeholder="MM"
          keyboardType="numeric"
          value={expiryMonth}
          onChangeText={(text) => {
            setExpiryMonth(text);
            setBackCard(false);
          }}
          maxLength={2}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          style={styles.expiryInput}
          placeholder="YY"
          keyboardType="numeric"
          value={expiryYear}
          onChangeText={(text) => {
            setExpiryYear(text);
            setBackCard(false);
          }}
          maxLength={2}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Codigo de seguridad"
        keyboardType="numeric"
        value={code}
        onChangeText={(text) => {
          setCode(text);
          setBackCard(true);
        }}
        maxLength={3}
      />
      <TouchableOpacity
        style={styles.saveButton}
        // onPress={handleSave}
      >
        <Text
          style={styles.saveButtonText}
          onPress={() => navigation.navigate("Principal")}
        >
          Regresar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
        // onPress={handleSave}
      >
        <Text style={styles.saveButtonText} onPress={() => confirmarPago()}>
          Realizar Pago
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.vistamodal}>
          <View style={styles.modal}>
            <Image
              style={{ height: 60, width: "90%" }}
              source={require("../src/img/Logo1-sfondo.png")}
            ></Image>

<Text style={styles.subtitulo}>GRACIAS POR TU COMPRA</Text>

            {flightData && (
              <Image
                style={styles.imgini}
                source={{ uri: flightData.imagen }}
              />
            )}
            <Text style={{fontSize:20}}>Información del vuelo</Text>
            {flightData && (
              <View style={{ alignItems: "left", margin: 15, width: "100%" }}>
                <Text>Pais Salida: {flightData.Origen_v}</Text>
                <Text>Pais Destino: {flightData.Destino_v}</Text>
                <Text>Hora de salida: {flightData.Hora_salida}</Text>
                <Text>Fecha de salida: {flightData.Fecha_inicio}</Text>
                <Text>Aerolinea: {flightData.Nombre_aerolinea}</Text>
                <Text>TOTAL PAGADO: ${flightData.Precio}</Text>
                
                
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
               onPress={() => {
                setModalVisible(false);  
                navigation.navigate('Principal');  
              }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "#EA5F5F",
                  padding: 5,
                  borderRadius: 10,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: "red",
                }}
              >
                <Text style={{ color: "white" }}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  imgini: {
    width: "100%",
    height: 200,
    marginVertical: 5,
    borderRadius: 15,
  },
  modal_1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  modal_inter: {
    backgroundColor: "white",
    padding: 15,
    width: "90%",
    height: 500,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2c278d",
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
    alignItems: "center",
  },
  pagostyle: {
    fontSize: 20,
    marginBottom: 20,
  },
  containerarrows: {
    // flex: 6,
    width: 300,
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: "gray",
    borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  cardNumber: {
    fontSize: 20,
    color: "white",
    marginLeft: 25,
    marginTop: 10,
  },
  carDate: {
    fontSize: 10,
    color: "white",
    marginLeft: 25,
    marginTop: 8,
  },
  input: {
    marginTop: 15,
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  expiryInput: {
    flex: 1,
    width: 150,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  slash: {
    fontSize: 20,
    alignSelf: "center",
    marginHorizontal: 5,
  },
  expiryInputContainer: {
    flexDirection: "row",
    width: 300,
    marginTop: 10,
  },
  expiryDate: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 16,
    color: "white",
  },
  saveButton: {
    marginTop: 20,
    width: 200,
    height: 40,
    backgroundColor: "#4889E5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default CreditCard;
