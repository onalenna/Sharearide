import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image,TouchableOpacity,Alert,Platform } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import RadioButtonRN from 'radio-buttons-react-native';
// import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const colors = [
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Debit/Credit Card',
        value: 'option1',
        color: '#429588'
    },
    {
        id: '2',
        label: 'Cash',
        value: 'option2',
        color: '#429588'
    }
]

export default function Ticket() {
    //const route = useRoute();
    //const { tripDetails ,occupantNames,chosenDate} = route.params;

   // const route = useRoute();
    //const { tripDetails ,occupantNames, chosenDate} = route.params;

    const route = useRoute();
 //   const { tripDetails ,occupantNames, chosenDate, totalFare } = route.params;
    const { tripDetails = {}, occupantNames = {}, chosenDate = "", totalFare = 0 } = route.params || {};

    //console.log(tripDetails);

   // console.log(tripDetails);
    const [username, setUsername] = useState("");
    const [lname, setUserLname] = useState("");
    const [email, setUserEmail] = useState("");
    const navigation = useNavigation();
    const generateTicketID = () => {
        // Get today's date, month, and day
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const day = today.getDay();
    
        // Get first characters of username and lname
        const userInitials = (username.charAt(0) + lname.charAt(0)).toUpperCase();
    
        // Get first characters of start city and end city
      //  const startCityInitial = tripDetails.start_city.charAt(0);
        //const endCityInitial = tripDetails.end_city.charAt(0);
    
        // Format the ticket ID string
      //  const ticketID = `${date}${month}${day}-${userInitials}-${startCityInitial}${endCityInitial}`;
        const ticketID="";
        return ticketID;
    };
    const [paymentOption, setPaymentOption] = useState(null);

    /*const handleContinue = () => {
        if (paymentOption === null) {
            Alert.alert('Error', 'Please select a payment option.');
        } else if (paymentOption === 'option2') { // Cash selected
            Alert.alert('Success', 'Booking successful!');
            navigation.navigate('Profile',{screen: 'Bookings'});
        } else if (paymentOption === 'option1') { // Debit/Credit Card selected
            navigation.navigate('Cards', { tripDetails, occupantNames, chosenDate });
        }
    };*/

    const selectedSeatsArray = Object.keys(occupantNames).map((seatIndex, index) => {
        // Convert the seatIndex to a seat number in the format A1, A2, B1, B2, etc.
        const seatNumber = `${String.fromCharCode(65 + parseInt(seatIndex))}${parseInt(index) % 2 + 1}`; // Example: A1, A2, B1, B2, etc.
        return seatNumber;
    });
    
    const selectedSeatsString = selectedSeatsArray.join(', '); // Convert array to comma-separated string
    

    const handleContinue = async () => {
        if (paymentOption === null) {
            Alert.alert('Error', 'Please select a payment option.');
        } else if (paymentOption === 'option2') { // Cash selected
            try {
                const payload = {
                    // Your payload data here...
                    booking_date: chosenDate,
                    bus_fare: tripDetails.busfare,
                  //  bus_sub_route_id: tripDetails.bus_sub_route_id,
                    selected_seats: selectedSeatsString,
                    bus_id: tripDetails.bus_id,
                    bus_route_id: tripDetails.bus_route_id,
                    user_email:email,
                    arrival_sequence_number:tripDetails.arrival_sequence_number,
                    departure_sequence_number:tripDetails.departure_sequence_number
                };
                const response = await fetch('https://propiq.tech/SR/bookSeats.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                    
                });
    
                if (response.ok) {
                    const result = await response.json(); // Parse response JSON
                    if (result.status === 'ok') {
                        console.log(payload)
                        Alert.alert('Success', 'Booking successful!');
                        navigation.navigate('Profile', { screen: 'Bookings' });
                    } else {
                        Alert.alert('Failed', result.text); // Show failure message from PHP script
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to book seats. Please try again.');
            }
        } else if (paymentOption === 'option1') { // Debit/Credit Card selected
           // navigation.navigate('Cards', { tripDetails, occupantNames, chosenDate });
           Alert.alert('Online Payments are currently unavailable');
        }
    };
    
    
    
    useEffect(() => {
        getAsync();
       // console.log("Occupant Names:", occupantNames); // Log occupant names
        //console.log("Number of Occupants:", Object.keys(occupantNames).length); // Log number of occupants

        //const totalFare = tripDetails.busfare * Object.keys(occupantNames).length;


    },[occupantNames]);

    getAsync = async () => {
        try {
            const name = await AsyncStorage.getItem('firstName')
            const lname = await AsyncStorage.getItem('lastName')
            const email = await AsyncStorage.getItem('email')

            setUsername(name)
            setUserLname(lname)
            setUserEmail(email)

           // console.log("console " + phone, email)
        }
        catch (e) {
            console.log(e)
        }

    }





    return (


        <View style={styles.container}>
            <View style={styles.top}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="chevron-back" size={30} color="#707070" />
                </Pressable>
                <View style={styles.label}>
                    <Text>Ticket</Text>
                </View>
                <View style={styles.notification}>
                    <Ionicons name="notifications-outline" size={20} color="#707070" />
                </View>
            </View>
            <View style={styles.mid}>
                <View style={styles.ticket}>
                    <View style={styles.tic1}>
                    <View style={styles.price}>
                        <Text style={{ fontSize: 20, color: '#707070' }}>P {tripDetails.busfare * Object.keys(occupantNames).length} </Text>
                    </View>

                        <View style={styles.icons}>
                            <View style={{ height: 34, width: 34, borderRadius: 17, backgroundColor: '#429588', alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="print" size={20} color={'#fff'} />
                            </View>
                            <View style={{ height: 34, width: 34, borderRadius: 17, backgroundColor: '#429588', alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialIcons name="file-download" size={20} color={'#fff'} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.tic2}>
                        <View style={styles.departure}>
                            <Text style={{ fontSize: 12, color: '#707070', }}>{tripDetails.startCity}</Text>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{tripDetails.departure}</Text>
                        </View>
                        <View style={styles.froTo}>
                            <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#429588', borderWidth: 1 }} />
                            <View style={{ height: 0, width: 78, borderColor: '#707070', borderWidth: 0.5 }} />
                            <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#FA8072', borderWidth: 1 }} />
                        </View>
                        <View style={styles.destination}>
                            <Text style={{ fontSize: 12, color: '#707070', }}>{tripDetails.endCity}</Text>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{tripDetails.arrival}</Text>
                        </View>
                    </View>
                    <View style={styles.tic3}>
                        <View style={styles.date}>
                            <Text style={{ fontSize: 12, color: '#707070', }}>Travel Day</Text>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{chosenDate}</Text>
                        </View>
                        <View style={styles.seat}>
                        <View style={{ height: '60%', width: '65%', borderRadius: 12, backgroundColor: '#429588', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>
                            Seat(s){' '}
                            {Object.keys(occupantNames).map((seatIndex, index, array) => {
                                // Convert the seatIndex to a seat number in the format A1, A2, B1, B2, etc.
                                const seatNumber = `${String.fromCharCode(65 + parseInt(seatIndex))}${parseInt(index) % 2 + 1}`; // Example: A1, A2, B1, B2, etc.
                                return <Text key={index}>{index === array.length - 1 ? seatNumber : `${seatNumber}, `}</Text>;
                            })}
                        </Text>

                        </View>

                        </View>
                    </View>
                    <View style={styles.tic4}>
                        <View style={styles.purchased_by}>
                            <Text style={{ fontSize: 12, color: '#707070', }}>Purchased By</Text>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{username}  {lname}</Text>
                        </View>
                        <View style={styles.ticID}>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>
                                {generateTicketID()}
                            </Text>
                        </View>


                    </View>
                    <View style={styles.ticBot}>
                    <View style={styles.passengers}>
                        <Text style={{ fontSize: 12, color: '#707070' }}>Passenger(s)</Text>
                        {Object.values(occupantNames).map((name, index) => (
                            <Text key={index} style={{ fontSize: 12, color: '#707070', fontWeight: 'bold', marginTop: 4 }}>{name}</Text>
                        ))}
                    </View>

                        
                    </View>
                </View>
                <View style={styles.payOpt}>
                    <View style={{ height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#707070' }}>Payment Method</Text>
                    </View>
              

                    <RadioButtonRN
                        data={colors}
                        animationTypes={['shake']}
                        initial={3}
                        circleSize={16}
                        activeColor={'#429588'}
                        box={false}
                        selectedBtn={(option) => {
                            if (option && option.value) {
                                setPaymentOption(option.value);
                            }
                        }}
                    />

                </View>

            </View>
            <View style={styles.bot}>
                <TouchableOpacity onPress={handleContinue} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
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
        alignItems: 'center',
    },

    ticket: {
        height: '70%',
        width: '85%',
        padding: '3%',
        alignItems: 'center',
        borderRadius: 30,
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

    tic1: {
        height: '15%',
        width: '90%',
        flexDirection: 'row'
    },

    price: {
        height: '100%',
        width: '60%',
        justifyContent: 'center',

    },

    icons: {
        height: '100%',
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    tic2: {
        height: '15%',
        width: '90%',
        flexDirection: 'row'
    },

    departure: {
        height: '100%',
        width: '30%',
        justifyContent: 'space-between',
        paddingTop: '2%',
        paddingBottom: '2%',
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
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: '2%',
        paddingBottom: '2%',

    },

    tic3: {
        height: '15%',
        width: '90%',
        flexDirection: 'row'
    },

    date: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingTop: '2%',
        paddingBottom: '2%',
    },

    seat: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: '2%',
        paddingBottom: '2%',
    },

    tic4: {
        height: '20%',
        width: '90%',
        flexDirection: 'row'
    },

    purchased_by: {
        height: '100%',
        width: '50%',
        paddingTop: '2%',
        paddingBottom: '2%',
    },


    ticID: {
        height: '100%',
        width: '50%',
        //justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: '2%',
        paddingBottom: '2%',
    },

    ticBot: {
        height: '35%',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2%'
    },
    
    passengers: {
        height: '100%',
        width: '50%',
        paddingTop: '2%',
        paddingBottom: '2%',
    },

    barcode: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    payOpt: {
        height: '25%',
        width: '85%',
        padding: '3%',
        marginTop: '6%',
        borderRadius: 30,
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

    bot: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    but: {
        height: 43,
        width: 286,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#429588'
    },

    button:{
        height: 43,
        width: 286,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#429588'

    }




});