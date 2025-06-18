/* Zone 1: Importaciones */
import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

const FondoBienvenida = () => {
  return (
    <ImageBackground
      source={require('./assets/fondo.jpg')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>
        <Text style={styles.titulo}>¡Bienvenido a la App!</Text>
      </View>
    </ImageBackground>
  );
};

/* Zone 2: Main */

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);  // Ocultar splash después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpiar timer al desmontar
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showSplash ? (
        <FondoBienvenida />
      ) : (
        <View style={styles.mainContent}>
          <Text style={styles.mainText}>Esta es la pantalla principal</Text>
          {/* Aquí va el resto de la app después del splash */}
        </View>
      )}
    </SafeAreaView>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
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
});