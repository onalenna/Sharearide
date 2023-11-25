import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        icon: 'user',
        title: 'My Details',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        icon: 'tag',
        title: 'Bookings',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f69',
        icon: 'credit-card',
        title: 'Payments',
    },


];

const Item = (item) => (
    <TouchableOpacity style={styles.flatItem}>
        <View style={styles.icon}>
            <FontAwesome5 name={item.icon} size={20} color="#707070" />
        </View>
        <View style={styles.item}>
            <Text style={{fontSize: 18}}>{item.title}</Text>
        </View>

    </TouchableOpacity>
);

const separator = () => {
    return (
        <View style={{ borderBottomWidth: 0.3, width: '90%', alignSelf: 'center' }} />
    )
};


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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
                        <Text>Profile</Text>
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
                        renderItem={({ item }) => <Item title={item.title} icon={item.icon} />}
                        keyExtractor={item => item.id}
                    //extraData={selectedId}
                    //horizontal={true}
                    />
                </SafeAreaView>
                <View style={styles.bot}>
                    <View style={styles.but}>
                        <Text style={{fontSize: 15, color: '#fff'}}>LOGOUT</Text>
                    </View>
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
        height: 60,
        width: 340,
        // backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    item: {
        height: '100%',
        width: '70%',
        justifyContent: 'center',
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