import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Buses() {
    const navigation = useNavigation();
    const [tripData, setTripData] = React.useState([]);

    React.useEffect(() => {
        // Fetch data from PHP endpoint
        fetch('https://propiq.tech/SR/routes.php')
            .then(response => response.json())
            .then(data => {
               // console.log('Received data:', data); // Log received data for debugging
                setTripData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.back}>
                    <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                </View>
                <View style={styles.label}>
                    <Text>Available Trips</Text>
                </View>
                <View style={styles.notification}>
                    <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                </View>
            </View>
            <View style={styles.bot}>
                <FlatList
                    style={{ height: '100%' }}
                    data={tripData}
                    keyExtractor={item => item.uuid}
                    renderItem={({ item }) => (
                        <TouchableOpacity  onPress={() => navigation.navigate('Details', { tripDetails: item })} style={styles.flatItem}>
                        
                            <View style={styles.cardtop}>
                                <View style={styles.logo}>
                                    <Image style={{ height: 38, width: 38, borderRadius: 19, alignSelf: 'center' }} source={{ uri: item.image }} />
                                </View>
                                <View style={styles.title}> 
                                    <Text style={{ fontSize: 15, color: '#707070' }}>{item.company}</Text> 
                                    <Text style={{ fontSize: 10, color: '#707070' }}> Registration : {item.reg_no}</Text> 

                                </View>
                                <View style={styles.price}>
                                    <View style={{ height: 27, width: 83, borderRadius: 18, backgroundColor: '#429588', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>{`P ${item.fare}`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardmid}>
                                <View style={styles.departure}> 
                                    <Text style={{ fontSize: 12, color: '#707070' }}>From : {item.start_city}</Text>
                                    <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{item.departure}</Text>
                                </View>
                                <View style={styles.froTo}>
                                    <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#429588', borderWidth: 1 }} />
                                    <View style={{ height: 0, width: 78, borderColor: '#707070', borderWidth: 0.5 }} />
                                    <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#FA8072', borderWidth: 1 }} />
                                </View>
                                <View style={styles.destination}>   
                                    <Text style={{ fontSize: 12, color: '#707070' }}> To:  {item.end_city}</Text>
                                    <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{item.arrival}</Text>
                                </View>
                            </View>
                            <View style={styles.cardbot}>
                                <View style={styles.time}> 
                                    <FontAwesome5 name='clock' size={20} color='#FA8072' />
                                    <Text style={{ fontSize: 12, color: '#707070' }}>{`${item.approximate_time}hrs`}</Text>
                                </View>
                                <View style={styles.distance}>
                                    <MaterialCommunityIcons name='map-marker-distance' size={20} color='#FA8072' />
                                    <Text style={{ fontSize: 12, color: '#707070' }}>{`${item.distance}km`}</Text>
                                </View>
                                <View style={styles.seats}> 
                                    <MaterialCommunityIcons name='seat' size={20} color='#FA8072' />
                                    <Text style={{ fontSize: 12, color: '#707070' }}>{`${item.booking_count}/${item.total_seats}`}</Text>
                                </View>
                                <View style={styles.date}>
                                    <Ionicons name='calendar' size={15} color='#FA8072' />
                                    <Text style={{ fontSize: 10, color: '#707070' }}>{item.booking_date}</Text> 
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
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
        // backgroundColor: '#c1c1c1',
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

    bot: {
        //backgroundColor: '#707070',
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
        //backgroundColor: 'green',
        height: '30%',
        width: '100%',
        flexDirection: 'row'
    },

    logo: {
        //  backgroundColor: 'blue',
        height: '100%',
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        // backgroundColor: 'red',
        height: '100%',
        width: '50%',
        justifyContent: 'center'
    },

    price: {
        //backgroundColor: 'pink',
        height: '100%',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardmid: {
        //backgroundColor: 'blue',
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
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    distance: {
        height: '100%',
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    seats: {
        height: '100%',
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    date: {
        height: '100%',
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
