import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // {JSON.stringify(navigation.getParam('title'))}
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.top}>
                    <Pressable onPress={() => this.props.navigation.goBack()} style={styles.back}>
                        <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                    </Pressable>
                    <View style={styles.label}>
                        <Text>Details</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                    </View>
                </View>


                <View style={styles.mid}>
                    <View style={styles.map}>

                    </View>
                    <View style={styles.info}>
                        <View style={styles.cardtop}>
                            <View style={styles.logo}>
                                <Image style={{ height: 38, width: 38, borderRadius: 19, alignSelf: 'center' }} source={require('../assets/cardart.jpg')} />
                            </View>
                            <View style={styles.title}>
                                <Text style={{ fontSize: 15, color: '#707070' }}>Sharearide Travel & Tours</Text>
                            </View>
                            <View style={styles.price}>
                                <View style={{ height: 27, width: 83, borderRadius: 18, backgroundColor: '#707070', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>P 350.00</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardmid}>
                            <View style={styles.departure}>
                                <Text style={{ fontSize: 12, color: '#707070', }}>Gaborone</Text>
                                <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>8:00 AM</Text>
                            </View>
                            <View style={styles.froTo}>
                                <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#429588', borderWidth: 1 }} />
                                <View style={{ height: 0, width: '70%', borderColor: '#707070', borderWidth: 0.3 }} />
                                <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: '#FA8072', borderWidth: 1 }} />
                            </View>
                            <View style={styles.destination}>
                                <Text style={{ fontSize: 12, color: '#707070', }}>Francistown</Text>
                                <Text style={{ fontSize: 12, color: '#707070', fontWeight: 'bold' }}>5:30 PM</Text>
                            </View>

                        </View>
                        <View style={styles.cardbot}>
                            <View style={styles.time}>
                                <FontAwesome5 name='clock' size={20} color='#FA8072' />
                                <Text style={{ fontSize: 12, color: '#707070', }}>9hrs</Text>
                            </View>
                            <View style={styles.distance}>
                                <MaterialCommunityIcons name='map-marker-distance' size={20} color='#FA8072' />
                                <Text style={{ fontSize: 12, color: '#707070', }}>250km</Text>
                            </View>
                            <View style={styles.seats}>
                                <MaterialCommunityIcons name='seat' size={20} color='#FA8072' />
                                <Text style={{ fontSize: 12, color: '#707070', }}>45/50</Text>
                            </View>
                            <View style={styles.date}>
                                <Ionicons name='calendar' size={15} color='#FA8072' />
                                <Text style={{ fontSize: 12, color: '#707070', }}>07/10/23</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bot}>
                    <View style={styles.bot1}>
                        <Text style={{ color: '#707070', fontSize: 15 }}>Intermediate Destinations</Text>
                    </View>
                    <View style={styles.bot2}>
                        <View style={styles.inter}>
                            <View style={{ height: '100%', width: '30%', justifyContent: 'center', alignItems: 'center',}}>
                                <View style={{ height: 50, width: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#707070' }}>
                                    <Ionicons name="bus" size={25} color={'#fff'} />
                                </View>
                            </View>
                            <View style={{ height: '100%', width: '70%', justifyContent: 'center',}}>
                                <Text style={{ color: '#707070', fontSize: 15 }}>Palapye Bus Station</Text>
                                <View style={{height: '40%', width: '25%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <FontAwesome5 name="clock" size={20} color='#FA8072' />
                                    <Text style={{ color: '#707070', fontSize: 15 }}>2 hrs</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bot3}>
                        <Pressable onPress={()=> this.props.navigation.navigate('Seats')} style={{height: '50%', width: '80%', backgroundColor: '#429588', borderRadius: 18, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 18, color: '#fff'}}>Continue</Text>
                        </Pressable>
                    </View>
                </View>

            </SafeAreaView>

        )
    }
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

    mid: {
        height: '60%',
        width: '100%',
        padding: '3%',
        //  backgroundColor: 'blue'
    },

    map: {
        height: '60%',
        width: '100%',
        borderRadius: 25,
        backgroundColor: '#f1f1f1'
    },

    info: {
        height: '40%',
        width: '100%',
        padding: '2%'
        // backgroundColor: 'green'
    },

    cardtop: {
        //backgroundColor: 'green',
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
        alignItems: 'flex-end',
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
        width: '20%',
        alignItems: '',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingBottom: '5%',
    },

    froTo: {
        height: '100%',
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    destination: {
        height: '100%',
        width: '20%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingBottom: '5%',

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
    },

    bot: {
        height: '30%',
        width: '100%',
    },

    bot1: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        paddingLeft: '3%',
    },

    bot2: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inter: {
        height: '80%',
        width: '90%',
        borderRadius: 27,
        flexDirection: 'row',
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

    bot3: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }

});