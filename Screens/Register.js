import React, { Component, useRef } from "react";
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
            dbc2: '#fff',
            dbc3: '#fff',
            idx: 0
        }
    }

    dot1Swipe(){
        if(this.state.dbc3 == '#fff'){
            this.refs.swiper.scrollBy(-1)
            this.setState({dbc2: '#fff'})
        } 
        if(this.state.dbc3 == '#FA8072'){
            this.refs.swiper.scrollBy(-2)
            this.setState({dbc2: '#fff', dbc3: '#fff'})
        }
    }

    dot2Swipe(){
        if(this.state.dbc2 == '#fff'){
            this.refs.swiper.scrollBy(1)
            this.setState({dbc2: '#FA8072'})
        }
        if(this.state.dbc2 == '#FA8072'){
            this.refs.swiper.scrollBy(-1)
            this.setState({dbc3: '#fff'})
        }  
    }

    dot3Swipe(){
        if(this.state.dbc2 == '#fff'){
            this.refs.swiper.scrollBy(2)
            this.setState({dbc2: '#FA8072', dbc3: '#FA8072'})
        }
        if(this.state.dbc2 == '#FA8072'){
            this.refs.swiper.scrollBy(1)
            this.setState({ dbc3: '#FA8072'})
        }
          
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View  style={styles.back}>
                        <Ionicons onPress={() => this.props.navigation.navigate('Login')} name="ios-chevron-back" size={40} color="#707070" />
                    </View>
                    <View style={styles.logoCon}>
                        <Image style={styles.logo} source={require('../assets/logo.png')}/>
                    </View>
                        
                </View> 
            <Swiper  
                showsButtons={false}
                loop={false}
                index={this.state.idx}
                showsPagination={false}
                scrollEnabled={false}
                ref="swiper"
            >
            <View style={styles.slide1}>
                 

                <View style={styles.sld1con}>
                    <View style={styles.midtxt}>
                        <Text style={{fontSize: 26, fontWeight: '400', color: '#707070'}}>Please enter your names</Text>
                    </View>

                    <View style={styles.midfld}>
                        <TextInput
                            placeholder=""
                            style={styles.txtfld}
                        />
                        <TextInput
                            style={styles.txtfld2}
                        />
                        <TextInput
                            style={styles.txtfld3}
                        />
                    </View>
                    
                    <View style={styles.midbtn}>
                        <Pressable onPress={()=> {this.refs.swiper.scrollBy(1), this.setState({dbc2: '#FA8072'})}} style={styles.btn}>
                            <Text style={{fontSize: 20, fontWeight: '500', color: '#ffffff'}}>Continue</Text>
                        </Pressable>
                    </View>
                </View> 
 
            </View>
            <View style={styles.slide2}>
            <View style={styles.sld2con}>
                    <View style={styles.midtxt}>
                        <Text style={{fontSize: 26, fontWeight: '400', color: '#707070'}}>How do we contact you?</Text>
                    </View>

                    <View style={styles.midfld}>
                        <TextInput
                            style={styles.txtfld}
                        />
                        <TextInput
                            style={styles.txtfld2}
                        />
                    </View>
                    
                    <View style={styles.midbtn}>
                        <Pressable onPress={()=> {this.refs.swiper.scrollBy(1), this.setState({dbc3: '#FA8072'})}} style={styles.btn}>
                            <Text style={{fontSize: 20, fontWeight: '500', color: '#ffffff'}}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
          <View style={styles.bot}>
                    <Pressable onPress={()=> this.dot1Swipe()} style={styles.dot1}/>
                    <View style={styles.line1}/>
                    <Pressable onPress={()=> this.dot2Swipe()} style={[styles.dot2, {backgroundColor: this.state.dbc2}]}/>
                    <View style={styles.line2}/>
                    <Pressable onPress={()=> this.dot3Swipe()} style={[styles.dot3, {backgroundColor: this.state.dbc3}]}/>
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
        height: 30,
        width: '66%',
    },

    sld1con: {
        //backgroundColor: '#FA8072',
        height: '100%',
        width: '100%',
    },

    midtxt: {
        //backgroundColor: 'blue',
        height: '20%',
        width: '100%',
        paddingLeft: '10%',
        paddingTop: '10%',
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

    txtfld3: {
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
        //backgroundColor: '#429588',
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    dot1: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: '#FA8072',
    },

    dot2: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#FA8072',
        
    },

    dot3: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#FA8072',
        backgroundColor: '#FFF',
    },

    line1: {
        width: 115, 
        borderBottomWidth: 1, 
        borderColor: '#FA8072',
    },

    line2: {
        width: 115, 
        borderBottomWidth: 1, 
        borderColor: '#FA8072',
    },

    bot1: {
        //backgroundColor: 'red',
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },






    slide1: {
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#fff'
      },

    slide2: {
    //backgroundColor: '#97CAE5'
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