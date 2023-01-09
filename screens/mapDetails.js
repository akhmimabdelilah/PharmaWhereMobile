import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react"
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MapView, { Polyline, Callout, Circle, Marker } from "react-native-maps"
import * as Location from 'expo-location';
import { ActivityIndicator, FlatList, Image } from 'react-native';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default function MapDetails({ navigation }) {
    const lat = navigation.getParam('lat');
    const long = navigation.getParam('log')
    const [currentLat,setCurrentLat] =useState(33.2443)
    const [currentLong,setCurrentLong] = useState(-8.4991)
    const [points, setPoints] = useState([{ latitude: lat, longitude: long },{ latitude: currentLat, longitude: currentLong, }]);
    const [pin, setPin] = useState({
        latitude: lat,
        longitude: long
    })
    const [pin2, setPin2] = useState({
        latitude: 36,
        longitude: 8
    })
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLat(location.coords.latitude)
            setCurrentLong(location.coords.longitude)
            setPin2({
                latitude: currentLat,
                longitude: currentLong
            });
            <Circle center={pin2} radius={4000} />
        })();
    }, []);
    return (
        <View style={{ marginTop: 50, flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }}
                provider="google"
                showsUserLocation={true}
            >

                <Marker
                    coordinate={pin}
                    pinColor="black"
                >
                    <Image source={require('../assets/pharmacy-icon.png')} style={{ height: 50, width: 50 }} />
                    <Callout>
                        <Text>{navigation.getParam('nom')}</Text>
                    </Callout>
                </Marker>
                <Marker
                    coordinate={pin2}
                    pinColor="black"
                >
                    <Image source={require('../assets/marker-icon.png')} style={{ height: 50, width: 50 }} />
                    <Callout>
                        <Text>Vous êtes ici</Text>
                    </Callout>
                </Marker>
                <Polyline
                    coordinates={points}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})
