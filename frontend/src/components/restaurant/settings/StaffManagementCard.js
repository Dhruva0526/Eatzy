import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from './Card';

const StaffManagementCard = ({
  styles,
  loadingStaff,
  staffMembers,
  removeStaff,
  setShowStaffModal,
}) => {
  return (
    <Card>
      {/* HEADER */}
      <View style={styles.row}>
        <Text style={styles.cardTitle}>
          Staff Management
        </Text>

        <Ionicons
          name="people-outline"
          size={22}
          color="#333"
        />
      </View>

      {/* SUBTITLE */}
      <Text
        style={[
          styles.subLabel,
          { marginBottom: 15 },
        ]}
      >
        Add or remove staff members
        and assign roles.
      </Text>

      {/* STAFF LIST */}
      {loadingStaff ? (
        <ActivityIndicator
          size="small"
          color="#0000ff"
        />
      ) : (
        staffMembers.map((staff) => (
          <View
            key={staff.id}
            style={styles.staffItem}
          >
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  color: '#333',
                }}
              >
                {staff.name}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: '#777',
                }}
              >
                {staff.role} • {staff.phone}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                removeStaff(staff.id)
              }
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color="#FF5252"
              />
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* ADD STAFF BUTTON */}
      <TouchableOpacity
        style={[
          styles.editScheduleBtn,
          {
            marginTop: 10,
            alignSelf: 'center',
            width: '100%',
          },
        ]}
        onPress={() =>
          setShowStaffModal(true)
        }
      >
        <Ionicons
          name="add-circle-outline"
          size={18}
          color="#555"
        />

        <Text style={styles.editScheduleText}>
          Add New Staff
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

export default StaffManagementCard;