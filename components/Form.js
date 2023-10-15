import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Image } from 'react-native';

export default function Form() {
    return (
        <SafeAreaView>
            <View style={{ alignItems: "center", height: "100%", justifyContent: "center" }}>
                <View style={{ marginBottom: 20 }}>
                    <Image
                        source={require('../src/img/Logo1.png')}
                        style={{ width: 350, height: 100 }}
                    />
                </View>
                <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ width: "60%", fontSize: 18, fontWeight: "bold" }}>Informacion Personal</Text>
                    <Text style={{ width: "25%", textAlign: "center", fontSize: 15, color: "blue" }}>Editar</Text>
                </View>
                <View style={{
                    width: "80%", height: "50%", flexDirection: "column", justifyContent: "space-around",
                    marginTop: 20
                }}>
                    <View>
                        <Text>Nombre</Text>
                        <TextInput style={styles.inputs} />
                    </View>
                    <View>
                        <Text>Apellido</Text>
                        <TextInput style={styles.inputs} />
                    </View>
                    <View>
                        <Text>Correo Electronico</Text>
                        <TextInput style={styles.inputs} />
                    </View>
                    <View>
                        <Text>Pasaporte</Text>
                        <TextInput style={styles.inputs} />
                    </View>
                    <View>
                        <Text>Numero de Telefono</Text>
                        <View style={{ flexDirection: "row", height: 40 }}>
                            <View style={{ backgroundColor: "blue", justifyContent: "center", width: "15%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
                                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>+503</Text>
                            </View>
                            <TextInput style={{ backgroundColor: '#dcdcdc', width: "85%", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputs: {
        backgroundColor: '#dcdcdc',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 40
    },
});
