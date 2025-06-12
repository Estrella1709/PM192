
/* Zona 1: Importaciones*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react';

const Texto=()=>{
  const[contenido, setContenido]=useState('Hola mundo react')
  const actualizarTexto=()=>{
    setContenido('Estado actualizado')
  }
  return(
    <Text onPress={actualizarTexto}>{contenido}</Text>
  )
}

/* Zona 2: Main*/
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto></Texto>  
      <Texto></Texto> 
      <Texto></Texto>       
      <Button title="Presioname!"></Button>
      

    </View>
  );
}

/* Zona 3: Estilos*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
