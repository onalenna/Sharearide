import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        icon: 'user',
        title: 'Profile',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        icon: 'tago',
        title: 'Bookings',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f69',
        icon: 'creditcard',
        title: 'Payments',
    },


];


const separator = () => {
    return (
        <View style={{ borderBottomWidth: 0.3, width: '85%', alignSelf: 'center', borderColor: '#c1c1c1' }} />
    )
};


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onClick(i) {
        if (i == 0) {
           this.props.navigation.navigate('UserPro')
        }
        if (i == 1) {
            this.props.navigation.navigate('Bookings')
         }
    }

    async logout(){
      
            try {
                this.props.navigation.navigate('SignIn')
                await AsyncStorage.removeItem(key);
               
                return true;
            }
            catch(exception) {
                return false;
            }
        
    }


    render() {
        return (


            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.back}>
                        <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                    </View>
                    <View style={styles.label}>
                        <Text>Account</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={20} color="#707070" />
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
                                <TouchableOpacity onPress={()=> this.onClick(index)} style={styles.flatItem}>
                                    <View style={styles.icon}>
                                        <AntDesign name={item.icon} size={19} color="#707070" />
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={{ fontSize: 16 }}>{item.title}</Text>
                                    </View>
                                    <View style={styles.icon2}>
                                        <MaterialIcons name={'keyboard-arrow-right'} size={25} color="#707070" />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </SafeAreaView>
                <View style={styles.bot}>
                    <TouchableOpacity onPress={()=> this.logout()} style={styles.but}>
                        <Text style={{ fontSize: 15, color: '#fff' }}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },

    flatItem: {
        height: 45,
        width: 330,
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '4%',
    },

    item: {
        height: '100%',
        width: '60%',
        justifyContent: 'center',
    },

    icon2: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '5%',
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
    }




});