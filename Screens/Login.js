import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    signup() {
        return (
            <Text style={{ fontSize: 15, color: '#429588', fontWeight: 'bold' }}> Sign up here </Text>
        )
    }
    render() {

        return (


            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.top}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                </View>

                <View style={styles.mid}>
                    <View style={styles.midtxt}>
                        <Text style={{ fontSize: 26, fontWeight: '600', color: '#707070' }}>Lets get started!</Text>
                    </View>

                    <View style={styles.midfld}>
                        <View style={styles.txtfld}>
                            <View style={{height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 8, borderTopLeftRadius: 8,}}>
                                <Ionicons name="mail" size={20} color="#707070"/>
                            </View>
                            <View style={{height: '100%', width: '80%', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 8, borderTopRightRadius: 8, }}>
                                <TextInput placeholder='Email' fontSize={18} style={{height: '100%', width: '100%'}}/>
                            </View>
                        </View>

                        <View style={styles.txtfld2}>
                            <View style={{height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 8, borderTopLeftRadius: 8,}}>
                                <Ionicons name="lock-closed" size={20} color="#707070"/>
                            </View>
                            <View style={{height: '100%', width: '80%', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 8, borderTopRightRadius: 8, }}>
                                <TextInput placeholder='Password' fontSize={18} style={{height: '100%', width: '100%'}}/>
                            </View>
                        </View>

                        <View style={styles.fgtpas}>
                            <Text style={{ fontSize: 15, color: '#707070', textAlign: 'right' }}>Forgot password?</Text>
                        </View>
                    </View>

                    <View style={styles.midbtn}>
                        <Pressable onPress={() => this.props.navigation.navigate('Landing')} style={styles.btn}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: '#ffffff' }}>SIGN IN</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.bot}>
                    <View style={styles.bot1}>
                        <View style={{ width: '45%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.line} />
                        </View>
                        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#707070' }}>OR</Text>
                        </View>
                        <View style={{ width: '45%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.line} />
                        </View>
                    </View>
                    <View style={styles.bot2}>
                        <View style={styles.social}>
                            <FontAwesome5 name="facebook" size={50} color="#1877F2" />
                        </View>
                        <View style={styles.social}>
                            <FontAwesome name="google" size={50} color="#DB4437" />
                        </View>
                        <View style={styles.social}>
                            <FontAwesome name="twitter" size={50} color="#1DA1F2" />
                        </View>
                    </View>

                    <View style={styles.bot3}>
                        <Text onPress={() => this.props.navigation.navigate('Registration')}>Don't have an account? {this.signup()}</Text>
                    </View>

                </View>
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
        //backgroundColor: '#c1c1c1',
        height: 148,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        height: '40%',
        width: '66%',
    },

    mid: {
        //backgroundColor: '#FA8072',
        height: 290,
        width: '100%',
    },

    midtxt: {
        //backgroundColor: 'blue',
        height: '20%',
        width: '100%',
        paddingLeft: '10%',
    },

    midfld: {
       // backgroundColor: 'red',
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtfld: {
        height: 48,
        width: 305,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#F2EEED'
    },

    txtfld2: {
        height: 48,
        width: 305,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#F2EEED',
        marginTop: 10,
    },

    fgtpas: {
        height: 25,
        width: 305,
        justifyContent: 'center',
        //backgroundColor: 'yellow',
    },

    midbtn: {
        //backgroundColor: 'green',
        height: '20%',
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
        //backgroundColor: '#429588',
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
});