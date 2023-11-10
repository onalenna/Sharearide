import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Buses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render() {
        return (


            <View style={styles.container}>
                <Text>This is the Buses screen</Text>     
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
    },
});