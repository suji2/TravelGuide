import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const MapScreen = () => {
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState(null);
  const mapRef = React.useRef(null);
  const [region, setRegion] = React.useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tappedLocation, setTappedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const mapRegionChangeHandle = (region) => {
    setRegion(region);
  };

  // 현재 위치 이동 버튼을 눌렀을 때 현재 위치로 이동하는 함수
  const goToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(currentLocation, 1000);
    }
  };

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={currentLocation}
          showsUserLocation={true}
          onPress={(e) => setTappedLocation(e.nativeEvent.coordinate)}
        >
          {tappedLocation && (
            <Marker
              coordinate={tappedLocation}
              title="Tapped Location"
              description="This is the location you tapped."
            />
          )}

          {selectedLocation && (
            <Marker
              coordinate={selectedLocation.coordinate}
              title={selectedLocation.title}
              description={selectedLocation.description}
            >
              <Callout>
                <View>
                  <Text>{selectedLocation.title}</Text>
                  <Text>{selectedLocation.description}</Text>
                </View>
              </Callout>
            </Marker>
          )}

          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="내 위치"
            description="현재 내 위치"
          />
        </MapView>
      )}

      <TouchableOpacity style={styles.currentLocationButton} onPress={goToCurrentLocation}>
        <Text style={styles.buttonText}>현재 위치로 이동</Text>
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
  map: {
    width: '100%',
    height: '80%',
  },
  currentLocationButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default MapScreen;
