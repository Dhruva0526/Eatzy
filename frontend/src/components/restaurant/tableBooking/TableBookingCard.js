import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from '../../../styles/restaurant/settingsStyles';

const TableBookingCard = ({
  ORANGE,
  navigation,
}) => {
  return (
    <View style={styles.card}>

      {/* TOP */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >

        <View style={{ flex: 1 }}>

          <Text style={styles.cardTitle}>
            Table Booking
          </Text>

          <Text
            style={[
              styles.subLabel,
              {
                marginTop: 4,
                lineHeight: 20,
              },
            ]}
          >
            Manage bookings, tables,
            waitlist and reservations.
          </Text>

        </View>

        <View
          style={{
            backgroundColor: '#FFF1EC',
            padding: 12,
            borderRadius: 14,
            marginLeft: 14,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color={ORANGE}
          />
        </View>

      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.logoutBtn,
          {
            marginHorizontal: 0,
            marginTop: 8,
            height: 50,
            backgroundColor: ORANGE,
          },
        ]}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate(
            'TableBookingSettings'
          )
        }
      >

        <Text
          style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 16,
          }}
        >
          Open Table Booking
        </Text>

      </TouchableOpacity>

    </View>
  );
}

export default TableBookingCard;