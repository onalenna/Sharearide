import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const navigation = useNavigation()

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render() {
        return (


            <View style={styles.container}>
                <View style={styles.top}>
                    <Image style={styles.logo} source={require('../assets/logo.png')}/>
                </View>  

                <View style={styles.mid}>
                    <View style={styles.midtxt}>
                        <Text style={{fontSize: 26, fontWeight: '600', color: '#707070'}}>Lets get started!</Text>
                    </View>

                    <View style={styles.midfld}>
                        <TextInput
                            style={styles.txtfld}
                        />
                        <TextInput
                            style={styles.txtfld2}
                        />
                        <View style={styles.fgtpas}>
                        <Text style={{fontSize: 15, color: '#707070', textAlign: 'right'}}>Forgot password?</Text>
                    </View>
                    </View>
                    
                    <View style={styles.midbtn}>
                        <Pressable style={styles.btn}>
                            <Text style={{fontSize: 20, fontWeight: '500', color: '#ffffff'}}>SIGN IN</Text>
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

                    </View>
                    <View style={styles.bot3}>

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
        //backgroundColor: '#c1c1c1',
        height: 145,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        height: '48%',
        width: '77%',
    },

    mid: {
        //backgroundColor: '#FA8072',
        height: 370,
        width: '100%',
    },

    midtxt: {
        //backgroundColor: 'blue',
        height: '20%',
        width: '100%',
        paddingLeft: 28,
        paddingTop: 15,
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

    fgtpas: {
        height: 25,
        width: 305,
        justifyContent: 'center',
        //backgroundColor: 'yellow',
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
        //backgroundColor: '#429588',
        height: 215,
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
        backgroundColor: 'blue',
        height: '40%',
        width: '100%',
    },

    bot3: {
        backgroundColor: 'green',
        height: '40%',
        width: '100%',
    },
});