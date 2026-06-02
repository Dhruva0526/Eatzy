import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RestaurantDetails", { restaurant })}
    >
      <Image source={{ uri: restaurant.image }} style={styles.image} />

      <View style={styles.infoBox}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subTitle}>{restaurant.cuisine}</Text>

        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          <Text style={styles.time}>⏱ {restaurant.time}</Text>
        </View>

        <Text style={styles.status}>Table Available</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 170,
  },
  infoBox: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subTitle: {
    marginTop: 5,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  rating: {
    marginRight: 20,
    fontSize: 16,
  },
  time: {
    fontSize: 16,
  },
  status: {
    color: "green",
    marginTop: 8,
    fontSize: 16,
  },
});



// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// export default function RestaurantCard({ title, rating, time, image }) {
//   return (
//     <View style={styles.card}>
//       <Image source={image} style={styles.img} />

//       <View style={styles.info}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.detail}>⭐ {rating} • ⏱ {time}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginBottom: 15,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     elevation: 3,
//     shadowColor: "#000",
//     padding: 10,
//   },
//   img: {
//     width: "100%",
//     height: 160,
//     borderRadius: 10,
//   },
//   info: {
//     marginTop: 8,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   detail: {
//     color: "gray",
//     marginTop: 3,
//   },
// });
