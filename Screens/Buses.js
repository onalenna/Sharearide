import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
        <View >

        </View>
    </TouchableOpacity>
);

const separator = () => {
    return (
        <View style={{ height: 10 }} />
    )
};


export default class Buses extends React.Component {

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
                        <Text>Available Trips</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                    </View>
                </View>
                <SafeAreaView style={styles.bot}>
                   
                        <FlatList
                            style={{height: '100%'}}
                            ItemSeparatorComponent={separator}
                            data={DATA}
                            renderItem={Item}
                            keyExtractor={item => item.id}
                            //extraData={selectedId}
                            //horizontal={true}
                        />
                   
                </SafeAreaView>
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
        backgroundColor: '#c1c1c1',
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

    bot: {
        backgroundColor: '#707070',
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    flatItem: {
        height: 160,
        width: 340,
        borderRadius: 31,
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
    
    }

});