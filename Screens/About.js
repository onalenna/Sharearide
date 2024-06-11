import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, Pressable, SafeAreaView, FlatList, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import axios from 'axios';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        return (


            <View style={styles.container}>
                 {/* <View style={styles.top}>
                    <Pressable onPress={()=> this.props.navigation.goBack()} style={styles.back}>
                        <Ionicons name="ios-chevron-back" size={30} color="#fff" />
                    </Pressable>
                    <View style={styles.label}>
                        <Text style={{color: '#fff'}}>About</Text>
                    </View>
                    <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={20} color="#fff" />
                    </View>
                </View> */}
                <View style={styles.mid}>
                   <Image style={{height: '10%', width: '69%'}} source={require('../assets/logobw.png')}/>
                   <Text style={{ color: '#fff', fontSize: 20 }}>SHAREARIDE</Text>
                   <Text style={{ color: '#fff', }}>Version: 1.0.0.0</Text>
                   <Text style={{ color: '#fff', }}>© 2024 Corrugated Minds</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#429588',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight,
        width: windowWidth,
       // marginTop: '10%'
    },

    // top: {
    //     height: '8%',
    //     width: '100%',
    //     flexDirection: 'row',
    // },

    // back: {
    //     height: '100%',
    //     width: '25%',
    //     justifyContent: 'center',
    //     paddingLeft: '5%',
    //     // backgroundColor: 'blue',
    // },

    // label: {
    //     height: '100%',
    //     width: '50%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // backgroundColor: 'red',
    // },

    // notification: {
    //     height: '100%',
    //     width: '25%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     //backgroundColor: 'green',
    // },

    mid: {
        height: '84%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // bot: {
    //     height: '8%',
    //     width: '100%',
    // },
});