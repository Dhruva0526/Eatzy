import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from '../../../styles/restaurant/settingsStyles';

const BookingModeCard = ({
  ORANGE,
}) => {

  const [selectedMode, setSelectedMode] =
    useState('Instant Confirm');

  const [showModeModal,
  setShowModeModal] =
    useState(false);

  const modes = [
    'Instant Confirm',
    'Manual Approval',
    'Call Confirmation',
  ];

  return (

    <View style={styles.card}>

      {/* HEADER */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >

        <View>

          <Text style={styles.cardTitle}>
            Booking Mode
          </Text>

          <Text style={styles.subLabel}>
            Control reservation approval
          </Text>

        </View>

        <View
          style={{
            backgroundColor: '#FFF1EC',
            padding: 10,
            borderRadius: 12,
          }}
        >

          <Ionicons
            name="settings-outline"
            size={22}
            color={ORANGE}
          />

        </View>

      </View>

      {/* CURRENT MODE */}
      <TouchableOpacity
        onPress={() =>
          setShowModeModal(true)
        }
        activeOpacity={0.85}
        style={{
          borderWidth: 1,
          borderColor: '#EEE',
          borderRadius: 14,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}
      >

        <View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#222',
            }}
          >
            {selectedMode}
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: '#777',
              fontSize: 13,
            }}
          >
            Tap to change booking mode
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        visible={showModeModal}
        transparent
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View
            style={[
              styles.modalCard,
              {
                width: '90%',
              },
            ]}
          >

            {/* TITLE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >

              <Text style={styles.modalTitle}>
                Select Booking Mode
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setShowModeModal(false)
                }
              >

                <Ionicons
                  name="close"
                  size={24}
                  color="#555"
                />

              </TouchableOpacity>

            </View>

            {/* OPTIONS */}
            {modes.map((mode) => (

              <TouchableOpacity
                key={mode}
                activeOpacity={0.85}
                onPress={() => {

                  setSelectedMode(mode);

                  setShowModeModal(false);

                }}
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 14,
                  borderRadius: 14,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor:
                    selectedMode === mode
                      ? ORANGE
                      : '#EAEAEA',

                  backgroundColor:
                    selectedMode === mode
                      ? '#FFF3EE'
                      : '#fff',

                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >

                <View>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color:
                        selectedMode === mode
                          ? ORANGE
                          : '#222',
                    }}
                  >
                    {mode}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: '#777',
                      fontSize: 12,
                    }}
                  >

                    {mode === 'Instant Confirm'
                      ? 'Bookings auto approved'

                      : mode === 'Manual Approval'
                      ? 'Restaurant approves manually'

                      : 'Customer receives call before confirmation'}

                  </Text>

                </View>

                {selectedMode === mode && (

                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={ORANGE}
                  />

                )}

              </TouchableOpacity>

            ))}

          </View>

        </View>

      </Modal>

    </View>
  );
};

export default BookingModeCard;