import React, { Component, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text, Image, TextInput, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, TouchableOpacity, Modal } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f69',
        title: 'Second Item',
    },


];

const Item = () => (
    <TouchableOpacity style={styles.flatItem}>
        <Image style={{ height: 120, width: 118, borderRadius: 19, alignSelf: 'center' }} source={require('../assets/bus.jpg')} />
        <Text style={{ color: '#707070' }}>BusTravel Tours</Text>
        <View style={{ height: '10%', width: '100%', flexDirection: 'row', }}>
            <View style={{ height: '100%', width: '20%', flexDirection: 'row', alignItems: 'center', }}>
                <Ionicons name='location' color='#FA8072' />
            </View>
            <View style={{ height: '100%', width: '80%', flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontSize: 9, color: '#707070' }}>Gaborone - Francistown</Text>
            </View>
        </View>
        <View style={{ height: '10%', width: '100%', flexDirection: 'row', }}>
            <View style={{ height: '100%', width: '20%', flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name='clock' color='#FA8072' />
            </View>
            <View style={{ height: '100%', width: '80%', flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontSize: 9, color: '#707070' }}>0800hrs - 1730hrs</Text>
            </View>
        </View>
        <View style={{ height: '10%', width: '100%', flexDirection: 'row', }}>
            <View style={{ height: '100%', width: '20%', flexDirection: 'row', alignItems: 'center', }}>
                <Ionicons name='map-sharp' color='#FA8072' />
            </View>
            <View style={{ height: '100%', width: '80%', flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontSize: 9, color: '#707070' }}>0800hrs - 1730hrs</Text>
            </View>
        </View>


    </TouchableOpacity>
);

const separator = () => {
    return (
        <View style={{ width: 20 }} />
    )
};

//const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDatePicker = () => {
    setDatePickerVisibility(true);
};

const hideDatePicker = () => {
    setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
   // console.warn("A date has been picked: ", date);
    hideDatePicker();
};

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cal: false,
            num: 0
        }
    }

    increment() {
        this.setState({ num: this.state.num + 1 })
    }

    decrement() {
        if ( this.state.num > 0) {
            this.setState({ num: this.state.num - 1 })
        }

    }


    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>

                <View style={styles.top}>
                    <View style={styles.logoCon}>
                        <Image style={styles.logo} source={require('../assets/logo.png')} />
                    </View>
                    <View style={styles.wlcm}>
                        <Text style={{ fontSize: 18, color: '#707070' }} >Hello, Jon Dough</Text>
                    </View>
                </View>

                <View style={styles.mid}>
                    <View style={styles.midCard}>
                        <View style={styles.midCard1}>
                            <Text style={{ fontSize: 21, fontWeight: '600', color: '#707070' }}>Choose your destination</Text>
                        </View>
                        <View style={styles.midCard2}>
                            <TextInput
                                fontSize={20}
                                style={styles.txtfld}
                            />

                            <TextInput
                                fontSize={20}
                                style={styles.txtfld}
                            />
                        </View>
                        <View style={styles.midCard3}>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'center' }}>
                                <Pressable onPress={() => this.setState({ cal: true })} style={{ height: 27, width: 94, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FA8072' }}>
                                    <Text style={{ color: "#fff", paddingRight: "10%" }}>Date</Text>
                                    <Ionicons name="calendar" color="#fff" size={20} />
                                </Pressable>
                                <DateTimePickerModal
                                    isVisible={this.state.cal}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View>
                            <View style={{ height: '100%', width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10%', }}>
                                <Pressable onPress={() => this.decrement()} style={{ height: 26, width: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2EEED' }}>
                                    <FontAwesome5 name="minus" color="#707070" size={18} />
                                </Pressable>
                                <View style={{ height: 26, width: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FA8072' }}>
                                    <Text style={{ color: "#fff", fontSize: 18 }}>{this.state.num}</Text>
                                </View>
                                <Pressable onPress={() => this.increment()} style={{ height: 26, width: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2EEED' }}>
                                    <FontAwesome5 name="plus" color="#707070" size={18} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.midCard4}>
                            <Pressable style={{ height: 36, width: '100%', borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#429588' }}>
                                <Text style={{ color: "#fff", }}>Search</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>

                <View style={styles.bot}>
                    <View style={styles.bot1}>
                        <Text style={{ fontSize: 21, fontWeight: '300', color: '#707070' }}>Favourite Routes</Text>
                    </View>
                    <SafeAreaView style={styles.bot2}>
                        <FlatList
                            ItemSeparatorComponent={separator}
                            data={DATA}
                            renderItem={Item}
                            keyExtractor={item => item.id}
                            //extraData={selectedId}
                            horizontal={true}
                        />
                    </SafeAreaView>
                </View>


            </KeyboardAwareScrollView>

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
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'red'
    },

    logoCon: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        height: 29,
        width: '65%',
    },

    wlcm: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    mid: {
        height: 290,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },

    midCard: {
        height: '90%',
        width: '85%',
        padding: '5%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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

    midCard1: {
        height: '15%',
        width: '100%',
        //  backgroundColor: 'green'
    },

    midCard2: {
        height: '40%',
        width: '100%',
        justifyContent: 'space-between',
        //  backgroundColor: 'blue'
    },

    txtfld: {
        paddingLeft: '4%',
        height: 38,
        width: '100',
        borderRadius: 11,
        backgroundColor: '#F2EEED'
    },

    midCard3: {
        height: '25%',
        width: '100%',
        justifyContent: 'space-between',
        //backgroundColor: 'red',
        flexDirection: 'row',
    },

    midCard4: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        //backgroundColor: 'yellow'
    },

    bot: {
        height: '50%',
        width: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green'
    },

    bot1: {
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        //backgroundColor: 'blue',
        paddingLeft: '8%'
    },

    bot2: {

        alignItems: 'center',
        //backgroundColor: 'red',
        paddingTop: '6%',
        paddingLeft: '2%',
        paddingRight: '2%',
    },

    flatItem: {
        height: 216,
        width: 140,
        padding: '7%',
        borderRadius: 21,
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

    modal: {
        height: '30%',
        width: '90%',
        marginTop: '50%',
        alignSelf: 'center',
        borderRadius: 20,
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
        })
    }

});