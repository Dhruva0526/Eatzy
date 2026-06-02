import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { SafeAreaView } from
'react-native-safe-area-context';

import { Ionicons } from
'@expo/vector-icons';

import styles from
'../../styles/restaurant/settingsStyles';

import Card from
'../../components/restaurant/settings/Card';

import BookingModeCard from
'../../components/restaurant/tableBooking/BookingModeCard';

import TimeSlotsCard from
'../../components/restaurant/tableBooking/TimeSlotsCard';

import MaxTablesCard from
'../../components/restaurant/tableBooking/MaxTablesCard';

import AdvancePaymentCard from
'../../components/restaurant/tableBooking/AdvancePaymentCard';

import WaitlistCard from
'../../components/restaurant/tableBooking/WaitlistCard';

import AutoAssignTablesCard from
'../../components/restaurant/tableBooking/AutoAssignTablesCard';

import BlackoutDatesCard from
'../../components/restaurant/tableBooking/BlackoutDatesCard';

import BookingAnalyticsCard from
'../../components/restaurant/tableBooking/BookingAnalyticsCard';

const ORANGE = '#FF6A3D';

export default function TableBookingSettings({
  navigation,
}) {

  const [acceptBookings,
  setAcceptBookings] =
    useState(true);

  const [waitlistEnabled,
  setWaitlistEnabled] =
    useState(true);

  const [bookingNotifications,
  setBookingNotifications] =
    useState(true);

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}
    >

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#333"
          />

        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            marginLeft: 14,
          }}
        >

          <Text style={styles.headerTitle}>
            Table Booking
          </Text>

          <Text style={styles.headerSub}>
            Reservations & dining setup
          </Text>

        </View>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >

        {/* TOP STATUS CARD */}

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 22,
            padding: 18,
            marginBottom: 18,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3,
          }}
        >

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 18,
            }}
          >

            <View
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                backgroundColor: '#FFF3EE',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >

              <Ionicons
                name="restaurant-outline"
                size={28}
                color={ORANGE}
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                Reservation System
              </Text>

              <Text
                style={{
                  marginTop: 4,
                  color: '#777',
                  fontSize: 13,
                }}
              >
                Manage bookings, tables &
                dining experience
              </Text>

            </View>

          </View>

          {/* ACCEPT BOOKINGS */}

          <View style={styles.row}>

            <View>

              <Text style={styles.label}>
                Accept Bookings
              </Text>

              <Text style={styles.subLabel}>
                Enable customer reservations
              </Text>

            </View>

            <Switch
              value={acceptBookings}
              onValueChange={
                setAcceptBookings
              }
              trackColor={{
                false: '#ddd',
                true: '#FFD4C8',
              }}
              thumbColor={
                acceptBookings
                  ? ORANGE
                  : '#fff'
              }
            />

          </View>

          {/* WAITLIST */}

          <View style={styles.row}>

            <View>

              <Text style={styles.label}>
                Waitlist
              </Text>

              <Text style={styles.subLabel}>
                Auto customer queue
              </Text>

            </View>

            <Switch
              value={waitlistEnabled}
              onValueChange={
                setWaitlistEnabled
              }
              trackColor={{
                false: '#ddd',
                true: '#FFD4C8',
              }}
              thumbColor={
                waitlistEnabled
                  ? ORANGE
                  : '#fff'
              }
            />

          </View>

          {/* NOTIFICATIONS */}

          <View
            style={[
              styles.row,
              {
                marginBottom: 0,
              },
            ]}
          >

            <View>

              <Text style={styles.label}>
                Notifications
              </Text>

              <Text style={styles.subLabel}>
                Booking alerts & reminders
              </Text>

            </View>

            <Switch
              value={
                bookingNotifications
              }
              onValueChange={
                setBookingNotifications
              }
              trackColor={{
                false: '#ddd',
                true: '#FFD4C8',
              }}
              thumbColor={
                bookingNotifications
                  ? ORANGE
                  : '#fff'
              }
            />

          </View>

        </View>

        {/* SECTION TITLE */}

        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#111',
            marginBottom: 14,
            marginTop: 6,
          }}
        >
          Reservation Settings
        </Text>

        {/* COMPONENTS */}

        <BookingModeCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <TimeSlotsCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <MaxTablesCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <AdvancePaymentCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <WaitlistCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <AutoAssignTablesCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <BlackoutDatesCard
          styles={styles}
          ORANGE={ORANGE}
        />

        <BookingAnalyticsCard
          styles={styles}
          ORANGE={ORANGE}
        />

      </ScrollView>

    </SafeAreaView>
  );
}