import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Modal, TextInput,Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Seats() {
    const route = useRoute();
    const { tripDetails,selectedDay } = route.params;


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSeatIndex, setSelectedSeatIndex] = useState(null);
    const [occupantName, setOccupantName] = useState("");
    const [occupantNames, setOccupantNames] = useState({});

    const navigation = useNavigation();
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        // Do something when selected seats change
      //  console.log("Selected day:", selectedDay); // Log the selected day value

    }, [selectedSeats],[selectedDay]);

    useEffect(() => {
     //   console.log(occupantNames);
    }, [occupantNames]);

    const renderSeats = () => {
        const { total_seats } = tripDetails;
        const rows = parseInt(tripDetails.no_of_rows);
        const layout = tripDetails.layout.split('/').map(val => parseInt(val));
        let leftColumns, rightColumns;
        leftColumns = layout[0] - 1;
        rightColumns = layout[1];
    
        let seats = [];
        let seatIndex = 1;
    
        for (let i = 0; i < rows; i++) {
            let row = [];
            let leftColumnIndex = 0;
            let rightColumnIndex = 0;
    
            for (let j = 0; j < leftColumns; j++) {
                if (seatIndex <= total_seats) {
                    row.push({
                        empty: true,
                        selected: false,
                        id: `seat${seatIndex}`
                    });
                    leftColumnIndex++;
                    seatIndex++;
                }
            }
    
            row.push({
                empty: true,
                spacing: true,
                id: `spacing${i}-between`
            });
    
            for (let k = 0; k < rightColumns; k++) {
                if (seatIndex <= total_seats) {
                    row.push({
                        empty: true,
                        selected: false,
                        id: `seat${seatIndex}`
                    });
                    rightColumnIndex++;
                    seatIndex++;
                }
            }
    
            seats.push(row);
        }
    
        return seats.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                {row.map((item, columnIndex) => (
                    <TouchableOpacity
                        key={columnIndex}
                        style={{ marginRight: item.spacing ? 80 : 20 }}
                        onPress={() => toggleSeatSelection(rowIndex, columnIndex)}
                    >
                        {item.empty && (
                            <Image
                                source={require('../assets/seat.png')}
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: selectedSeats.includes(`${rowIndex}-${columnIndex}`) ? '#FA8072' : '#429588'
                                }}
                            />
                        )}
                        {occupantNames[`${rowIndex}-${columnIndex}`] && (
                            <Text>{occupantNames[`${rowIndex}-${columnIndex}`]}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        ));
    };
    

   /* const toggleSeatSelection = (rowIndex, columnIndex) => {
        const seatKey = `${rowIndex}-${columnIndex}`;
        setSelectedSeats(prevSelectedSeats => {
            if (prevSelectedSeats.includes(seatKey)) {
                return prevSelectedSeats.filter(seat => seat !== seatKey);
            } else {
                setModalVisible(true);
                setSelectedSeatIndex(seatKey);
                return [...prevSelectedSeats, seatKey];
            }
        });
    };

    const toggleSeatSelection = (rowIndex, columnIndex) => {
        const seatKey = `${rowIndex}-${columnIndex}`;


        // Check if the maximum number of seats (3) hasn't been reached
        if (selectedSeats.length < 3) {
            setSelectedSeats(prevSelectedSeats => {
                if (prevSelectedSeats.includes(seatKey)) {
                    return prevSelectedSeats.filter(seat => seat !== seatKey);
                } else {
                    setModalVisible(true);
                    setSelectedSeatIndex(seatKey);
                    return [...prevSelectedSeats, seatKey];
                }
            });
        } else {
            // Alert the user that they can only select up to 3 seats
            alert('You can only select up to 3 seats.');
        }
    }; */

const toggleSeatSelection = (rowIndex, columnIndex) => {
    const seatKey = `${rowIndex}-${columnIndex}`;

    // Check if the seat is already selected
    const seatIndex = selectedSeats.findIndex(seat => seat === seatKey);

    // If the seat is already selected, deselect it
    if (seatIndex !== -1) {
        setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatKey));

        // Remove the occupant name associated with the deselected seat
        setOccupantNames(prevOccupantNames => {
            const newOccupantNames = { ...prevOccupantNames };
            delete newOccupantNames[seatKey];
            return newOccupantNames;
        });
    } else {
        // Otherwise, select the seat
        if (selectedSeats.length < 3) {
            setModalVisible(true);
            setSelectedSeatIndex(seatKey);
            setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatKey]);
        } else {
            alert('You can only select up to 3 seats.');
        }
    }
};


    

    const handleOccupantNameSubmit = () => {
        setOccupantNames(prevOccupantNames => ({
            ...prevOccupantNames,
            [selectedSeatIndex]: occupantName.substring(0, 5)
        }));
        setModalVisible(false);
    };
    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            Alert.alert('', 'Please select at least one seat before continuing.');
            return;
        }
        navigation.navigate('Ticket', { tripDetails, occupantNames, selectedDay });
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Enter Occupant Name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setOccupantName(text)}
                            placeholder="Enter Name"
                        />
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleOccupantNameSubmit}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                </TouchableOpacity>
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
                        <Image
                            source={require('../assets/seat.png')}
                            style={{ height: 25, width: 25, tintColor: '#707070' }}
                        />
                        <Text style={styles.keyText}>Booked</Text>
                    </View>
                    <View style={styles.key}>
                        <Image
                            source={require('../assets/seat.png')}
                            style={{ height: 25, width: 25, tintColor: '#429588' }}
                        />
                        <Text style={styles.keyText}>Available</Text>
                    </View>
                    <View style={styles.key}>
                        <Image
                            source={require('../assets/seat.png')}
                            style={{ height: 25, width: 25, tintColor: '#FA8072' }}
                        />
                        <Text style={styles.keyText}>Selected</Text>
                    </View>
                </View>
                <View style={styles.mid2}>
                    <View style={{ height: '100%', width: '70%', justifyContent: 'center', paddingLeft: '8%' }}>
                        <Text style={{ color: '#707070', fontSize: 15 }}>{`Selected Seats (${selectedSeats.length})`}</Text>
                    </View>
                    <View style={{ height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="steering" size={35} color={'#707070'} />
                    </View>
                </View>
                <View style={styles.mid3}>
                    <ScrollView contentContainerStyle={{ justifyContent: 'center' }} >
                        {renderSeats()}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.bot}>
            <TouchableOpacity onPress={handleContinue} style={{ height: '60%', width: '80%', backgroundColor: '#429588', borderRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Continue</Text>
            </TouchableOpacity>
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
    keyText: {
        color: '#707070',
        fontSize: 15
    },
    mid2: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    mid3: {
        height: '80%',
        width: '100%',
    },
    bot: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        alignContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        color: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
        width: '100%',
        backgroundColor: '#fff'
    },
    submitButton: {
        backgroundColor: '#429588',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
