import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const OperationalControl = ({
  styles,
  GREEN,
  acceptingOrders,
  setAcceptingOrders,
  callUpdate,

  busyMode,
  setBusyMode,

  prepTime,
  setPrepTime,
  setShowPrepModal,

  openTime,
  closeTime,

  setShowScheduleModal,
}) => {
  return (
    <Card>
      <Text style={styles.cardTitle}>Operational Control</Text>

      {/* Accepting Orders */}
      <TouchableOpacity
        style={[
          styles.acceptBtn,
          { backgroundColor: acceptingOrders ? GREEN : '#ccc' },
        ]}
        onPress={async () => {
          const value = !acceptingOrders;
          setAcceptingOrders(value);

          await callUpdate({ acceptingOrders: value });
        }}
      >
        <View style={styles.acceptInner}>
          <View style={styles.whiteDot} />
          <Text style={styles.acceptText}>
            {acceptingOrders
              ? 'Accepting Orders'
              : 'Not Accepting Orders'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Busy Mode */}
      <View style={styles.busyContainer}>

        <View style={styles.busyTopRow}>
          <Text style={styles.busyTitle}>Busy Mode</Text>

          <Switch
            value={busyMode}
            onValueChange={async (value) => {
              setBusyMode(value);

              await callUpdate({ busyMode: value });
            }}
          />
        </View>

        <View style={styles.busyBottomRow}>
          <Text style={styles.prepText}>
            Normal prep time • {prepTime} mins
          </Text>

          <TouchableOpacity
            onPress={() => setShowPrepModal(true)}
          >
            <View style={styles.adjustRow}>
              <Text style={styles.adjustText}>
                Adjust Prep Time
              </Text>

              <Ionicons
                name="pencil"
                size={14}
                color="#777"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Operating Hours */}
      <View style={styles.operatingRow}>
        <Text style={styles.sectionLabel}>
          Operating Hours
        </Text>

        <Text style={styles.timeText}>
          {openTime} - {closeTime}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editScheduleBtn}
        onPress={() => setShowScheduleModal(true)}
      >
        <Text style={styles.editScheduleText}>
          Edit Schedule
        </Text>

        <Ionicons
          name="pencil"
          size={14}
          color="#555"
        />
      </TouchableOpacity>
    </Card>
  );
};

export default OperationalControl;