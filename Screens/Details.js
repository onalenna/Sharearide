import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Dimensions, Pressable, SafeAreaView, TouchableOpacity, Modal } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Details({ route }) {
    const { tripDetails } = route.params;

   // console.log(tripDetails);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [chosenDate, setChosenDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useNavigation();
    const GOOGLE_MAPS_APIKEY = 'AIzaSyC7WKgZRHFZIcnL5j337eiPa5l2b4pY4FU';

    const formatTime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hrs > 0) {
            return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins > 0 ? `${mins} min${mins > 1 ? 's' : ''}` : ''}`;
        } else {
            return `${mins} min${mins > 1 ? 's' : ''}`;
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

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
                latitudeDelta: 0.9,
                longitudeDelta: 0.9,
            });
        };

        getLocation();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    
        if (date < currentDate) {
            alert('You cannot select past dates');
            return;
        }
    
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const selectedDay = daysOfWeek[dayOfWeek];
    
        if (tripDetails?.allowedDays?.includes(selectedDay)) {
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            setChosenDate(formattedDate);
            hideDatePicker();
        } else {
            alert(`This bus does not travel on this date, it travels on ${tripDetails?.allowedDays || 'the specified days'}`);
            hideDatePicker();
        }
    };
    

    const continueToSeats = () => {
        if (!chosenDate) {
            alert('Please select a departure day');
            return;
        }
        
        navigation.navigate('Seats', { tripDetails, chosenDate });
    };

    const truncatedDate = chosenDate.substring(0, 10); // Display full date

    const renderDayRadioButtons = () => {
        return (tripDetails?.allowedDays?.split(',') || []).map((day, index) => (
            <Pressable key={index} onPress={() => handleDaySelection(day.trim())}>
                <View style={styles.radioButton}>
                    <View style={[styles.radioButtonInner, selectedDay === day.trim() && styles.radioButtonSelected]} />
                    <Text style={styles.dayText}>{day.trim()}</Text>
                </View>
            </Pressable>
        ));
    };

    const handleDaySelection = (day) => {
        setSelectedDay(day);
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                    <Ionicons name="chevron-back" size={30} color="#707070" />
                </Pressable>
                <View style={styles.label}>
                    <Text>Details</Text>
                </View>
                <View style={styles.notification}>
                    <Ionicons name="notifications-outline" size={20} color="#707070" />
                </View>
            </View>

            <View style={styles.mid}>
                <View style={styles.mapCon}>
                    <MapView style={styles.map} initialRegion={initialRegion}>
                        <MapViewDirections
                            origin={currentLocation}
                            destination={tripDetails?.end_city}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="red"
                            mode={'DRIVING'}
                            precision="high"
                        />
                    </MapView >
                </View>

                <View style={styles.info}>
                    <View style={styles.cardtop}>
                        <View style={styles.logo}>
                            <Image style={{ height: 38, width: 38, borderRadius: 19, alignSelf: 'center' }} source={{ uri: tripDetails?.image }} />
                        </View>
                        <View style={styles.title}>
                            <Text style={{ fontSize: 15, color: '#707070' }}>{tripDetails?.company}</Text>
                            <Text style={{ fontSize: 15, color: '#707070' }}>Reg : {tripDetails?.reg_no}</Text>
                        </View>
                        <View style={styles.price}>
                            <View style={{ height: 27, width: 83, borderRadius: 18, backgroundColor: '#707070', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>P {tripDetails?.busfare}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardmid}>
                        <View style={styles.departure}>
                            <Text style={{ fontSize: 12, color: '#707070', }}>{tripDetails?.startCity}</Text>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{tripDetails?.departure}</Text>
                        </View>
                        <View style={styles.froTo}>
                            <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#429588', borderWidth: 1 }} />
                            <View style={{ height: 0, width: '70%', borderColor: '#707070', borderWidth: 0.3 }} />
                            <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#FA8072', borderWidth: 1 }} />
                        </View>
                        <View style={styles.destination}>
                            <Text style={{ fontSize: 12, color: '#707070', }}>{tripDetails?.endCity}</Text>
                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{tripDetails?.arrival}</Text>
                        </View>
                    </View>
                    <View style={styles.cardbot}>
                        <View style={styles.time}>
                            <FontAwesome5 name='clock' size={20} color='#FA8072' />
                            <Text style={{ fontSize: 12, color: '#707070', }}>{formatTime(tripDetails?.approximate_time1)}</Text>
                        </View>

                        <View style={styles.distance}>
                            <MaterialCommunityIcons name='map-marker-distance' size={20} color='#FA8072' />
                            <Text style={{ fontSize: 12, color: '#707070', }}>{tripDetails?.distance} KM </Text>
                        </View>
                        <View style={styles.seats}>
                            <MaterialCommunityIcons name='seat' size={20} color='#FA8072' />
                            <Text style={{ fontSize: 12, color: '#707070', }}> {tripDetails?.totalSeats}</Text>
                        </View>
                        <View style={styles.datePicker}>
                            <View>
                                <TouchableOpacity onPress={showDatePicker} style={styles.rowContainer}>
                                    <Ionicons name="calendar" color="#FA8072" size={20} />
                                    <Text style={{ fontSize: 12, color: "#707070" }}>{truncatedDate}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={toggleModal}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalItem}>Select Departure Day</Text>
                                <Text style={styles.modalItemSpacer}></Text>
                                {renderDayRadioButtons()}
                                <Pressable onPress={toggleModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </Pressable>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={continueToSeats}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    back: {
        padding: 8,
    },
    label: {
        flex: 1,
        alignItems: 'center',
    },
    notification: {
        padding: 8,
    },
    mid: {
        flex: 1,
    },
    mapCon: {
        height: windowHeight * 0.3,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    info: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardtop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        height: 38,
        width: 38,
        borderRadius: 19,
        overflow: 'hidden',
    },
    title: {
        flex: 1,
        paddingLeft: 8,
    },
    price: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardmid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    departure: {
        alignItems: 'center',
    },
    froTo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    destination: {
        alignItems: 'center',
    },
    cardbot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distance: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalItem: {
        backgroundColor: '#FFF',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    modalItemSpacer: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 8,
    },
    closeButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#FA8072',
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    radioButtonInner: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FA8072',
        marginRight: 8,
    },
    radioButtonSelected: {
        backgroundColor: '#FA8072',
    },
    dayText: {
        fontSize: 16,
        color: '#707070',
    },
    continueButton: {
        backgroundColor: '#FA8072',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 16,
    },
    continueButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
