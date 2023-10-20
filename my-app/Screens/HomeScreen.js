import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const navigateToWeather = () => {
    navigation.navigate('Weather');
  };

  const navigateToMap = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>여행 가이드 앱</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../icons/trip.png')}
          style={styles.image}
        />
        <Image
          source={require('../icons/traveller.png')}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToSearch}>
        <Text style={styles.buttonText}>여행지 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToWeather}>
        <Text style={styles.buttonText}>날씨 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToMap}>
        <Text style={styles.buttonText}>지도</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#87CEEB', // 파스텔톤 버튼 색
    padding: 15,
    borderRadius: 30,
    margin: 10,
    width: 250,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;
