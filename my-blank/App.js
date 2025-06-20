
/* Zona 1: Importaciones*/
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch, Alert, Image, TouchableOpacity, Button} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

/* Zona 2: Main*/
export default function App() {

const[botonDesactivado, setBotonDesactivado]=useState(false);
const[contador, setContador]=useState(0);

  return (
    <View style={styles.contenedor}>
      <Button
      title="Presioname"
      color="#841584"
      onPress={()=> alert('Me presionaste')}
      ></Button>

      <Button
        title={botonDesactivado ? "Desactivado" : "Desactívame"}
        disabled={botonDesactivado}
        onPress={() => setBotonDesactivado(true)}
      >
      </Button>

      <View style={styles.botonJustificado}>
        <Button
         title="Left Button"
         color="#674323"
        ></Button>
        <Button
         title="Right button"
         color="#097865"
        ></Button>
      </View>

      <TouchableOpacity
        style={styles.dynamicButton}
        onPress={()=> setContador(contador + 1)}
      >
        <Text style={styles.DynamicText}>{contador}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>alert("La pokebola a sido presionada")}
      >
        <Image
          source={require('./assets/pokebola.jpeg')}
          style={styles.imagen}
        />
      </TouchableOpacity>
    </View>
  );
}

/* Zona 3: Estilos*/
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center' 
  },
  botonJustificado: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dynamicButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#988767',
    borderRadius: 5,
    alignItems: 'center'
  },
  DynamicText: {
    color: '#345676',
    fontSize: 18
  },
  imagen:{
    width: 100,
    height: 100
  }

});
