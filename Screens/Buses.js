import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, TouchableOpacity, FlatList, Platform } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Buses() {
    const navigation = useNavigation();
    const [tripData, setTripData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const formatTime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hrs > 0) {
            return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins > 0 ? `${mins} min${mins > 1 ? 's' : ''}` : ''}`;
        } else {
            return `${mins} min${mins > 1 ? 's' : ''}`;
        }
    };
    
    React.useEffect(() => {
        setLoading(true);
        axios.get('https://api.dev.sharearide.co.bw/app/v1/bus/routes/all/0/100')
            .then(response => {
                const filteredData = response.data.data.map(item => ({
                    id: item.uuid,
                    uuid: item.uuid,
                    regNo: item.Bus.regNo,
                    company: item.Bus.company,
                    image: `data:image/jpeg;base64,${item.Bus.image.data.toString('base64')}`,
                    startCity: item.Route.name.split(" - ")[0],
                    departure: item.departure,
                    endCity: item.Route.name.split(" - ")[1],
                    arrival: item.arrival,
                    busfare: item.fare,
                    distance: item.Route.distance,
                    totalSeats: item.Bus.totalSeats,
                    allowedDays: item.allowedDays,
                    approximate_time1: item.Route.approximateTime
                }));
                setTripData(filteredData);
               // console.log(filteredData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="chevron-back" size={30} color="#707070" />
                </Pressable>

                <View style={styles.label}>
                    <Text>Available Trips</Text>
                </View>
                <View style={styles.notification}>
                    <Ionicons name="notifications-outline" size={20} color="#707070" />
                </View>
            </View>
            <View style={styles.bot}>
                {loading ? (
                    <Text>Please wait...</Text>
                ) : (
                    <FlatList
                        style={{ height: '100%' }}
                        data={tripData}
                        keyExtractor={item => item.uuid}
                        renderItem={({ item }) => (
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Details', { tripDetails: item })} style={styles.flatItem}>
                                <View style={styles.cardtop}>
                                    <View style={styles.logo}>
                                        <Image style={{ height: 38, width: 38, borderRadius: 19, alignSelf: 'center' }} source={{ uri: item.image }} />
                                    </View>
                                    <View style={styles.title}> 
                                        <Text style={{ fontSize: 15, color: '#707070' }}>{item.company}</Text> 
                                        <Text style={{ fontSize: 10, color: '#707070' }}> Registration : {item.regNo}</Text> 
                                    </View>
                                    <View style={styles.price}>
                                        <View style={{ height: 27, width: 83, borderRadius: 18, backgroundColor: '#429588', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>{`P ${item.busfare}`}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.cardmid}>
                                    <View style={styles.departure}> 
                                        <Text style={{ fontSize: 12, color: '#707070' }}>From : {item.startCity}</Text>
                                        <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{item.departure}</Text>
                                    </View>
                                    <View style={styles.froTo}>
                                        <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#429588', borderWidth: 1 }} />
                                        <View style={{ height: 0, width: 78, borderColor: '#707070', borderWidth: 0.5 }} />
                                        <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#FA8072', borderWidth: 1 }} />
                                    </View>
                                    <View style={styles.destination}>   
                                        <Text style={{ fontSize: 12, color: '#707070' }}> To:  {item.endCity}</Text>
                                        <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{item.arrival}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardbot}>
                                <View style={styles.time}>
                                    <FontAwesome5 name='clock' size={20} color='#FA8072' />
                                    <Text style={{ fontSize: 12, color: '#707070' }}>{formatTime(item.approximate_time1)}</Text>
                                </View>

                                    <View style={styles.distance}>
                                        <MaterialCommunityIcons name='map-marker-distance' size={20} color='#FA8072' />
                                        <Text style={{ fontSize: 12, color: '#707070' }}>{`${item.distance} km`}</Text>
                                    </View>
                                    <View style={styles.seats}> 
                                        <MaterialCommunityIcons name='seat' size={20} color='#FA8072' />
                                        <Text style={{ fontSize: 12, color: '#707070' }}>{item.totalSeats}</Text>
                                    </View>
                                    <View style={styles.date}>
                                        <Text style={{ fontSize: 10, color: '#707070' }}>
                                            {(() => {
                                                const daysArray = item.allowedDays.split(',').map(day => day.trim());
                                                return daysArray.length === 7 
                                                    ? 'everyday' 
                                                    : daysArray.map(day => day.substring(0, 3)).join(', ');
                                            })()}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        height: windowHeight,
        width: windowWidth,
        marginTop: '8%'
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
    },

    label: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    notification: {
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bot: {
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    flatItem: {
        height: 160,
        width: 340,
        borderRadius: 31,
        padding: '3%',
        margin: '2%',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 5
            }
        }),

    },

    cardtop: {
        height: '30%',
        width: '100%',
        flexDirection: 'row'
    },

    logo: {
        height: '100%',
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        height: '100%',
        width: '50%',
        justifyContent: 'center'
    },

    price: {
        height: '100%',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardmid: {
        height: '50%',
        width: '100%',
        flexDirection: 'row'
    },

    departure: {
        height: '100%',
        width: '30%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: '4%',
        paddingBottom: '4%',
    },

    froTo: {
        height: '100%',
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    destination: {
        height: '100%',
        width: '30%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: '4%',
        paddingBottom: '4%',

    },

    cardbot: {
        height: '20%',
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    time: {
        height: '100%',
        width: '23%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    distance: {
        height: '100%',
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },

    seats: { 
        height: '100%',
        width: '11%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    date: {
        height: '100%',
        minWidth: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation:5,
        backgroundColor:'#fffeee',
        padding:8,
        borderRadius:10,
    }
});
