import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CategoryCard({ title, image }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.img} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 12,
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
  },
});
