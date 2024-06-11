import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, Alert, Modal, TextInput } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Seats() {
    const [seats, setSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [passengerName, setPassengerName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { tripDetails, chosenDate } = route.params;
    const totalSeats = tripDetails.totalSeats;

    const handleNext = () => {
        if (getSelectedSeatCount() === 0) {
            Alert.alert('Error', 'Please select at least one seat before proceeding.');
        } else {
            const totalFare = tripDetails.fare * getSelectedSeatCount();
            navigation.navigate('Ticket', {
                tripDetails: tripDetails,
                chosenDate: chosenDate,
                occupantNames: seats.filter(seat => seat.selected).reduce((acc, curr) => {
                    acc[curr.id] = curr.passenger;
                    return acc;
                }, {}),
                totalFare: totalFare,
            });
            
        }
    };

    useEffect(() => {
        fetch('https://propiq.tech/SR/availableSeats.php')
            .then(response => response.json())
            .then(data => {
                setBookedSeats(data);
            })
            .catch(error => console.error('Error fetching booked seats:', error));
    }, []);

    useEffect(() => {
        const generateSeats = (totalSeats) => {
            const seatRows = [];
            const columns = 5;

            for (let i = 0; i < totalSeats; i++) {
                const rowIndex = Math.floor(i / columns);
                const columnIndex = (i % columns) + 1;
                const seatId = `${rowIndex + 1}-${columnIndex}`;
                seatRows.push({ id: seatId, empty: true, selected: false, passenger: null });
            }
            setSeats(seatRows);
        };

        generateSeats(totalSeats);
    }, [totalSeats]);

    const onSelectSeat = (seatId) => {
        if (isSeatBooked(seatId)) {
            Alert.alert('Seat Already Booked', 'This seat is already booked.');
        } else {
            const selectedSeatCount = getSelectedSeatCount();
            if (selectedSeatCount < 3) {
                setSelectedSeat(seatId);
                setModalVisible(true);
            } else {
                Alert.alert('Maximum Seats Reached', 'You can only select a maximum of 3 seats.');
            }
        }
    };

    const isSeatBooked = (seatId) => {
        return bookedSeats.includes(seatId);
    };

    const getSelectedSeatCount = () => {
        return seats.filter(seat => seat.selected).length;
    };

    const handleModalOk = () => {
        const updatedSeats = seats.map(seat => {
            if (seat.id === selectedSeat) {
                return { ...seat, selected: true, empty: false, passenger: passengerName.substring(0, 5) };
            }
            return seat;
        });
        setSeats(updatedSeats);
        setModalVisible(false);
        setPassengerName("");  // Reset the passenger name input after adding it to the seat
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="chevron-back" size={30} color="#707070" />
                </TouchableOpacity>
                <View style={styles.label}>
                    <Text>Select Seat</Text>
                </View>
                <TouchableOpacity style={styles.notification}>
                    <Ionicons name="notifications-outline" size={20} color="#707070" />
                </TouchableOpacity>
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
                <View style={styles.mid4}>
                    <View style={{ height: '100%', width: '70%', justifyContent: 'center', paddingLeft: '8%' }}>
                        <Text style={{ color: '#707070', fontSize: 15 }}>{`Selected Seats (${getSelectedSeatCount()})`}</Text>
                    </View>
                    <View style={{ height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="steering" size={35} color={'#707070'} />
                    </View>
                </View>
                <View style={styles.mid3}>
                    <FlatList
                        numColumns={5}
                        style={{ height: '100%' }}
                        data={seats}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ marginLeft: 15, marginTop: 9 }} onPress={() => onSelectSeat(item.id)} disabled={isSeatBooked(item.id)}>
                                <Image
                                    source={require('../assets/seat.png')}
                                    style={{ height: 30, width: 30, tintColor: isSeatBooked(item.id) ? '#D1D1D1' : item.selected ? '#FA8072' : '#429588' }}
                                />
                                {item.passenger && <Text style={{ fontSize: 7, textAlign: 'center' }}>{item.passenger}</Text>}
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={handleNext}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Next</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Please enter your name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setPassengerName(text)}
                            value={passengerName}
                            placeholder="Your Name"
                        />
                        <TouchableOpacity onPress={handleModalOk} style={styles.modalButton}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    top: {
        height: windowHeight / 13,
        width: windowWidth,
        flexDirection: 'row',
    },
    back: {
        height: '100%',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        height: '100%',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mid: {
        height: windowHeight / 1.2,
        width: windowWidth,
        alignItems: 'center',
    },
    mid1: {
        height: '10%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    mid4: {
        height: '8%',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mid3: {
        height: '70%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        height: windowHeight / 13,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButton: {
        height: '60%',
        width: '90%',
        backgroundColor: '#429588',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    key: {
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        color: '#707070',
        fontSize: 12,
    },
    keyBooked: {
        height: '20%',
        width: '15%',
        backgroundColor: '#D1D1D1',
        marginBottom: 5,
    },
    keyAvailable: {
        height: '20%',
        width: '15%',
        backgroundColor: '#429588',
        marginBottom: 5,
    },
    keySelected: {
        height: '20%',
        width: '15%',
        backgroundColor: '#FA8072',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    modalButton: {
        backgroundColor: '#429588',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

