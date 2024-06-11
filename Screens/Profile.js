import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, FlatList, Pressable,Platform } from "react-native";
import { Ionicons, FontAwesome5, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Profile(){

    const [username, setUsername] = useState("");
    const [lname, setUserLname] = useState("");
    const [email, setUserEmail] = useState("");
    const [phone, setUserPhone] = useState("");
    
  

    useEffect(() => {
        getAsync();
      });

    getAsync = async () => {
        try {
           const name = await AsyncStorage.getItem('name')
           const lname = await AsyncStorage.getItem('lname')
           const email = await AsyncStorage.getItem('email')
           const phone = await AsyncStorage.getItem('phone')
           
          setUsername(name)
          setUserLname(lname)
          setUserEmail(email)
          setUserPhone(phone)

         // console.log(phone,email)
          }
        catch (e) {
            console.log(e)
        }
      
      }
      
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Pressable onPress={()=> this.props.navigation.goBack()} style={styles.back}>
                        <Ionicons name="ios-chevron-back" size={30} color="#707070" />
                    </Pressable>
                    <View style={styles.label}>
                        <Text>Profile</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={20} color="#707070" />
                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <AntDesign name={'user'} size={20} color={'#429588'}/>
                        </View>
                        <View style={styles.field}>
                            <TextInput
                                style={{ height: '100%', width: '100%' }}
                                placeholder={username}
                            />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <AntDesign name={'mail'} size={20} color={'#429588'}/>
                        </View>
                        <View style={styles.field}>
                            <TextInput
                                style={{ height: '100%', width: '100%' }}
                                placeholder={email}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <AntDesign name={'lock'} size={20} color={'#429588'}/>
                        </View>
                        <View style={styles.field}>
                            <TextInput
                                style={{ height: '100%', width: '100%' }}
                                placeholder="*********" 
                                />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <AntDesign name={'phone'} size={20} color={'#429588'}/>
                        </View>
                        <View style={styles.field}>
                            <TextInput
                                style={{ height: '100%', width: '100%' }}
                                placeholder={phone}
                                keyboardType="numeric"
                                />
                                
                        </View>
                    </View>

                </View>
                <View style={styles.bot}>
                    <View style={styles.but}>
                        <Text style={{ fontSize: 15, color: '#fff' }}>SAVE</Text>
                    </View>
                </View>
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
    },

    label: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    notification: {
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    mid: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
    },

    item: {
        height: 50,
        width: '80%',
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: '3%',
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

    icon: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    field: {
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
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