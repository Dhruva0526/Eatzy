import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getRestaurantReservations,
  updateReservationStatus
} from "../../services/reservationService";

const ORANGE = '#FF6A3D';
const GREEN = '#2ECC71';
const RED = '#FF4D4D';

export default function Reservations() {

  const [reservations, setReservations] =
    useState([]);

  useEffect(() => {

    loadReservations();

    const interval = setInterval(() => {

      loadReservations();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const loadReservations = async () => {

    try {

      const restaurantId =
        await AsyncStorage.getItem(
          'restaurant_id'
        );

      const res =
        await getRestaurantReservations(
          restaurantId
        );

      const acceptedReservations =
        res.filter(
          (item) =>
            item.status === "confirmed" ||
            item.status === "completed" ||
            item.status === "cancelled"
        );

      setReservations(
        acceptedReservations
      );

    } catch (error) {

      console.log(
        'RESERVATION ERROR:',
        error
      );
    }
  };

  const updateStatus = async (
    bookingId,
    status
  ) => {

    try {

      await updateReservationStatus(
        bookingId,
        status
      );

      loadReservations();

    } catch (error) {

      console.log(error);
    }
  };

  const getStatusColor = (status) => {

    switch (status) {

      case 'accepted':
        return GREEN;

      case 'completed':
        return '#3B82F6';

      case 'cancelled':
        return RED;

      default:
        return '#777';
    }
  };

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <View style={styles.rowBetween}>

        <View>

          <Text style={styles.resId}>
            Booking #{item.id}
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  getStatusColor(
                    item.status
                  )
              }
            ]}
          >
            <Text style={styles.statusText}>
              {item.status.toUpperCase()}
            </Text>
          </View>

        </View>

        <Text style={styles.date}>
          {item.booking_date}
        </Text>

      </View>

      <Text style={styles.name}>
        {item.customer_name}
      </Text>

      <Text style={styles.details}>
        👥 {item.people_count} Guests
      </Text>

      <Text style={styles.details}>
        🕒 {item.booking_time}
      </Text>

      {
        item.status === 'accepted' && (

          <View style={styles.actionRow}>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                updateStatus(
                  item.id,
                  'cancelled'
                )
              }
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.completeBtn}
              onPress={() =>
                updateStatus(
                  item.id,
                  'completed'
                )
              }
            >
              <Text style={styles.completeText}>
                Complete
              </Text>
            </TouchableOpacity>

          </View>
        )
      }

    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Reservations
        </Text>

        <Text style={styles.total}>
          Total: {reservations.length}
        </Text>

      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Reservations
          </Text>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    backgroundColor: '#fff',
    padding: 20,
    elevation: 4,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
  },

  total: {
    color: '#777',
    marginTop: 4,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  resId: {
    fontSize: 18,
    fontWeight: '700',
    color: ORANGE,
  },

  date: {
    color: '#777',
    fontWeight: '600',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },

  details: {
    fontSize: 16,
    color: '#555',
    marginTop: 6,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },

  completeBtn: {
    backgroundColor: '#DFF6EA',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
  },

  completeText: {
    color: GREEN,
    fontWeight: '700',
    fontSize: 16,
  },

  cancelBtn: {
    backgroundColor: '#FFD6D6',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginRight: 12,
  },

  cancelText: {
    color: RED,
    fontWeight: '700',
    fontSize: 16,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
    fontSize: 16,
  },

  statusBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

});