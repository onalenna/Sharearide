import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable} from "react-native";
import Swiper from 'react-native-swiper'
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Swiper  
                showsButtons={false}
                loop={false}
            >
            <View style={styles.slide1}>
                <View style={styles.top}>
                    <View  style={styles.back}>
                        <Ionicons onPress={() => this.props.navigation.navigate('Login')} name="ios-chevron-back" size={40} color="#707070" />
                    </View>
                    <View style={styles.logoCon}>
                        <Image style={styles.logo} source={require('../assets/logo.png')}/>
                    </View>
                        
                </View>  

                    <View style={styles.mid}>
                        <View style={styles.midtxt}>
                            <Text style={{fontSize: 26, fontWeight: '400', color: '#707070'}}>Please enter your names</Text>
                        </View>

                        <View style={styles.midfld}>
                            <TextInput
                                style={styles.txtfld}
                            />
                            <TextInput
                                style={styles.txtfld2}
                            />
                            <TextInput
                                style={styles.txtfld2}
                            />
                        </View>
                        
                        <View style={styles.midbtn}>
                            <Pressable style={styles.btn}>
                                <Text style={{fontSize: 20, fontWeight: '500', color: '#ffffff'}}>Continue</Text>
                            </Pressable>
                        </View>
                    </View> 

                    <View style={styles.bot}>
                    

                </View> 
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
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
        //backgroundColor: '#c1c1c1',
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    back: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingLeft: '10%',
        
    },

    logoCon: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
     
    },

    logo: {
        height: 28,
        width: '55%',
    },

    mid: {
        //backgroundColor: '#FA8072',
        height: '50%',
        width: '100%',
    },

    midtxt: {
        //backgroundColor: 'blue',
        height: '20%',
        width: '100%',
        paddingLeft: '14%',
    },

    midfld: {
        //backgroundColor: 'red',
        height: '40%',
        width: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
    },

    txtfld: {
        height: 48,
        width: 305,
        borderRadius : 8,
        backgroundColor: '#F2EEED'
    },

    txtfld2: {
        height: 48,
        width: 305,
        borderRadius : 8,
        backgroundColor: '#F2EEED',
        marginTop: 15,
    },

    midbtn: {
        //backgroundColor: 'green',
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btn: {
        height: 48,
        width: 305,
        borderRadius: 24,
        backgroundColor: '#FA8072',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bot: {
        backgroundColor: '#429588',
        height: '40%',
        width: '100%',
    },

    bot1: {
        //backgroundColor: 'red',
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    line: {
        width: '80%', 
        borderBottomWidth: 1, 
        borderColor: '#707070'
    },

    bot2: {
        //backgroundColor: 'blue',
        height: '40%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    social: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bot3: {
        //backgroundColor: 'green',
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },





    slide1: {
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#fff'
      },

    slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
    },
      
    slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
    },
    text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
    }
});