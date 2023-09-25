import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoading(false);
        console.log("Geolocation failed.");
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsLoading(false);      
    })();
  }, [])

  if (isLoading) {
    return <View style={styles.container}><Text>Retrieving location...</Text></View>
  }
  else {
  return (
      <View style={styles.container}>
        <Text>Location: </Text>
        <Text>{latitude.toFixed(3)}</Text>
        <Text>{longitude.toFixed(3)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});