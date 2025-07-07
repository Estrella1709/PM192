import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native';
import axios from 'axios';

import bgImage from './assets/image.png';

const API_KEY = '660f803509a94a15ac5203133250707';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setSuggestionsLoading(true);
      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
        );
        setSuggestions(res.data); // Array con objetos {id, name, region, country, lat, lon}
      } catch (error) {
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    };

    fetchSuggestions();
  }, [city]);

  const addCity = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setSuggestions([]);
    Keyboard.dismiss();

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&lang=es`
      );

      const data = response.data;
      const cityWeather = {
        id: data.location.name.toLowerCase() + ',' + data.location.country.toLowerCase(), // id único ciudad+país
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: 'https:' + data.current.condition.icon,
      };

      if (!weatherList.some(item => item.id === cityWeather.id)) {
        setWeatherList([...weatherList, cityWeather]);
      } else {
        Alert.alert('Aviso', 'Ya agregaste esa ciudad.');
      }

      setCity('');
    } catch (error) {
      Alert.alert('Error', 'Ciudad no encontrada o error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const eliminarCiudad = (id) => {
    setWeatherList(weatherList.filter(ciudad => ciudad.id !== id));
  };

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>☀️ Clima al Instante</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ej: Ciudad de México"
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
            autoCapitalize="words"
          />
          <TouchableOpacity style={styles.button} onPress={() => addCity(city)}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de sugerencias */}
        {suggestionsLoading && (
          <ActivityIndicator size="small" color="#A3BEDC" style={{ marginBottom: 10 }} />
        )}
        {!suggestionsLoading && suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => `${item.id}-${item.name}-${item.country}`}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => addCity(`${item.name}, ${item.country}`)}
                >
                  <Text style={styles.suggestionText}>
                    {item.name}, {item.region ? item.region + ', ' : ''}{item.country}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#A3BEDC" />
            <Text style={styles.loadingText}>Obteniendo clima...</Text>
          </View>
        )}

        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 20 }}>
          {weatherList.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.icon }} style={styles.icon} />
                <View style={{ marginLeft: 15, flex: 1 }}>
                  <Text style={styles.cityName}>
                    {item.name}, <Text style={styles.countryName}>{item.country}</Text>
                  </Text>
                  <Text style={styles.temp}>{item.temp}°C</Text>
                  <Text style={styles.condition}>{item.condition}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => eliminarCiudad(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.removeButtonText}>Eliminar ciudad</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(232, 240, 254, 0.85)',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4A6FA5',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#B8C4D8',
    fontSize: 16,
    color: '#4A4A4A',
    shadowColor: '#9CA3B7',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: '#A3BEDC',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 15,
    shadowColor: '#7892C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  suggestionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    maxHeight: 140,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  scroll: {},
  card: {
    backgroundColor: '#FFFFFFCC',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 18,
    shadowColor: '#8CA0D7',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 60,
    height: 60,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B4A72',
  },
  countryName: {
    fontWeight: '400',
    fontSize: 16,
    color: '#7193B2',
  },
  temp: {
    fontSize: 18,
    color: '#7193B2',
    fontWeight: '600',
    marginTop: 4,
  },
  condition: {
    fontSize: 15,
    color: '#8B9CC4',
    marginTop: 2,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  removeButton: {
    backgroundColor: '#FF8C94',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    shadowColor: '#D46A6A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4A6FA5',
  },
});
