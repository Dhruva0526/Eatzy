import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GREEN = '#2ECC71';
const RED = '#FF4D4D';

export default function OrderCard({
  id,
  items,
  price,
  time,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>{id}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <Text style={styles.items}>{items}</Text>
      {price && <Text style={styles.price}>{price}</Text>}

      <View style={styles.actionRow}>
        {secondaryText && (
          <TouchableOpacity style={styles.secondaryBtn} onPress={onSecondary}>
            <Text style={styles.secondaryText}>{secondaryText}</Text>
          </TouchableOpacity>
        )}

        {primaryText && (
          <TouchableOpacity style={styles.primaryBtn} onPress={onPrimary}>
            <Text style={styles.primaryText}>{primaryText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6A3D',
  },
  time: { color: '#777' },
  items: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  primaryBtn: {
    backgroundColor: '#DFF6EA',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
  },
  primaryText: {
    color: GREEN,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#FFD6D6',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  secondaryText: {
    color: RED,
    fontWeight: '700',
  },
});
