
/* Zona 1: Importaciones*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react';

const Texto=({style})=>{
  const[contenido, setContenido]=useState('Hola mundo react')
  const actualizarTexto=()=>{
    setContenido('Estado actualizado')
  }
  return(
    <Text style={[styles.text, style]} onPress={actualizarTexto}>{contenido}</Text>
  )
}

/* Zona 2: Main*/
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto style={styles.black}></Texto>  
      <Texto style={styles.red}></Texto> 
      <Texto style={styles.yellow}></Texto>    

    </View>
  );
}

/* Zona 3: Estilos*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'str',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  text:{
    color: 'black',
    fontSize:25,
    height:100,
  },
  
  red:{backgroundColor: 'red'},
  black:{backgroundColor: 'black'},
  yellow:{backgroundColor: 'yellow'},

});
