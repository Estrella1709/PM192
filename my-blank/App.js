
/* Zona 1: Importaciones*/
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

/* Zona 2: Main*/
export default function App() {

  const [activarSwitch, setActivarSwitch] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.contenedor, modoOscuro && styles.fondoOscuro]}>

        {/* Aqui van los componentes*/}
        <Text style={[styles.titulo, modoOscuro && styles.textoClaro]}>
            Practica con Switchs
        </Text>

        <View style={styles.opcion}>
            <Text style={[styles.etiqueta, modoOscuro && styles.textoClaro]}>
              Activar Switch 2
            </Text>
            <Switch 
              value={activarSwitch}
              onValueChange={setActivarSwitch}
              trackColor={{false: '#ccc', true:'#4acf50'}}
              thumbColor={activarSwitch?'#ffffff':'#999999'}>
            </Switch>
        </View>

        <View style={styles.opcion}>
            <Text style={[styles.etiqueta, modoOscuro && styles.textoClaro]}>
              Modo Oscuro
            </Text>
            <Switch 
              value={modoOscuro}
              onValueChange={setModoOscuro}
              disabled={!activarSwitch}
              trackColor={
                !activarSwitch
                ?{false: '#ff9999', true: '#ff3b30'}
                :{false: '#ccc', true: '#4acf50'}
              }
              thumbColor={
                !activarSwitch
                ?'#ff3b30'
                :modoOscuro
                ?'#ffffff'
                :'#999999'
              }>
            </Switch>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
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
  titulo:{
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  fondoOscuro:{
    backgroundColor: '#1a1a1a'
  },
  textoClaro:{
    color: '#ffffff'
  },
  opcion:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center'
  },
  etiqueta:{
    fontSize: 18,
  }
});
