import React, { Component, useState } from "react";
import { useNavigation, } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Pressable, FlatList, Image, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import SeatsLayout from '@mindinventory/react-native-bus-seat-layout';
import { useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function Seats() {

    const route = useRoute();
    const { tripDetails } = route.params;

    console.log('tripDetails:', tripDetails);
        
    const selectedSeats = [];
    const [row1, setRow1] = useState([
        { empty: true, selected: false, id: 'A1' },
        { empty: true, selected: false, id: 'A2' },
        { empty: true, selected: false, id: 'B1' },
        { empty: true, selected: false, id: 'B2' },
        { empty: true, selected: false, id: 'C1' },
        { empty: true, selected: false, id: 'C2' },
        { empty: true, selected: false, id: 'D1' },
        { empty: true, selected: false, id: 'D2' },
        { empty: true, selected: false, id: 'E1' },
        { empty: true, selected: false, id: 'E2' },
        { empty: true, selected: false, id: 'F1' },
        { empty: true, selected: false, id: 'F2' },
        { empty: true, selected: false, id: 'G1' },
        { empty: true, selected: false, id: 'G2' },
        { empty: true, selected: false, id: 'H1' },
        { empty: true, selected: false, id: 'H2' },
        { empty: true, selected: false, id: 'I1' },
        { empty: true, selected: false, id: 'I2' },
        { empty: true, selected: false, id: 'J1' },
        { empty: true, selected: false, id: 'J2' },
    ]);

    const [row2, setRow2] = useState([
        { empty: true, selected: false, id: 'A3' },
        { empty: true, selected: false, id: 'A4' },
        { empty: true, selected: false, id: 'A5' },
        { empty: true, selected: false, id: 'B3' },
        { empty: true, selected: false, id: 'B4' },
        { empty: true, selected: false, id: 'B5' },
        { empty: true, selected: false, id: 'C3' },
        { empty: true, selected: false, id: 'C4' },
        { empty: true, selected: false, id: 'C5' },
        { empty: true, selected: false, id: 'D3' },
        { empty: true, selected: false, id: 'D4' },
        { empty: true, selected: false, id: 'D5' },
        { empty: true, selected: false, id: 'E3' },
        { empty: true, selected: false, id: 'E4' },
        { empty: true, selected: false, id: 'E5' },
        { empty: true, selected: false, id: 'F3' },
        { empty: true, selected: false, id: 'F4' },
        { empty: true, selected: false, id: 'F5' },
        { empty: true, selected: false, id: 'G3' },
        { empty: true, selected: false, id: 'G4' },
        { empty: true, selected: false, id: 'G5' },
        { empty: true, selected: false, id: 'H3' },
        { empty: true, selected: false, id: 'H4' },
        { empty: true, selected: false, id: 'H5' },
        { empty: true, selected: false, id: 'I3' },
        { empty: true, selected: false, id: 'I4' },
        { empty: true, selected: false, id: 'I5' },
        { empty: true, selected: false, id: 'J3' },
        { empty: true, selected: false, id: 'J4' },
        { empty: true, selected: false, id: 'J5' },
    ]);

    const [row3, setRow3] = useState([
        { empty: true, selected: false, id: 'K1' },
        { empty: true, selected: false, id: 'K2' },
        { empty: true, selected: false, id: 'K3' },
        { empty: true, selected: false, id: 'K4' },
        { empty: true, selected: false, id: 'K5' },
        { empty: true, selected: false, id: 'K6' },
    ]);

    const onSelectRow1 = index => {
        let tempRow = [];
        tempRow = row1;
        tempRow.map((item, idx) => {
            if (index == idx) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true;
                } else {
                    item.selected = true;
                    item.empty = false;
                }
            }
        });
        let tempSeats = [];
        tempRow.map(item => {
            tempSeats.push(item);

        });
        setRow1(tempSeats);


    }

    const onSelectRow2 = index => {
        let tempRow = [];
        tempRow = row2;
        tempRow.map((item, idx) => {
            if (index == idx) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true;
                } else {
                    item.selected = true;
                    item.empty = false;
                }
            }
        });
        let tempSeats = [];
        tempRow.map(item => {
            tempSeats.push(item);
        });
        setRow2(tempSeats);
    }

    const onSelectRow3 = index => {
        let tempRow = [];
        tempRow = row3;
        tempRow.map((item, idx) => {
            if (index == idx) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true;
                } else {
                    item.selected = true;
                    item.empty = false;
                }
            }
        });
        let tempSeats = [];
        tempRow.map(item => {
            tempSeats.push(item);
        });
        setRow3(tempSeats);
    }

    const getSeats = () => {
        row1.map(item => {
            if (item.selected == true) {
                selectedSeats.push(1);
            }
        });
        row2.map(item => {
            if (item.selected == true) {
                selectedSeats.push(1);
            }
        });
        row3.map(item => {
            if (item.selected == true) {
                selectedSeats.push(1);
            }
        });

        return selectedSeats.length;

    };

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
                        <Text style={styles.keyText}>Booked</Text>
                    </View>
                    <View style={styles.key}>
                        <View style={styles.keyAvailable} />
                        <Text style={styles.keyText}>Available</Text>
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
                <View style={styles.mid4}>
                    <View style={{height: '100%', width: '70%', justifyContent: 'center', paddingLeft: '8%'}}>
                        <Text style={{color: '#707070', fontSize: 15}}>{'Selected Seats ('+getSeats()+')'}</Text>
                    </View>
                    <View style={{height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center'}}>
                        <MaterialCommunityIcons name="steering" size={35} color={'#707070'} />
                    </View>
                </View>
                <View style={styles.mid3}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.leftRows}>
                            <FlatList
                                numColumns={2}
                                style={{ height: '100%', }}
                                data={row1}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={{ marginLeft: 15, marginTop: 9 }} onPress={() => {
                                            if (item.selected == false && item.empty == false) {
                                                alert('Already Booked');
                                            } else {
                                                onSelectRow1(index);
                                            }
                                        }} >
                                            {
                                                item.empty == false && item.selected == true ? (
                                                    <Image source={require('../assets/seat.png')}
                                                        style={{ height: 30, width: 30, tintColor: '#FA8072' }}
                                                    />
                                                ) : item.empty == true && item.selected == false ? (
                                                    <Image
                                                        source={require('../assets/seat.png')}
                                                        style={{ height: 30, width: 30, tintColor: '#429588' }}
                                                    />
                                                ) : item.empty == false && item.selected == false ? (
                                                    <Image source={require('../assets/seat.png')}
                                                        style={{ height: 30, width: 30, tintColor: '#D1D1D1' }}
                                                    />
                                                ) : null
                                            }
                                        </TouchableOpacity>
                                    )
                                }}

                            />
                        </View>
                        <View style={styles.rightRows}>
                            <FlatList
                                numColumns={3}
                                style={{ height: '100%', }}
                                data={row2}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={{ marginRight: 10, marginLeft: 10, marginTop: 9 }} onPress={() => {
                                            if (item.selected == false && item.empty == false) {
                                                alert('Already Booked');
                                            } else {
                                                onSelectRow2(index);
                                            }
                                        }}>
                                            {
                                                item.empty == false && item.selected == true ? (
                                                    <Image source={require('../assets/seat.png')}
                                                        style={{ height: 30, width: 30, tintColor: '#FA8072' }}
                                                    />
                                                ) : item.empty == true && item.selected == false ? (
                                                    <Image
                                                        source={require('../assets/seat.png')}
                                                        style={{ height: 30, width: 30, tintColor: '#429588' }}
                                                    />
                                                ) : item.empty == false && item.selected == false ? (
                                                    <Image source={require('../assets/seat.png')}
                                                        style={{ height: 30, width: 30, tintColor: '#D1D1D1' }}
                                                    />
                                                ) : null
                                            }
                                        </TouchableOpacity>
                                    )
                                }}

                            />
                        </View>
                    </View>
                    <View style={styles.botRow}>
                        <FlatList
                            horizontal
                            data={row3}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{ marginRight: 10, marginLeft: 10, }} onPress={() => {
                                        if (item.selected == false && item.empty == false) {
                                            alert('Already Booked');
                                        } else {
                                            onSelectRow3(index);
                                        }
                                    }}>
                                        {
                                            item.empty == false && item.selected == true ? (
                                                <Image source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#FA8072' }}
                                                />
                                            ) : item.empty == true && item.selected == false ? (
                                                <Image
                                                    source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#429588' }}
                                                />
                                            ) : item.empty == false && item.selected == false ? (
                                                <Image source={require('../assets/seat.png')}
                                                    style={{ height: 30, width: 30, tintColor: '#D1D1D1' }}
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
        height: '80%',
        width: '100%',
        justifyContent: 'center',
    },

    leftRows: {
        height: '100%',
        width: '40%',
        alignItems: 'center',
    },

    rightRows: {
        height: '100%',
        width: '60%',
        alignItems: 'center',
    },

    botRow: {
        height: '10%',
        padding: '2%',
        alignItems: 'center',
    },

    mid4: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
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