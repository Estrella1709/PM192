/* Zona 1: importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View,ImageBackground, SafeAreaView,  Image, Alert, Switch} from 'react-native';
import React, { useState, useEffect } from 'react';

//ImageBackground para el SplashScreen
const FondoSplash = () => {
  return (
    <ImageBackground source={require('./assets/fondo.png')} style={styles.fondo} resizeMode="cover">
      <View style={styles.contenido}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titulo}>¡Bienvenido! Tu michi registro esta iniciando</Text>
      </View>
    </ImageBackground>
    );
  };


/* Zona 2: Main*/
export default function App() {
  //Switch
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  //Alert
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const mostrarAlerta = () => {
    if (nombre.trim() === '' || correo.trim() === '') {
      Alert.alert('Error', 'Por favor escribe tu nombre y correo');
    } else if (!aceptaTerminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
    } else {
      Alert.alert(
        'Bienvenid@',
        `${nombre}, te has convertido en un michi >:3\nTu correo es: ${correo}`
      );
    }
  };

  //SplashScreen
  const [showSplash, setShowSplash] = useState(true);
  //SplashScreen
  useEffect(() => {
  const timer = setTimeout(() => {
  setShowSplash(false);
  }, 5000);
  return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    {showSplash ? (
    //ImageBackground para el SplashScreen
    <FondoSplash />
    ) : (
      <ImageBackground source={require('./assets/fondo2.png')} style={styles.fondo} resizeMode="cover">
        <View style={styles.formulario}>
        <TextInput
        style={styles.input}
        placeholder='Escribe tu nombre completo'
        onChangeText={setNombre}
        value={nombre}
        />
        <TextInput
        style={styles.input}
        placeholder='Escribe tu correo electronico'
        onChangeText={setCorreo}
        value={correo}
        />
        <View style={styles.switchContainer}>
          <Switch
            value={aceptaTerminos}
            onValueChange={setAceptaTerminos}
          />
          <Text style={styles.switchText}>Acepto los términos y condiciones</Text>
        </View>
        <Button title='Registrarse' onPress={mostrarAlerta}/>
        </View>
      </ImageBackground>
  
    )}
    </SafeAreaView>
  );
}
/* Zona 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  mainText: {
  fontSize: 24,
  fontWeight: 'bold',
  },
  fondo: {
  flex: 1,
  width: '100%',
  height: '100%',
  },
  contenido: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  titulo: {
  fontSize: 28,
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',     
  paddingHorizontal: 20,  
  },
  logo: {
  width: 150,
  height: 150,
  marginBottom: 20,   
  },
  formulario: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  },
  input: {
  height: 50,
  width: 280,
  backgroundColor: '#fff',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 10,
  marginBottom: 15,
  paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },


});
