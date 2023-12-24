import React, { Component, useState } from "react";
import { useNavigation, } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Pressable, FlatList, Image, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import SeatsLayout from '@mindinventory/react-native-bus-seat-layout';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function Seats() {
    const [row1, setRow1] = useState([
        { empty: false, selected: false },
        { empty: false, selected: true },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: false, selected: true },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
    ]);

    const [row2, setRow2] = useState([
        { empty: false, selected: false },
        { empty: false, selected: true },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: false, selected: true },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: false, selected: true },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
    ]);

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                </Pressable>
                <View style={styles.label}>
                    <Text>Select Seat</Text>
                </View>
                <View style={styles.notification}>
                    <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                </View>
            </View>

            <View style={styles.mid}>
                <View style={styles.mid1}>
                    <View style={styles.key}>
                        <View style={styles.keyBooked} />
                        <Text style={styles.keyText}>Available</Text>
                    </View>
                    <View style={styles.key}>
                        <View style={styles.keyAvailable} />
                        <Text style={styles.keyText}>Booked</Text>
                    </View>
                    <View style={styles.key}>
                        <View style={styles.keySelected} />
                        <Text style={styles.keyText}>Selected</Text>
                    </View>
                </View>
                {/* <View style={styles.mid2}>
                    <View style={styles.passenger}>
                        <View style={styles.seat}>
                            <Text style={{ fontSize: 18, color: '#fff' }}>A3</Text>
                        </View>
                        <TextInput placeholder="Passenger name" style={{ height: '100%', width: '85%', fontSize: 18, paddingLeft: '2%', }} />
                    </View>
                </View> */}
                <View style={styles.mid3}>
                    <View style={styles.leftRows}>
                        <FlatList
                            numColumns={2}
                            style={{ height: '100%', }}
                            data={row1}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ marginRight: 20, marginLeft: 20, marginBottom: 15 }}>
                                        {
                                            item.empty == false && item.selected == true ? (
                                                <Image source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#FA8072' }}
                                                />
                                            ) : item.empty == true && item.selected == false ? (
                                                <Image
                                                    source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#D1D1D1' }}
                                                />
                                            ) : item.empty == false && item.selected == false ? (
                                                <Image source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#429588' }}
                                                />
                                            ) : null
                                        }
                                    </TouchableOpacity>
                                )
                            }}

                        />
                    </View>
                    <View style={styles.RightRows}>
                        <FlatList
                            numColumns={3}
                            style={{ height: '100%', }}
                            data={row2}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ marginRight: 15, marginLeft: 15, marginBottom: 15 }}>
                                        {
                                            item.empty == false && item.selected == true ? (
                                                <Image source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#FA8072' }}
                                                />
                                            ) : item.empty == true && item.selected == false ? (
                                                <Image
                                                    source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#D1D1D1' }}
                                                />
                                            ) : item.empty == false && item.selected == false ? (
                                                <Image source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#429588' }}
                                                />
                                            ) : null
                                        }
                                    </TouchableOpacity>
                                )
                            }}

                        />
                    </View>
                </View>
            </View>

            <View style={styles.bot}>
                <Pressable style={{ height: '60%', width: '80%', backgroundColor: '#429588', borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#fff' }}>Continue</Text>
                </Pressable>
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

    mid: {
        height: '80%',
        width: '100%',
    },

    mid1: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    key: {
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    keyBooked: {
        height: '40%',
        width: '20%',
        borderRadius: 4,
        marginRight: '4%',
        backgroundColor: '#D1D1D1'
    },

    keyAvailable: {
        height: '40%',
        width: '20%',
        borderRadius: 4,
        marginRight: '4%',
        backgroundColor: '#429588'
    },

    keySelected: {
        height: '40%',
        width: '20%',
        borderRadius: 4,
        marginRight: '4%',
        backgroundColor: '#FA8072'
    },

    keyText: {
        color: '#707070',
        fontSize: 15
    },

    mid2: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    passenger: {
        height: '65%',
        width: '80%',
        borderRadius: 11,
        flexDirection: 'row',
        backgroundColor: '#F2EEED'
    },

    seat: {
        height: '100%',
        width: '15%',
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FA8072'
    },

    mid3: {
        height: '90%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FA8072'
    },

    leftRows: {
        height: '90%',
        width: '40%',
        alignItems: 'center',
        backgroundColor: 'red'
    },

    RightRows: {
        height: '90%',
        width: '60%',
        alignItems: 'center',
    },


    bot: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },


});

// <SeatsLayout
//                         row={10}
//                         layout={{ columnOne: 2, columnTwo: 3 }}
//                         maxSeatToSelect={3}
//                         selectedSeats={[]}
//                         numberTextStyle={{ fontSize: 12 }}
//                         //seatImage={{ image: SleeperSeatIcon, tintColor: '#B2B2B2' }}
//                         getBookedSeats={(seats) => {
//                             console.log('getBookedSeats :: ', seats);
//                         }}
//                     />