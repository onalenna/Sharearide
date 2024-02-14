import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationContainer } from '@react-navigation/native';  // Add this import

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Item = ({ route, navigation }) => (
//<TouchableOpacity  onPress={() => navigation.navigate("Details", { tripDetails: route })}  style={styles.flatItem}   >

<TouchableOpacity  onPress={() => navigation.navigate('Details', { tripDetails: route })} style={styles.flatItem}>

    <Image
      style={{ height: 120, width: 118, borderRadius: 19, alignSelf: "center" }}
      source={{ uri: route.image }}
    />
    <Text style={{ color: "#707070" }}>{route.company}</Text>
    <View style={{ height: "10%", width: "100%", flexDirection: "row" }}>
      <View style={{ height: "100%", width: "20%", flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="location" color="#FA8072" />
      </View>
      <View style={{ height: "100%", width: "80%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 9, color: "#707070" }}>{route.description} </Text>
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
      <View style={{ height: "100%", width: "80%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 9, color: "#707070" }}>{route.total_seats} seats available</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const separator = () => {
  return <View style={{ width: 20 }} />;
};

export default function Home() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [routes, setRoutes] = useState([]);
  const [cal, setCal] = useState(false);
  const [num, setNum] = useState(0);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, [searchQuery]);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://propiq.tech/SR/search.php?query=${searchQuery}`);
      const data = await response.json();

      console.log("API Response Status:", response.status);
      console.log("API Response Data:", data);

      if (data && data.data) {
        setRoutes(data.data);
      } else {
        setRoutes([]);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchRoutes();
  };

  const increment = () => {
    setNum((prevNum) => prevNum + 1);
  };

  const decrement = () => {
    if (num > 0) {
      setNum((prevNum) => prevNum - 1);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        <View style={styles.logoCon}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <View style={styles.wlcm}>
          <Text style={{ fontSize: 18, color: "#707070" }}>
            {user ? user : ""}
          </Text>
        </View>
      </View>

      <View style={styles.mid}>
        <View style={styles.midCard}>
          <View style={styles.midCard1}>
            <Text style={{ fontSize: 21, fontWeight: "600", color: "#707070" }}>
              Choose your destination
            </Text>
          </View>
          <View style={styles.midCard2}>
            <TextInput
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              fontSize={20}
              style={styles.txtfld}
            />
            <TextInput fontSize={20} style={styles.txtfld} />
          </View>
          <View style={styles.midCard3}>
            <View style={{ height: "100%", width: "50%", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => setCal(true)}
                style={{
                  height: 27,
                  width: 94,
                  borderRadius: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FA8072",
                }}
              >
                <Text style={{ color: "#fff", paddingRight: "10%" }}>Date</Text>
                <Ionicons name="calendar" color="#fff" size={20} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={cal}
                mode="date"
                onConfirm={() => {}}
                onCancel={() => setCal(false)}
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
          <Text style={{ fontSize: 21, fontWeight: "300", color: "#707070" }}>
            {searchQuery ? "Search Results" : "Bus Routes"}
          </Text>
        </View>
        <SafeAreaView style={styles.bot2}>
          {loading ? (
            <Text style={{ fontSize: 18, color: "#707070" }}>Please wait...</Text>
          ) : (
            <FlatList
              ItemSeparatorComponent={separator}
              data={routes}
              renderItem={({ item }) => <Item route={item} navigation={navigation} />}
              keyExtractor={(item) => item.uuid}
              horizontal={true}
            />
          )}
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
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
    height: 70,
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
    justifyContent: "center",
    alignItems: "center",
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
    paddingLeft: "4%",
    height: 38,
    width: "100%",
    borderRadius: 11,
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
    alignItems: "center",
    paddingTop: "6%",
    paddingLeft: "2%",
    paddingRight: "2%",
  },

  flatItem: {
    height: 216,
    width: 140,
    padding: "7%",
    borderRadius: 21,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});
