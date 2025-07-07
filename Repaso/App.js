//Zona 1. Importaciones
import { StatusBar } from 'expo-status-bar';
//Hooks****
//useState: Sirve para crear y manejar estados en un componente funcional
//useEffect: se usa para realizar efectos secundarios (Llamar APIs, Escuchar eventos, Temporizadores, Cambiar titulo de la app, etc. )
import React, { useState, useEffect } from 'react';
//Componentes*****
//ImageBackground: Añadir un fondo a la aplicación y poder poner otros componentes encima
//Switch: Componente para mostrar un switch
//Button: Componente para mostrar un boton
//TextInput: Componente Input 
//TouchableOpacity: componente que detecta toques y cambia su opacidad cuando el usuario interactúa con él
//ScrollView: componente contenedor que permite hacer scroll vertical (o horizontal) cuando el contenido es más grande que la pantalla
//ActivityIndicator: Es un componente que muestra un spinner (círculo girando) para indicar que la app está cargando algo
//Alert: Muestra una ventana emergente (popup) con un mensaje, un título y uno o más botones.
//FlatList y SectionList
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, Switch, Button, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, SectionList, FlatList } from 'react-native';
//SafeAreaView: componente que asegura que tu contenido no se vea tapado por zonas "no seguras"
//SafeAreaProvider: Se utiliza para evitar que tu contenido se sobreponga con áreas no seguras del dispositivo


//Extra: SplashScreen  pantalla de bienvenida que aparece al abrir una aplicación, antes de que se cargue el contenido principal

//Componente para el SplashScreen
const FondoBienvenida = () => {
  return (
    <ImageBackground
      source={require('./assets/fondo.png')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titulo}>¡Bienvenido a la App!</Text>
      </View>
    </ImageBackground>
  );
};

//Activity Indicator
const IndicadorCarga=({color,size})=>{
  return <ActivityIndicator style={styles.indicador} color={color} size={size}/>
}

//Zona 2. Main
export default function App() {

//-------------------------------------------------------------------------
  //Estado del SplashScreen
  const [showSplash, setShowSplash] = useState(true);

  //Evento secundario del SplashScreen (Temporizador)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);  // Ocultar splash después de 3 segundos
    }, 3000); //Se pueden cambiar los segundos

    return () => clearTimeout(timer); // Limpiar timer al desmontar
  }, []);
//-------------------------------------------------------------------------
  //Estado para un flatlist
  const [showFlatList, setShowFlatList] = useState(false);
  //Datos estaticos para simular el flatlist y sectionlist
  const [datosSeccionados, setDatosSeccionados] = useState([
    {
      title: 'Mensajes Destacados',
      data: [
        { id: '1', nombre: 'Ana', mensaje: '¡Hola!' },
        { id: '2', nombre: 'Juan', mensaje: 'Salinas mató a Colosio.' },
      ],
    },
    {
      title: 'Mis Recordatorios',
      data: [
        { id: '3', nombre: 'Yo', mensaje: 'Comprar comida para la semana.' },
        { id: '4', nombre: 'Yo', mensaje: 'Revisar el clima.' },
        { id: '5', nombre: 'Yo', mensaje: 'Preocuparme por las tareas pendientes.' },
      ],
    },
    {
      title: 'Ideas para Proyectos',
      data: [
        { id: '6', nombre: 'Recetas', mensaje: 'App de recetas personalizadas.' },
        { id: '7', nombre: 'Copia de notion', mensaje: 'Un rastreador de hábitos diario.' },
      ],
    },
  ]);

  const [datosFlatList, setDatosFlatList] = useState([
    { id: '1', nombre: 'María', mensaje: 'Buenos días a todos' },
    { id: '2', nombre: 'Pedro', mensaje: 'Recordar la junta de mañana' },
    { id: '3', nombre: 'Luis', mensaje: 'Enviar el reporte semanal' },
    { id: '4', nombre: 'Carmen', mensaje: 'Revisar las tareas pendientes' },
    { id: '5', nombre: 'Roberto', mensaje: 'Actualizar la documentación' },
    { id: '6', nombre: 'Sofia', mensaje: 'Preparar presentación' },
  ]);

  // Función para renderizar cada item individual
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemNombre}>{item.nombre}</Text>
      <Text style={styles.itemMensaje}>{item.mensaje}</Text>
    </View>
  );
//-------------------------------------------------------------------------

// Estado de Switch
  const [aceptaTerminos, setAceptaTerminos] = useState(false);


//-------------------------------------------------------------------------
// Estado de Activity Indicator
const[cargando, setCargando]= useState(false);

const iniciarCarga=()=>{
    setCargando(true);
    setTimeout(()=>{
        setCargando(false)
      }, 10000)
  }

//-------------------------------------------------------------------------

