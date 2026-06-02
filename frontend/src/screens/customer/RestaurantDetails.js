import React, {
  useState,
  useContext,
  useEffect
} from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";

import { getMenu } from "../../services/menuService";

import { CartContext } from "../../context/CartContext";

import FloatingCartBar from "../../components/customer/FloatingCartBar";

import { getToken } from "../../utils/auth";

import { decodeToken } from "../../utils/jwt";

import {
  createBooking
} from "../../services/bookingService";

export default function RestaurantDetails({ navigation, route }) {
  const restaurant = route.params?.restaurant;

  const [people, setPeople] = useState(4);
  const [selectedTab, setSelectedTab] = useState("Book");

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

  const [selectedTime, setSelectedTime] = useState("07:00 PM");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [menu, setMenu] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);


  const timeSlots = [
    "06:00 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
  ];
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {

      const res = await getMenu(
        restaurant.id
      );
      setMenu(res);

    } catch (error) {
      console.log("MENU ERROR:", error);
    }
  };
  
  const getItemQty = (id) => {

    const found = cartItems.find(
      i => i.id === id
    );

    return found ? found.qty : 0;
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );


  const handleBooking = async () => {

    try {

      setBookingLoading(true);

      const token = await getToken();

      const payload = decodeToken(token);

      if (!payload?.sub) {

        Alert.alert(
          "Error",
          "User not found"
        );

        return;
      }

      const bookingData = {
        user_id: payload.sub,
        restaurant_id: restaurant.id,
        booking_date:
          selectedDate.toISOString().split("T")[0],
        booking_time: selectedTime,
        people_count: people
      };

      const res = await createBooking(
        bookingData
      );

      Alert.alert(
        "Success",
        "Table booked successfully"
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        error?.response?.data?.detail ||
        "Booking failed"
      );

    } finally {

      setBookingLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
        
        {/* -------- Banner Section -------- */}
        <View>
          <Image
            source={require("../../../assets/restaurant_banner.jpg")}
            style={styles.bannerImage}
          />

          {/* Dark overlay for text visibility */}
          <View style={styles.overlay} />

          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 28, fontWeight: 800, color: "#fff"}}>←</Text>
          </TouchableOpacity>

          {/* Restaurant Info on Banner */}
          <View style={styles.bannerContent}>
            <Text style={styles.restaurantName}>{restaurant?.name}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>⭐ {restaurant?.rating || "4.0"}</Text>
              <Text style={styles.infoText}>📍 {restaurant?.city}</Text>
            </View>
          </View>
        </View>

        {/* -------- Tabs (Menu / Book Table) -------- */}
        <View style={styles.tabWrapper}>
          
          {/* MENU TAB */}
          <TouchableOpacity
            style={[
              styles.tabBtn,
              selectedTab === "Menu" ? styles.activeTab : styles.unSelectedTab
            ]}
            onPress={() => setSelectedTab("Menu")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Menu" ? styles.activeTabText : styles.unSelectedTabText
              ]}
            >
              Menu
            </Text>
          </TouchableOpacity>

          {/* BOOK TABLE TAB */}
          <TouchableOpacity
            style={[
              styles.tabBtn,
              selectedTab === "Book" ? styles.activeTab : styles.unSelectedTab
            ]}
            onPress={() => setSelectedTab("Book")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Book" ? styles.activeTabText : styles.unSelectedTabText
              ]}
            >
              Book Table
            </Text>
          </TouchableOpacity>

        </View>

        {/* -------- Menu Section -------- */}
        {selectedTab === "Menu" && (
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>

            <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 10 }}>
              Popular Dishes
            </Text>

            {menu.map((item) => (

              <View key={item.id} style={styles.menuCard}>

                <View style={{ flex: 1 }}>

                  <Text style={styles.foodName}>
                    {item.name}
                  </Text>

                  <Text style={styles.foodDesc}>
                    {item.description}
                  </Text>

                  <Text style={styles.foodPrice}>
                    ₹{item.price}
                  </Text>

                </View>

                {
                  getItemQty(item.id) === 0 ? (

                    <TouchableOpacity
                      style={[
                        styles.addBtn,
                        !item.is_available && {
                          backgroundColor: "gray"
                        }
                      ]}
                      disabled={!item.is_available}
                      onPress={async () => {

                        const result = await addToCart({
                          ...item,
                          restaurant_id: restaurant.id
                        });

                        if (result?.error) {

                          alert(
                            "Your cart already contains items from another restaurant"
                          );
                        }
                      }}
                    >
                      <Text style={styles.addText}>
                        {item.is_available ? "Add" : "Unavailable"}
                      </Text>
                    </TouchableOpacity>

                  ) : (

                    <View style={styles.qtyContainer}>

                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => decreaseQty(item.id)}
                      >
                        <Text style={styles.qtyBtnText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>
                        {getItemQty(item.id)}
                      </Text>

                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => increaseQty(item.id)}
                      >
                        <Text style={styles.qtyBtnText}>＋</Text>
                      </TouchableOpacity>

                    </View>
                  )
                }

              </View>

            ))}
          </View>
        )}

        
        {/* -------- Booking Section -------- */}
        {selectedTab === "Book" && (
        <View style={{ paddingHorizontal: 20 }}>

          {/* Number of People */}
          <Text style={styles.sectionTitle}>Number of People</Text>

          <View style={styles.peopleBox}>
            <TouchableOpacity onPress={() => setPeople(Math.max(1, people - 1))}>
              <Text style={styles.minus}>−</Text>
            </TouchableOpacity>

            <Text style={styles.peopleText}>{people} People</Text>

            <TouchableOpacity onPress={() => setPeople(people + 1)}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          </View>

          {/* Date */}
          <Text style={styles.sectionTitle}>Select Date</Text>

          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {selectedDate.toDateString()}
            </Text>

            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              minimumDate={new Date()}  // ⛔ Block past dates
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}


          {/* Time Slots */}
          <Text style={styles.sectionTitle}>Available Slots</Text>

          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.activeTime,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.activeTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reserve Button */}
          <TouchableOpacity
            style={styles.reserveBtn}
            onPress={handleBooking}
            disabled={bookingLoading}
          >
            <Text style={styles.reserveText}>
              {
                bookingLoading
                ? "Booking..."
                : "Reserve Table"
              }
            </Text>
          </TouchableOpacity>

        </View>
        )}


      </ScrollView>
      <FloatingCartBar />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    width: "100%",
    height: 260,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: 260,
    backgroundColor: "rgba(0,0,0,0.40)",
  },

  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.58)",
    paddingBottom: 9,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 30,


  },

  bannerContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  restaurantName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 6,
  },

  infoText: {
    fontSize: 18,
    color: "#fff",
    marginRight: 15,
  },

  /* Tabs */
  tabWrapper: {
    flexDirection: "row",
    marginTop: 25,
    backgroundColor: "#f3f3f3",
    borderRadius: 40,
    marginHorizontal: 20,
    padding: 5,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: "center",
  },

  tabText: { fontSize: 18, fontWeight: "600", color: "#555" },

  activeTab: { backgroundColor: "#FF7643" },
  activeTabText: { color: "#fff" },

  unSelectedTab: { backgroundColor: "transparent" },
  unSelectedTabText: { color: "#000" },

  /* Menu Section */
  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "600",
  },

  foodDesc: {
    fontSize: 15,
    color: "gray",
  },

  foodPrice: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },

  addBtn: {
    backgroundColor: "#FF7643",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Booking Section */
  sectionTitle: {
    fontSize: 20,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "600",
  },

  peopleBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    justifyContent: "space-between",
  },

  minus: { fontSize: 28, color: "#FF7643" },
  plus: { fontSize: 28, color: "#FF7643" },
  peopleText: { fontSize: 22, fontWeight: "700" },

  dateBox: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: { fontSize: 18 },
  calendarIcon: { fontSize: 22 },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"space-between",
    marginTop: 5,
  },

  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    marginBottom: 10,
  },

  timeText: { fontSize: 16, color: "#444" },

  activeTime: { backgroundColor: "#FF7643" },
  activeTimeText: { color: "#fff" },

  reserveBtn: {
    backgroundColor: "#FF7643",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  reserveText: { color: "#fff", fontSize: 20, fontWeight: "700" },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF7643",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  qtyText: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: "700",
  },

});

