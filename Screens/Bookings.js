import { View, Text, Image, TextInput, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, TouchableOpacity,Platform } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect ,Component} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const active = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Ms Jane Doe',
        card: '**** **** **** 2192',
        image: require('../assets/visa.jpg')
    },

];
const cancelled = [

];
const completed = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b8',
        name: 'Ms Jane Doe',
        card: '**** **** **** 2192',
        image: require('../assets/visa.jpg')
    },

];

const empty = () => {
    return (
        <View style={{alignSelf: 'center'}}>
            <Text>No entries to show</Text>
        </View>

    )
};

export default function Bookings () {
    const route = useRoute();
    const [user, setUser] = useState("");
    const navigation = useNavigation();
    const [bookings, setBookings] = useState([]);

    //console.log(bookings)
   // const { user_email} = route.params;

    useEffect(() => {
        
        getAsync(); // Call getAsync to fetch user data
        fetchData();

    
      });
     
    
      const fetchData = async () => {
        try {
            const user_email = await AsyncStorage.getItem('email');
            const response = await fetch('https://propiq.tech/SR/getBookings.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_email }),
            });
            const data = await response.json();
            setBookings(data);
            //console.log(data); // Console log the response

        } catch (error) {
            console.error(error);
        }
    };


    getAsync = async () => {
        try {
          const email = await AsyncStorage.getItem('email')
          setUser(email)

         // console.log(email);

        }
        catch (e) {
          console.log(e)
        }
    
    
      }

    
        return (

            <View style={styles.container}>
                <View style={styles.top}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                        <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                    </Pressable>
                    <View style={styles.label}>
                        <Text>Bookings</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                    </View>
                </View>
                <View style={styles.mid}>
                    <Pressable style={styles.opt}>
                        <Text style={{ color: '#fff' }}>Active</Text>
                    </Pressable>
                    <Pressable style={styles.opt}>
                        <Text style={{ color: '#fff' }}>Cancelled</Text>
                    </Pressable>
                    <Pressable style={styles.opt}>
                        <Text style={{ color: '#fff' }}>Completed</Text>
                    </Pressable>
                </View>
                <SafeAreaView style={styles.bot}>
                    <FlatList
                        data={active}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={empty}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Tracking')} style={styles.booking}>

                                    <View style={styles.cardtop}>
                                        <View style={styles.logo}>
                                            <Image style={{ height: 38, width: 38, borderRadius: 19, alignSelf: 'center' }} source={{ uri: bookings.image }} />
                                        </View>
                                        <View style={styles.title}>
                                            <Text style={{ fontSize: 15, color: '#707070' }}>{bookings.company}</Text>
                                        </View>
                                        <View style={styles.price}>
                                            {/* <View style={{ height: 27, width: 83, borderRadius: 18, backgroundColor: '#429588', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>P 350.00</Text>
                                                </View> */}
                                        </View>
                                    </View>
                                    <View style={styles.cardmid}>
                                        <View style={styles.departure}>
                                            <Text style={{ fontSize: 12, color: '#707070', }}>{bookings.start_city}</Text>
                                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{bookings.departure}</Text>
                                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{bookings.distance} KM </Text>
                                        </View>
                                        <View style={styles.froTo}>
                                            <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#429588', borderWidth: 1 }} />
                                            <View style={{ height: 0, width: 78, borderColor: '#707070', borderWidth: 0.3 }} />
                                            <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#FA8072', borderWidth: 1 }} />
                                        </View>
                                        <View style={styles.destination}>
                                            <Text style={{ fontSize: 12, color: '#707070', }}>{bookings.end_city}</Text>
                                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{bookings.arrival}</Text>
                                            <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>{bookings.reg_no}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </SafeAreaView>
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
        height: '5%',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    opt: {
        height: '100%',
        width: '28%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#429588'
    },

    bot: {
        height: '85%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    booking: {
        
        height: 150,
        width: 300,
        borderRadius: 23,
        margin: '5%',
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
        height: '50%',
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
        alignItems: 'flex-start',
        paddingBottom: '2%',

    },

});