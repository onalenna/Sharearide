
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
    {
        id: '1',
        icon: 'bus',
        title: 'Departure',
        subtitle: 'Gaborone to Francistown',
        message: 'Your bus leaves in an hour, please make...',
        time: '10:45',
        status: 'flex'
    },
    {
        id: '2',
        icon: 'close',
        title: 'Cancellation',
        subtitle: 'Gaborone to Maun',
        message: 'We regret to inform you that the trip sche...',
        time: '14:17',
        status: 'none'
    },
    {
        id: '3',
        icon: 'pricetag',
        title: 'Ticket',
        subtitle: 'Gaborone to Kasane',
        message: 'Your booking has been confirmed...',
        time: '17:47',
        status: 'flex'
    },
];

const separator = () => {
    return (
        <View style={{ borderBottomWidth: 0.3, width: '85%', alignSelf: 'center', borderColor: "#c1c1c1" }} />
    )
};


export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }




    render() {

        return (


            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.top}>
                    <Pressable onPress={()=> this.props.navigation.goBack()} style={styles.back}>
                        <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                    </Pressable>
                    <View style={styles.label}>
                        <Text>Notifications</Text>
                    </View>
                    <View style={styles.notification}>
                        {/* <Ionicons name="md-notifications-outline" size={20} color="#707070" /> */}
                    </View>
                </View>

                <SafeAreaView style={styles.mid}>
                    <FlatList
                        style={{ height: '100%' }}
                        ItemSeparatorComponent={separator}
                        data={DATA}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.flatItem}>
                                    <View style={styles.icon}>
                                        <View style={styles.symbol}>
                                            <Ionicons name={item.icon} size={20} color="#707070" />
                                        </View>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={{ fontSize: 15 }}>{item.title}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.subtitle}</Text>
                                        <Text style={{ fontSize: 12, color: '#707070' }}>{item.message}</Text>
                                        <Text style={{ fontSize: 15, color: '#707070' }}>{item.time}</Text>
                                    </View>
                                    <View style={[styles.icon2, {display: item.status}]}>
                                        <View style={styles.dot} />
                                    </View>

                                </TouchableOpacity>
                            )
                        }}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>

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
        height: '100%',
        width: '100%',
       // alignItems: 'center',
    },

    flatItem: {
        height: 90,
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },

    icon: {
        height: '80%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    symbol: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9fff3'
    },

    item: {
        height: '80%',
        width: '75%',
        justifyContent: 'center',
    },

    icon2: {
        height: '80%',
        width: '5%',
        alignItems: 'flex-end',
    },

    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#429588'
    },
});


