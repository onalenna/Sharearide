
import React, { useMemo, useState, useNavigation } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const val = 0;

export default class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardNo: '**** **** **** 0000',
            month: '00',
            year: '00',
            name: 'John Doe',
            CVV: '000',
            type: null
        }
    }

    formatCard(val) {
        const v = val.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        const result = [];

        for (let i = 0; i < v.length; i += 4) {
            result.push(v.substr(i, 4));
        }
        return result.length > 1 ? result.join(" ") : val;
    }

    typeCardNo(text) {
        const num = this.formatCard(text)

        this.setState({ cardNo: num })
        if (this.state.cardNo.charAt(0) == 4) {
            this.setState({ type: require('../assets/visa.jpg') });
        }

        if (this.state.cardNo.charAt(0) == 2 || this.state.cardNo.charAt(0) == 5) {
            this.setState({ type: require('../assets/master.jpg') });
        }

    }

    typeName(text) {
        this.setState({ name: text })
    }

    typeMonth(text) {
        this.setState({ month: text })
    }

    typeYear(text) {
        this.setState({ year: text })
    }

    typeCVV(text) {
        this.setState({ CVV: text })
    }

    idCounter() {
        let count = 0;
    
        // Inner function that increments the counter
        function increment() {
            count++;
            return count;
        }
    
        // Return the increment function
        return increment;
    }



    render() {

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.top}>
                    <Pressable onPress={() => this.props.navigation.goBack()} style={styles.drawer}>
                        <Ionicons name={'arrow-back'} size={25} color={'#707070'} />
                    </Pressable>
                    <View style={styles.title}>
                        <Text style={{ color: '#707070' }}>Add Card</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name={'notifications'} size={20} color={'#707070'} />
                    </View>
                </View>
                <ScrollView >
                    <View style={styles.mid1}>
                        <View style={styles.card}>
                            <View style={styles.cardTop}>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#707070', fontWeight: '500' }}>FNB</Text>
                                </View>
                                <View style={{ height: '100%', width: '50%', alignItems: 'flex-end' }}>
                                    {/* <Image style={{ height: '100%', width: '35%' }} source={require('../assets/fnb.png')} /> */}
                                </View>
                            </View>
                            <View style={styles.cardMid}>
                                <Text style={{ fontSize: 22, color: '#707070', fontWeight: '500' }}>{this.state.cardNo}</Text>
                            </View>
                            <View style={styles.cardBot}>
                                <View style={{ height: '100%', width: '50%', }}>
                                    <Text style={{ fontSize: 12, color: '#707070', marginBottom: '15%' }}>Exp:{this.state.month}/{this.state.year}</Text>
                                    <Text style={{ fontSize: 12, color: '#707070', }}>{this.state.name}</Text>
                                </View>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Image style={{ height: '55%', width: '30%', }} source={this.state.type} />
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.mid2}>
                        <View style={styles.cardNo}>
                            <TextInput
                                //value={this.formatCard(this.state.cardNo)}
                                keyboardType='numeric'
                                placeholder='Card Number'
                                style={{ height: '80%', width: '95%', fontSize: 20 }}
                                onChangeText={(text) => this.typeCardNo(text)}
                            />
                        </View>
                        <View style={styles.name}>
                            <TextInput
                                placeholder='Name'
                                style={{ height: '80%', width: '95%', fontSize: 20 }}
                                onChangeText={(text) => this.typeName(text)}
                            />
                        </View>
                        <View style={styles.digits}>
                            <View style={styles.month}>
                                <TextInput
                                    maxLength={2}
                                    keyboardType='numeric'
                                    placeholder='00'
                                    style={{ height: '80%', width: '95%', textAlign: 'center', fontSize: 20 }}
                                    onChangeText={(text) => this.typeMonth(text)}
                                />
                            </View>
                            <View style={styles.year}>
                                <TextInput
                                    maxLength={2}
                                    keyboardType='numeric'
                                    placeholder='00'
                                    style={{ height: '80%', width: '95%', textAlign: 'center', fontSize: 20 }}
                                    onChangeText={(text) => this.typeYear(text)}
                                />
                            </View>
                            <View style={styles.cvv}>
                                <TextInput
                                    maxLength={3}
                                    keyboardType='numeric'
                                    placeholder='000'
                                    style={{ height: '80%', width: '95%', textAlign: 'center', fontSize: 20 }}
                                    onChangeText={(text) => this.typeCVV(text)}
                                />
                            </View>

                        </View>

                    </View>
                    <View style={styles.bot}>
                        <Pressable onPress={() => this.onSave()} style={{ height: '18%', width: '60%', backgroundColor: '#707070', alignItems: 'center', borderRadius: 25, justifyContent: 'center', }}>
                            <Text style={{ color: '#fff' }}>Save</Text>
                        </Pressable>
                    </View>


                </ScrollView>
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
        //  marginTop: '8%'
    },

    top: {
        height: '8%',
        width: '100%',
        flexDirection: 'row',
    },

    drawer: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        height: '100%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    notification: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    mid1: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        height: '80%',
        width: '93%',
        borderRadius: 23,
        padding: '4%',
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

    cardTop: {
        height: '40%',
        width: '100%',
        flexDirection: 'row',
    },

    cardMid: {
        height: '20%',
        width: '100%',
    },

    cardBot: {
        height: '40%',
        width: '100%',
        flexDirection: 'row',
    },

    mid2: {
        height: 168,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardNo: {
        height: 48,
        width: '93%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EEED'
    },

    name: {
        height: 48,
        width: '93%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EEED'
    },

    digits: {
        height: 48,
        width: '93%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    month: {
        height: '100%',
        width: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EEED'
    },

    year: {
        height: '100%',
        width: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EEED'
    },

    cvv: {
        height: '100%',
        width: '45%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EEED'
    },

    bot: {
        height: 250,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },





});