import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const NotificationSettings = ({
  styles,
  GREEN,

  orderAlert,
  setOrderAlert,

  selectedRingtone,
  setSelectedRingtone,

  notificationInterval,
  setNotificationInterval,

  callUpdate,
}) => {
  return (
    <Card>
      <Text style={styles.cardTitle}>
        New Order Notifications
      </Text>

      {/* Order Alerts */}
      <View style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name={
              orderAlert
                ? 'checkbox'
                : 'square-outline'
            }
            size={22}
            color={orderAlert ? GREEN : '#999'}
            onPress={async () => {
              const value = !orderAlert;

              setOrderAlert(value);

              await callUpdate({
                orderAlert: value,
              });
            }}
          />

          <Text
            style={{
              marginLeft: 10,
              fontWeight: '500',
            }}
          >
            Order Alerts (Loud Chime)
          </Text>
        </View>
      </View>

      {/* Alert Sound */}
      <View style={styles.row}>
        <Text style={styles.subLabel}>
          Alert Sound
        </Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            Alert.alert(
              'Select Ringtone',
              'Choose your alert sound',
              [
                {
                  text: 'Default Bell',
                  onPress: async () => {
                    setSelectedRingtone(
                      'Default Bell'
                    );

                    await callUpdate({
                      ringtone: 'Default Bell',
                    });
                  },
                },
                {
                  text: 'Digital Alert',
                  onPress: async () => {
                    setSelectedRingtone(
                      'Digital Alert'
                    );

                    await callUpdate({
                      ringtone: 'Digital Alert',
                    });
                  },
                },
                {
                  text: 'Kitchen Chime',
                  onPress: async () => {
                    setSelectedRingtone(
                      'Kitchen Chime'
                    );

                    await callUpdate({
                      ringtone: 'Kitchen Chime',
                    });
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]
            );
          }}
        >
          <Text
            style={{
              color: '#555',
              marginRight: 5,
            }}
          >
            {selectedRingtone}
          </Text>

          <Ionicons
            name="musical-note-outline"
            size={16}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* Notification Interval */}
      <View style={styles.row}>
        <Text style={styles.subLabel}>
          Repeat Interval
        </Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            Alert.alert(
              'Notification Interval',
              'How often should the alert repeat?',
              [
                {
                  text: '30 seconds',
                  onPress: async () => {
                    setNotificationInterval(
                      '30 seconds'
                    );

                    await callUpdate({
                      notificationInterval:
                        '30 seconds',
                    });
                  },
                },
                {
                  text: '60 seconds',
                  onPress: async () => {
                    setNotificationInterval(
                      '60 seconds'
                    );

                    await callUpdate({
                      notificationInterval:
                        '60 seconds',
                    });
                  },
                },
                {
                  text: '2 minutes',
                  onPress: async () => {
                    setNotificationInterval(
                      '2 minutes'
                    );

                    await callUpdate({
                      notificationInterval:
                        '2 minutes',
                    });
                  },
                },
              ]
            );
          }}
        >
          <Text style={{ color: '#777' }}>
            {notificationInterval}
          </Text>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#777"
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default NotificationSettings;