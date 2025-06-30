import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Button, ActivityIndicator} from 'react-native';

const IndicadorCarga=({color,size})=>{
  return <ActivityIndicator style={styles.indicador} color={color} size={size}/>
}

export default function App() {
  
  const[cargando, setCargando]= useState(false);

  const iniciarCarga=()=>{
    setCargando(true);
    setTimeout(()=>{
        setCargando(false)
      }, 10000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textoPrincipal}>Uso de ActivityIndicator</Text>

      {cargando ? (
        <IndicadorCarga color="deepskyblue" size="large"/>
      ):(
        <Text style={styles.textoSecundario}>Presiona el botón para comenzar</Text>
      )}

      <Button title= "Iniciar Carga" onPress={iniciarCarga} color="#ff6f61"/>
      <StatusBar style="auto"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCFF91',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  textoPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2e2e2e'
  },

  textoSecundario:{
    fontSize: 16,
    marginVertical: 20,
    color: '#3a3a3a',
  },

  indicador:{
    marginBottom: 20,
  }
  
});