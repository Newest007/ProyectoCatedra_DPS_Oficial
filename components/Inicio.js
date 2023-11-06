import React, { useState } from "react";
import { Icon } from "react-native-elements";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Modal,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";

const Inicio = () => {
  const [modalVisibleplaya, SetModalVisibleplaya] = useState(false);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.QuickSearchBackgroudStyle}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
            alignContent: "flex-start",
          }}
        >
          {" "}
          Hola...¿A donde deseas viajar?
        </Text>

        <View style={styles.ContainerTextImputStyle}>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Icon name="search" />
          </TouchableOpacity>
          <TextInput
            style={styles.TextImputStyle}
            placeholder="Selecciona tu Destino"
          />
        </View>
      </View>

      <View style={styles.PromoContainerStyle}>
        <Text style={{ fontWeight: "bold", marginVertical: 10, fontSize: 15 }}>
          Vuelos en Promoción
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "blue",
              fontSize: 10,
            }}
          >
            Más promociones
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ImageContainer}>
          <ImageBackground
            style={styles.ImageStyle}
            imageStyle={{ borderRadius: 15 }}
            source={require("../src/img/lima.jpg")}
          >
            <Text style={styles.TextImageImputStyle}>Lima</Text>
            <TouchableOpacity>
              <View style={styles.ButtonImageStyle}>
                <Text style={styles.TextImageButtonStyle}>Desde $150</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            style={styles.ImageStyle}
            imageStyle={styles.InsideImageStyle}
            source={require("../src/img/rio-j.jpg")}
          >
            <Text style={styles.TextImageImputStyle}>Rio de Janeiro</Text>
            <TouchableOpacity>
              <View style={styles.ButtonImageStyle}>
                <Text style={styles.TextImageButtonStyle}>Desde $150</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.ImageContainer}>
          <ImageBackground
            style={styles.ImageStyle}
            imageStyle={{ borderRadius: 15 }}
            source={require("../src/img/ny.jpg")}
          >
            <Text style={styles.TextImageImputStyle}>nueva York</Text>
            <TouchableOpacity>
              <View style={styles.ButtonImageStyle}>
                <Text style={styles.TextImageButtonStyle}>Desde $150</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            style={styles.ImageStyle}
            imageStyle={styles.InsideImageStyle}
            source={require("../src/img/los-angeles.jpg")}
          >
            <Text style={styles.TextImageImputStyle}>Los Angeles</Text>
            <TouchableOpacity>
              <View style={styles.ButtonImageStyle}>
                <Text style={styles.TextImageButtonStyle}>Desde $150</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  TextImageButtonStyle: {
    margin: 10,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  ButtonImageStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",

    margin: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  ImageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  InsideImageStyle: {
    borderRadius: 15,
  },
  ImageStyle: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.25,
    margin: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  MainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },

  QuickSearchBackgroudStyle: {
    backgroundColor: "#cdcbf0",
    width: Dimensions.get("window").width * 1,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  TextImputStyle: {
    textAlign: "left",
    marginLeft: 10,
    marginRight: 15,
    flex: 1,
    fontSize: 17,
  },
  TextImageImputStyle: {
    textAlign: "center",

    margin: 10,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  ContainerTextImputStyle: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 18,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.05,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  PromoContainerStyle: {
    width: Dimensions.get("window").width * 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Inicio;
