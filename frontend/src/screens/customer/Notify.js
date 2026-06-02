import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORANGE = '#FF6A3D';
const GREEN = '#2EAD66';

export default function Notify({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Notification Card */}
        <View style={styles.cardWrapper}>
          
          {/* Red Dot */}
          <View style={styles.redDot} />

          <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>#T14</Text>
              <Text style={styles.time}>5 min ago</Text>
            </View>

            {/* Items */}
            <Text style={styles.items}>1x Margherita, 1x Coke</Text>
            <Text style={styles.restaurant}>Pizza Palace</Text>

            {/* Bottom Row */}
            <View style={[styles.rowBetween, { marginTop: 12 }]}>
              <Text style={styles.price}>$15.50</Text>

              <View style={styles.readyBtn}>
                <Text style={styles.readyText}>Ready</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
  },

  container: {
    padding: 16,
  },

  cardWrapper: {
    position: 'relative',
  },

  redDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'red',
    position: 'absolute',
    top: 6,
    left: -2,
    zIndex: 2,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    color: ORANGE,
    fontSize: 20,
    fontWeight: '700',
  },

  time: {
    color: '#888',
    fontSize: 14,
  },

  items: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },

  restaurant: {
    color: '#777',
    fontSize: 15,
    marginTop: 2,
  },

  price: {
    fontSize: 22,
    fontWeight: '800',
  },

  readyBtn: {
    backgroundColor: '#CDE9DA',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  readyText: {
    color: GREEN,
    fontWeight: '700',
    fontSize: 16,
  },
});
