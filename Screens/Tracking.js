import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Tracking() {
    const destination = { latitude: -21.173611, longitude: 27.512501 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyC7WKgZRHFZIcnL5j337eiPa5l2b4pY4FU';
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        };

        getLocation();
    }, []);

    return (

        <View style={styles.container}>
            {/* <View style={styles.top}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                </Pressable>
                <View style={styles.label}>
                    <Text>Track Bus</Text>
                </View>
                <View style={styles.notification}>
                    <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                </View>
            </View> */}
            <View style={styles.mid}>
                <View style={styles.midTop}>
                    <View style={styles.toFro}>
                        <View style={styles.dotFro} />
                        <View style={styles.line} />
                        <View style={styles.dotTo} />
                    </View>
                    <View style={styles.fields}>
                        <View style={styles.destination}>
                            <Text>Gaborone</Text>
                        </View>
                        <View style={styles.destination}>
                            <Text>Francistown</Text>
                        </View>
                    </View>
                    <View style={styles.icons}>
                        <View style={styles.iconSpace}>
                            <MaterialCommunityIcons name="map-marker-distance" size={20} color="#FA8072" />
                            <Text>250 km</Text>
                        </View>
                        <View style={styles.iconSpace}>
                            <FontAwesome5 name='clock' size={20} color='#FA8072' />
                            <Text>9 hrs</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.midBot}>
                    {initialRegion && (
                        <MapView style={styles.map} initialRegion={initialRegion}>
                            <MapViewDirections
                            origin={currentLocation}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="red"
                            mode={'DRIVING'}
                            precision="high"
                            // onReady={result=> {setDistance(result.distance), setTime(result.duration)}}
                        />
                            {currentLocation && (
                                <Marker
                                    coordinate={{
                                        latitude: currentLocation.latitude,
                                        longitude: currentLocation.longitude,
                                    }}
                                    title="Your Location"
                                />
                            )}
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.bot}>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        height: windowHeight,
        width: windowWidth,
        paddingTop: '8%'
    },

    top: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    back: {
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        paddingLeft: '5%',
        // backgroundColor: 'blue',
    },

    label: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },

    notification: {
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green',
    },

    mid: {
        height: '100%',
        width: '100%',

    },

    midTop: {
        height: '20%',
        width: '100%',
        padding: '2%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    toFro: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dotFro: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#429588'
    },

    line: {
        height: '40%',
        borderWidth: 0.3,
        borderColor: '#707070'
    },

    dotTo: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#FA8072'
    },

    fields: {
        height: '80%',
        width: '65%',
        justifyContent: 'space-between',
    },

    destination: {
        height: '44%',
        width: '95%',
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EEED',
    },

    icons: {
        height: '100%',
        width: '20%',
        justifyContent: 'space-between',
    },

    iconSpace: {
        height: '45%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },

    midBot: {
        height: '80%',
        width: '100%',
    },

    map: {
        flex: 1,
        width: '100%'
      },

    bot: {
        height: '10%',
        width: '100%',
        paddingTop: '3%',
        backgroundColor: '#c1c1c1'
    },

});