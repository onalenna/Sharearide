import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Image, TextInput, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, View, Text, Dimensions, Buffer } from "react-native";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { toByteArray } from 'base64-js';
import { base64FromBytes } from 'base64-js'; // Update the import

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Item = ({ route, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Details', { tripDetails: route })} style={styles.flatItem}>
    {/* Display bus image */}
    <Image
      style={{ height: 120, width: 118, borderRadius: 19, alignSelf: "center" }}
      source={{ uri: route.image }} // Assuming route.image is a valid URI
    />
    <Text style={{ color: "#707070" }}>{route.company}</Text>
    <View style={{ height: "10%", width: "100%", flexDirection: "row" }}>
      <View style={{ height: "100%", width: "20%", flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="location" color="#FA8072" />
      </View>
      <View style={{ height: "100%", width: "80%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 9, color: "#707070" }}>{route.startCity} - {route.endCity} </Text>
      </View>
    </View>
    <View style={{ height: "10%", width: "100%", flexDirection: "row" }}>
      <View style={{ height: "100%", width: "20%", flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5 name="clock" color="#FA8072" />
      </View>
      <View style={{ height: "100%", width: "80%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 9, color: "#707070" }}>{route.departure} - {route.arrival}</Text>
      </View>
    </View>
    <View style={{ height: "10%", width: "100%", flexDirection: "row" }}>
      <View style={{ height: "100%", width: "20%", flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="map-sharp" color="#FA8072" />
      </View>
      {/* Display total seats */}
      <View style={{ height: "100%", width: "80%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 9, color: "#707070" }}>{route.totalSeats} seats </Text>
      </View>
    </View>
  </TouchableOpacity>
);


const separator = () => {
  return <View style={{ width: 18 }} />;
};

export default function Home() {
  const navigation = useNavigation();
  // const [searchQuery, setSearchQuery] = useState("");
  //const [searchQuery, setSearchQuery] = useState({ departure: "", destination: "" });

  const [tripData, setTripData] = useState([]);
  const [dates, setDates] = useState("");
  const [num, setNum] = useState(0);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState({ departure: '', destination: '' });

  const departureOptions = [
    { label: 'New York', value: 'new_york' },
    { label: 'Los Angeles', value: 'los_angeles' },
    { label: 'Chicago', value: 'chicago' },
    // Add more options as needed
  ];

  const destinationOptions = [
    { label: 'San Francisco', value: 'san_francisco' },
    { label: 'Miami', value: 'miami' },
    { label: 'Seattle', value: 'seattle' },
    // Add more options as needed
  ];

  useEffect(() => {
    const getAsync = async () => {
      try {
        const name = await AsyncStorage.getItem('firstName');
        if (name) {
          setUser(name);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getAsync();
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.dev.sharearide.co.bw/app/v1/bus/routes/all/0/6')
      .then(response => {
        const filteredData = response.data.data.map(item => {
          // Convert Buffer to base64 string

          //  console.log(new Buffer.from(item.Bus.image).toString("ascii"));


          return {
            id: item.uuid,
            uuid: item.uuid,
            regNo: item.Bus.regNo,
            company: item.Bus.company,
            image: item.Bus.Image,
            startCity: item.Route.name.split(" - ")[0],
            departure: item.departure,
            endCity: item.Route.name.split(" - ")[1],
            arrival: item.arrival,
            busfare: item.fare,
            distance: item.Route.distance,
            totalSeats: item.Bus.totalSeats,
            allowedDays: item.allowedDays,
            approximate_time1: item.Route.approximateTime
          };
        });

        setTripData(filteredData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (date < currentDate) {
      alert('You cannot select past dates');
      showDatePicker(); // Open the date picker again
      return;
    }

    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const selectedDay = daysOfWeek[dayOfWeek];

    if (tripDetails?.allowedDays?.includes(selectedDay)) {
      setDates(date.toLocaleDateString()); // Format date as needed
      hideDatePicker();
    } else {
      alert(`This bus does not travel on this date, it travels on ${tripDetails?.allowedDays || 'the specified days'}`);
      showDatePicker(); // Open the date picker again
    }
  };

  const handleSearch = () => {
    if (!searchQuery.departure || !searchQuery.destination) {
      alert("Please enter both departure and destination cities.");
      return;
    }

    // Convert searchQuery values to lowercase for case-insensitive search
    const departure = searchQuery.departure.toLowerCase();
    const destination = searchQuery.destination.toLowerCase();

    // Filter tripData based on startCity and endCity
    const filteredTrips = tripData.filter(item =>
      item.startCity.toLowerCase() === departure &&
      item.endCity.toLowerCase() === destination
    );

    if (filteredTrips.length === 0) {
      alert("No buses found for the selected route. Please try again.");
    }

    setTripData(filteredTrips);

    // Console log all start cities and end cities
    tripData.forEach(item => {
      console.log("Start City:", item.startCity);
      console.log("End City:", item.endCity);
    });
  };







  // Modify the FlatList component to render filteredTripData instead of tripData
  <FlatList
    ItemSeparatorComponent={separator}
    data={tripData}
    renderItem={({ item }) => <Item route={item} navigation={navigation} />}
    keyExtractor={(item) => item.uuid}
    horizontal={true}
  />


  const increment = () => {
    setNum((prevNum) => prevNum + 1);
  };

  const decrement = () => {
    if (num > 0) {
      setNum((prevNum) => prevNum - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.logoCon}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <TouchableOpacity style={styles.wlcm}>
          <Text style={{ fontSize: 18, color: "#707070" }}>
            Welcome, {user.length > 6 ? user.substring(0, 5) + ".." : user}
          </Text>
          <FontAwesome name="user-circle" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.mid}>
        <View style={styles.midCard}>
          <View style={styles.midCard1}>
            <Text style={{ fontSize: 21, fontWeight: "600", color: "#707070" }}>
              Choose your destination
            </Text>
          </View>
          <View style={styles.midCard2}>
            <View style={styles.txtfld}>
              <RNPickerSelect
                onValueChange={(value) => setSearchQuery(prevState => ({ ...prevState, departure: value }))}
                items={departureOptions}
                placeholder={{ label: 'Departure', value: null }}
              />
            </View>
            <View style={styles.txtfld}>
              <RNPickerSelect
                onValueChange={(value) => setSearchQuery(prevState => ({ ...prevState, destination: value }))}
                items={destinationOptions}
                placeholder={{ label: 'Destination', value: null }}
              />
            </View>
            {/* <TextInput
              value={searchQuery.departure}
              onChangeText={(text) => setSearchQuery(prevState => ({ ...prevState, departure: text }))}
              fontSize={15}
              style={styles.txtfld}
              placeholder="Departure"
            />
            <TextInput
              value={searchQuery.destination}
              onChangeText={(text) => setSearchQuery(prevState => ({ ...prevState, destination: text }))}
              fontSize={15}
              style={styles.txtfld}
              placeholder="Destination"
            /> */}
          </View>
          <View style={styles.midCard3}>
            <View style={{ height: "100%", width: "50%", justifyContent: "center" }}>
              <TouchableOpacity onPress={showDatePicker} style={styles.calendar}>
                <Text style={{ color: "#fff", paddingRight: "10%" }}>Date</Text>
                <Ionicons name="calendar" color="#fff" size={20} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View
              style={{
                height: "100%",
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "10%",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>{dates}</Text>
              <TouchableOpacity
                onPress={() => decrement()}
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F2EEED",
                }}
              >
                <FontAwesome5 name="minus" color="#707070" size={18} />
              </TouchableOpacity>
              <View
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FA8072",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>{num}</Text>
              </View>
              <TouchableOpacity
                onPress={() => increment()}
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F2EEED",
                }}
              >
                <FontAwesome5 name="plus" color="#707070" size={18} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.midCard4}>
            <TouchableOpacity
              style={{
                height: 36,
                width: "100%",
                borderRadius: 18,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#429588",
              }}
              onPress={handleSearch}
            >
              <Text style={{ color: "#fff" }}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bot}>
        <View style={styles.bot1}>
          <Text style={{ fontSize: 21, fontWeight: "600", color: "#707070" }}>
            {searchQuery ? "Search Results" : "Bus Routes"}
          </Text>
        </View>
        <SafeAreaView style={styles.bot2}>
          {loading ? (
            <Text style={{ fontSize: 18, color: "#707070" }}>Please wait...</Text>
          ) : (
            <>
              <FlatList
                ItemSeparatorComponent={separator}
                data={tripData}
                renderItem={({ item }) => <Item route={item} navigation={navigation} />}
                keyExtractor={(item) => item.uuid}
                horizontal={true}
              />
              {searchQuery && tripData.length === 0 && (
                <Text style={{ fontSize: 18, color: "#FFF", backgroundColor: "#FF0111", padding: 8, borderRadius: 5, marginTop: -350 }}>
                  No buses found. Please try again.
                </Text>

              )}
            </>
          )}
        </SafeAreaView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    height: windowHeight,
    width: windowWidth,
    marginTop: "8%",
  },

  top: {
    height: '10%',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  logoCon: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: 29,
    width: "65%",
  },

  wlcm: {
    height: "100%",
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: 'row',
  },

  mid: {
    height: 290,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  midCard: {
    height: "90%",
    width: "85%",
    padding: "5%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  midCard1: {
    height: "15%",
    width: "100%",
  },

  midCard2: {
    height: "40%",
    width: "100%",
    justifyContent: "space-between",
  },

  txtfld: {
    height: 38,
    width: "100%",
    borderRadius: 11,
    justifyContent: 'center',
    backgroundColor: "#F2EEED",
  },

  midCard3: {
    height: "25%",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  midCard4: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
  },

  bot: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },

  bot1: {
    height: "15%",
    width: "100%",
    justifyContent: "center",
    paddingLeft: "8%",
  },

  bot2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "80%",
    width: "100%",
  },

  flatItem: {
    height: 216,
    width: 140,
    padding: "7%",
    borderRadius: 21,
    alignSelf: 'center',
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  calendar: {
    height: 27,
    width: 94,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FA8072",
  },

  dropDown: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'red',
    borderRadius: 8,
    backgroundColor: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
