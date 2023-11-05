import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';

export default function CreditCard() {
    const navigation = useNavigation();
    const [cardNumber, setCardNumber] = useState('');//ESTADO PARA EL NUMERO DE LA TARJETA
    // const [dateEnd, setDateEnd] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [code, setCode] = useState('');
    const [backCard, setBackCard] = useState(false);//ESTADO QUE ACTIVARA LA PARTE DE ATRAS DE LA TARJETA

    const formatCardNumber = (input) => {
        // Elimina espacios y limita a 16 dígitos
        const formatted = input.replace(/\s/g, '').slice(0, 16);
        let formattedWithSpaces = '';

        for (let i = 0; i < formatted.length; i += 4) {
            formattedWithSpaces += formatted.slice(i, i + 4) + ' ';
        }

        return formattedWithSpaces.trim();
    };

    const formatExpiryDate = (month, year) => {
        if (!month) {
            return ""
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

        if (cardNumberRegex.test(cardNumber) && expiryDateRegex.test(expiryMonth + '/' + expiryYear) && cvvRegex.test(code) && parseInt(expiryYear, 10) >= currentYear) {
            Alert.alert('Compra exitosa!');
            navigation.navigate('Principal');
        } else {
            Alert.alert('Debes de llenar todos los datos correctamente');
        }
    }

    return (
        <View style={styles.container}>
            {backCard == false ?
                <View style={styles.card}>
                    <View style={{ marginTop: 45, marginLeft: 25 }}>
                        <MaterialCommunityIcons name="integrated-circuit-chip" size={50} color="#E5D41F" />
                    </View>
                    <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
                    <Text style={styles.carDate}>{formatExpiryDate(expiryMonth, expiryYear)}</Text>
                </View>
                :
                <View style={styles.card}>
                    <View style={{ backgroundColor: "black", marginTop: 20, height: 40 }}>
                        <Text></Text>
                    </View>
                    <View>
                        <Text style={styles.cardNumber}>{code}</Text>
                    </View>
                </View>
            }
            <View style={styles.containerarrows}>
                <TouchableOpacity
                    onPress={() => { setBackCard(false); }}
                >
                    <Entypo name="arrow-bold-left" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setBackCard(true); }}
                >
                    <Entypo name="arrow-bold-right" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Número de tarjeta"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={(text) => { setCardNumber(text); setBackCard(false); }}
                maxLength={16} // 16 dígitos sin contar los espacios
            />
            <View style={styles.expiryInputContainer}>
                <TextInput
                    style={styles.expiryInput}
                    placeholder="MM"
                    keyboardType="numeric"
                    value={expiryMonth}
                    onChangeText={(text) => { setExpiryMonth(text); setBackCard(false); }}
                    maxLength={2}
                />
                <Text style={styles.slash}>/</Text>
                <TextInput
                    style={styles.expiryInput}
                    placeholder="YY"
                    keyboardType="numeric"
                    value={expiryYear}
                    onChangeText={(text) => { setExpiryYear(text); setBackCard(false); }}
                    maxLength={2}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Codigo de seguridad"
                keyboardType="numeric"
                value={code}
                onChangeText={(text) => { setCode(text); setBackCard(true); }}
                maxLength={3}
            />
            <TouchableOpacity style={styles.saveButton}
            // onPress={handleSave}
            >
                <Text style={styles.saveButtonText} onPress={()=>navigation.navigate('Principal')} >Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}
            // onPress={handleSave}
            >
                <Text style={styles.saveButtonText} onPress={()=>confirmarPago()} >Realizar Pago</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#0F36E5',
        borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    cardNumber: {
        fontSize: 20,
        color: 'white',
        marginLeft: 25,
        marginTop: 10,
    },
    carDate: {
        fontSize: 10,
        color: 'white',
        marginLeft: 25,
        marginTop: 8
    },
    input: {
        marginTop: 15,
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    expiryInput: {
        flex: 1,
        width: 150,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    slash: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 5,
    },
    expiryInputContainer: {
        flexDirection: 'row',
        width: 300,
        marginTop: 10
    },
    expiryDate: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 16,
        color: 'white',
    },
    saveButton: {
        marginTop: 20,
        width: 200,
        height: 40,
        backgroundColor: '#4889E5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        fontSize: 16,
        color: 'white',
    },
});