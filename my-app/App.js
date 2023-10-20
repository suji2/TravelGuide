import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import MapScreen from './Screens/MapScreen';
import RecommendScreen from './Screens/RecommendScreen';
import SearchScreen from './Screens/SearchScreen';
import WeatherScreen from './Screens/WeatherScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Map" component={MapScreen}/>
          <Stack.Screen name="Recommend" component={RecommendScreen}/>
          <Stack.Screen name="Search" component={SearchScreen}/>
          <Stack.Screen name="Weather" component={WeatherScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;