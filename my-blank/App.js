
/* Zona 1: Importaciones*/
import { StatusBar } from 'expo-status-bar';
import { use, useState } from 'react';
import { StyleSheet, Text, TextInput, Input, Alert, View, Switch, Button} from 'react-native';


/* Zona 2: Main*/
export default function App() {

  const[nombre,setNombre]=useState('');

  const mostrarAlerta=()=>{
    if(nombre.trim()===''){
      Alert.alert('error', 'Por favor escribe algo');
      alert('Escribe algo');
    }else{
      Alert.alert('Boenvenido',`hola ${nombre}, bienvenido a nuestra app :P`);
      alert('Hola ' + nombre + ' bienvenido');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ingresa tu nombre
      </Text>
      <TextInput
      style={styles.input}
      placeholder='Escrube tu nombre: '
      onChangeText={setNombre}
      value={nombre}
      ></TextInput>

      <Button title='Enviar' onPress={mostrarAlerta}></Button>
    </View>
  );
}

/* Zona 3: Estilos*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: 'white'
  },
  text:{
    fontSize: 18,
    marginBottom: 10,
    color: '#000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    color: '#000'
  }

});