// Estados de nombre y correo para el alert
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
//-------------------------------------------------------------------------
//Funcion para que al momento de darle al boton inicie el activity indicator y despues muestre la alerta
const manejarRegistro = () => {
  if (nombre.trim() === '' || correo.trim() === '') {
    Alert.alert('Error', 'Por favor escribe tu nombre y correo');
    return;
  } else if (!aceptaTerminos) {
    Alert.alert('Error', 'Debes aceptar los términos y condiciones');
    return;
  }

  setCargando(true); // Mostrar el ActivityIndicator

  // Simular carga de 3 segundos y luego mostrar la alerta
  setTimeout(() => {
    setCargando(false); // Ocultar el ActivityIndicator

    Alert.alert(
      'Bienvenid@',
      `${nombre}, te has convertido en un michi >:3\nTu correo es: ${correo}`
    );
  }, 3000); // Puedes ajustar el tiempo de carga aquí
};
//-------------------------------------------------------------------------

  return (
    //SafeAreaView para despues poner nuestro componente splashScreen
    <SafeAreaView style={styles.container}>
      {showSplash ? (
        <FondoBienvenida />
      ) : (
        //View donde guarda el resto de nuestra app
        <View style={styles.mainContent}>
          {/*Componente ImageBackground, este va a encerrar toda la app pq sera el fondo que usaremos en toda la app de repaso */}
          <ImageBackground source={require('./assets/fondo2.png')} style={styles.fondo} resizeMode="cover">
            {/* ScrollView porque agregaremos varias cosas*/}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.textoPrincipal}>PRACTICA REPASO</Text>
              <View style={styles.formulario}>
                {/* Text inputs */}
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
                  {/* Componente Switch */}
                  <View style={styles.switchContainer}>
                    <Switch
                      value={aceptaTerminos}
                      onValueChange={setAceptaTerminos}
                    />
                    <Text style={styles.switchText}>Acepto los términos y condiciones</Text>
                  </View>
                  {/* Condicion para activityIndicator*/}
                  {cargando ? (
                    <IndicadorCarga color="deepskyblue" size="large"/>
                  ):(
                    <Text style={styles.textoSecundario}>Presiona el botón para comenzar tu registro</Text>
                  )}
                  {/*Componente Button */}
                  <Button title='Registrarse' onPress={manejarRegistro} />
              </View>

              {/* Aqui empieza el flatlist y secionlist*/}
              {/* Barra de estado del dispositivo */}
              <StatusBar barStyle="dark-content" /> 
              
              {/* Título dinámico que cambia según el tipo de lista */}
              <Text style={styles.tituloFL}>{showFlatList ? 'Flat List' : 'Section List'}</Text>
              
              {/* Botón para alternar entre SectionList y FlatList */}
              <TouchableOpacity 
                style={styles.switchButton} 
                onPress={() => setShowFlatList(!showFlatList)}
              >
                <Text style={styles.switchButtonText}>
                  Cambiar a {showFlatList ? 'SectionList' : 'FlatList'}
                </Text>
              </TouchableOpacity>    

              {/* Renderizado condicional: muestra FlatList o SectionList según el estado */}
              {showFlatList ? (
                  <FlatList
                    data={datosFlatList}                    // Datos a mostrar
                    keyExtractor={(item) => item.id}        // keyExtractor: Función que extrae una key única de cada item para optimizar el renderizado. React Native usa estas keys para identificar qué elementos cambiaron, se agregaron o eliminaron
                    renderItem={renderItem}                 // Función para renderizar cada item
                    style={styles.list}                     // Estilos del contenedor
                    contentContainerStyle={styles.listContent} // Estilos del contenido interno
                  />
                ) : (
                  // SectionList: lista organizada en secciones con headers
                  <SectionList
                    sections={datosSeccionados}             // Datos organizados por secciones
                    keyExtractor={(item, index) => item.id + index} // Key única por item
                    renderItem={renderItem}                 // Función para renderizar cada item
                    renderSectionHeader={({ section: { title } }) => ( // Renderiza el header de cada sección
                      <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    style={styles.list}                     // Estilos del contenedor
                    contentContainerStyle={styles.listContent} // Estilos del contenido interno
                  />     
                )}
            </ScrollView>
          </ImageBackground> 
        </View> 
      )}
    </SafeAreaView>
  );
}

//Zona 3. Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  //Estilos para splashScreen e imagebackground
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
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
  width: 150,
  height: 150,
  marginBottom: 20,   
  },
  textoPrincipal:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
    color: '#2e2e2e'
  },
  //Estilo para scrollview
  scrollContent: {
  padding: 20,
  alignItems: 'center',
  paddingBottom: 100,
  },
  //Estilos para nuestro flatlist y sectionlist
  tituloFL: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  switchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  switchButtonText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '100%', 
  },
  listContent: {
    paddingBottom: 20, 
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 15, 
    color: '#222',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
   itemNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  itemMensaje: {
    fontSize: 16,
    color: '#555',
  },
  //Estilos para inputs
  formulario: {
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
//Estilos para el switch
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
  
//Estilos para activity indicator
textoSecundario:{
    fontSize: 16,
    marginVertical: 20,
    color: '#3a3a3a',
  },

  indicador:{
    marginBottom: 20,
  }
});
