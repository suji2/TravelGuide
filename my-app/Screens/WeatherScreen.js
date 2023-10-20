import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const weatherIcons = {
  'Clear': require('../icons/clear.png'),
  'Clouds': require('../icons/clouds.png'),
  'Rain': require('../icons/rain.png'),
  'Snow': require('../icons/snow.png'),
  'Dust': require('../icons/dust.png'),
  'Drizzle': require('../icons/drizzle.png'),
  'Fog': require('../icons/fog.png'),
  'Thunderstorm': require('../icons/thunder.png'),
};

const weatherTranslations = {
  'Clear': '맑음',
  'Clouds': '흐림',
  'Rain': '비',
  'Snow': '눈',
  'Dust': '먼지',
  'Drizzle': '이슬비',
  'Fog': '안개',
  'Thunderstorm': '천둥번개',
};

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const apiKey = '9edb951af86953242ae7a71e5c342ad2'; // Your OpenWeatherMap API key
      const { latitude, longitude } = currentLocation;

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });

      Location.reverseGeocodeAsync({ latitude, longitude })
        .then((locations) => {
          if (locations && locations.length > 0) {
            const locationName = locations[0].city || locations[0].region || locations[0].country;
            setCurrentLocationName(locationName);
          }
        })
        .catch((error) => {
          console.error('Error fetching location name:', error);
        });
    }
  }, [currentLocation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Loading weather data...</Text>
      </View>
    );
  }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const weatherDescription = weatherData.weather[0].main;
  const translatedWeather = weatherTranslations[weatherDescription];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>현재 {currentLocationName} 날씨</Text>
      <Text style={styles.temperatureText}>온도 : {temperature}°C</Text>
      <Image source={weatherIcons[weatherDescription]} style={styles.weatherIcon} />
      <Text style={styles.weatherText}>날씨 : {translatedWeather}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  temperatureText: {
    fontSize: 20,
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherText: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default WeatherScreen;
