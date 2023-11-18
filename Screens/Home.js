import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                                style={styles.txtfld}
                            />
                            <TextInput
                                style={styles.txtfld}
                            />
                        </View>
                        <View style={styles.midCard3}>

                        </View>
                        <View style={styles.midCard4}>

                        </View>

                    </View>
                </View>

                <View style={styles.bot}>

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
        marginTop: '10%'
    },

    top: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'red'
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
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },

    midCard: {
        height: '90%',
        width: '85%',
        padding: '5%',
        borderRadius: 30,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        backgroundColor: 'green'
    },

    midCard2: {
        height: '40%',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'blue'
    },

    txtfld: {
        height: 38,
        width: '100',
        borderRadius: 11,
        backgroundColor: '#F2EEED'
    },

    midCard3: {
        height: '25%',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'red'
    },

    midCard4: {
        height: '20%',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'yellow'
    },

    bot: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
});