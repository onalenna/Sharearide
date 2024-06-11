import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const navigation = useNavigation();

    const storeUserData = async (userData) => {
        try {
            await AsyncStorage.multiSet([
                ['accessToken', userData.accessToken],
                ['idToken', userData.idToken],
                ['expiresIn', userData.expiresIn],
                ['email', userData.email],
                ['userId', userData.userId],
                ['firstName', userData.firstName],
                ['lastName', userData.lastName],
                ['role', userData.role],
            ]);
        } catch (e) {
            console.log('Error storing user data', e);
        }
    };

    const login = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (userEmail === "") {
            setEmailError('Please enter an Email address');
        } else if (userPassword === "") {
            setEmailError('Please enter password');
        } else {
            try {
                const response = await axios.post('https://api.dev.sharearide.co.bw/app/uaa/v1/signin', {
                    email: userEmail,
                    password: userPassword,
                });

                if (response.data.success) {
                    const { accessToken, idToken, expiresIn, email, userId, firstName, lastName, role } = response.data.data;
                    //navigation.navigate('Landing', { firstName: firstName });
                   // alert(response.data.data);
                    // Store tokens and user data in AsyncStorage
                    await storeUserData(response.data.data);
                    navigation.navigate('Landing', { firstName: firstName });

                  //  console.log("User data stored successfully: " + firstName);
                } else {
                    alert(response.data.message);
                }
                
            } catch (error) {
                alert(error.response?.data?.message || "An error occurred");
            }
        }

        Keyboard.dismiss();
    };

    const signup = () => (
        <Text style={{ fontSize: 15, color: '#429588', fontWeight: 'bold' }}>Sign up here</Text>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>

            <View style={styles.mid}>
                <View style={styles.midtxt}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: '#707070' }}>Let's get started!</Text>
                </View>

                <View style={styles.midfld}>
                    <View style={styles.txtfld}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="mail" size={20} color="#707070" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setUserEmail}
                                style={styles.textInput}
                                placeholder="Email"
                                value={userEmail}
                            />
                        </View>
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.txtfld2}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="lock-closed" size={20} color="#707070" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                onChangeText={setUserPassword}
                                style={styles.textInput}
                                placeholder="Password"
                                secureTextEntry
                                value={userPassword}
                            />
                        </View>
                    </View>

                    <View style={styles.fgtpas}>
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </View>
                </View>

                <View style={styles.midbtn}>
                    <Pressable onPress={login} style={styles.btn}>
                        <Text style={styles.btnText}>SIGN IN</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.bot}>
                <View style={styles.bot1}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.lineContainer}>
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
                    <Text onPress={() => navigation.navigate('Registration')}>
                        Don't have an account? {signup()}
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        height: windowHeight,
        width: windowWidth,
        marginTop: '8%',
    },
    top: {
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
        height: 290,
        width: '100%',
    },
    midtxt: {
        height: '20%',
        width: '100%',
        paddingLeft: '10%',
    },
    midfld: {
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
        backgroundColor: '#F2EEED',
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
    },
    midbtn: {
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
        height: '40%',
        width: '100%',
    },
    bot1: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    lineContainer: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: '80%',
        borderBottomWidth: 1,
        borderColor: '#707070',
    },
    orText: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#707070',
    },
    bot2: {
        height: '40%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    social: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bot3: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
    },
    inputContainer: {
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    textInput: {
        height: '100%',
        width: '100%',
        fontSize: 18,
    },
    forgotPasswordText: {
        fontSize: 15,
        color: '#707070',
        textAlign: 'right',
    },
    btnText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#ffffff',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default Login;
