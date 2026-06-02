import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const TimeSlotsCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [slotDuration, setSlotDuration] = useState(30);

  const durations = [15, 30, 45, 60];

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={styles.card}
      >

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >

          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: '#FFF3EE',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 14,
            }}
          >
            <Ionicons
              name="time-outline"
              size={24}
              color={ORANGE}
            />
          </View>

          <View style={{ flex: 1 }}>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#111',
              }}
            >
              Time Slots
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              10:00 AM - 11:00 PM • {slotDuration} mins
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />

        </View>

      </TouchableOpacity>

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >

        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}
        >

          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26,
              padding: 22,
              maxHeight: '80%',
            }}
          >

            {/* HEADER */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 25,
              }}
            >

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                Configure Time Slots
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={26}
                  color="#222"
                />
              </TouchableOpacity>

            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {/* BOOKING HOURS */}

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginBottom: 14,
                  color: '#111',
                }}
              >
                Booking Hours
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}
              >

                <TouchableOpacity
                  style={{
                    flex: 0.48,
                    borderWidth: 1,
                    borderColor: '#EEE',
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <Text
                    style={{
                      color: '#999',
                      marginBottom: 6,
                      fontSize: 12,
                    }}
                  >
                    Start Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111',
                    }}
                  >
                    10:00 AM
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 0.48,
                    borderWidth: 1,
                    borderColor: '#EEE',
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <Text
                    style={{
                      color: '#999',
                      marginBottom: 6,
                      fontSize: 12,
                    }}
                  >
                    End Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111',
                    }}
                  >
                    11:00 PM
                  </Text>
                </TouchableOpacity>

              </View>

              {/* SLOT DURATION */}

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginBottom: 14,
                  color: '#111',
                }}
              >
                Slot Duration
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginBottom: 30,
                }}
              >

                {durations.map((item) => {

                  const active = slotDuration === item;

                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => setSlotDuration(item)}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 18,
                        borderRadius: 14,
                        backgroundColor: active
                          ? ORANGE
                          : '#F5F5F5',
                        marginRight: 12,
                        marginBottom: 12,
                      }}
                    >

                      <Text
                        style={{
                          color: active
                            ? '#fff'
                            : '#333',
                          fontWeight: '600',
                        }}
                      >
                        {item} mins
                      </Text>

                    </TouchableOpacity>
                  );
                })}

              </View>

              {/* SAVE BUTTON */}

              <TouchableOpacity
                style={{
                  backgroundColor: ORANGE,
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                }}
              >

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Save Changes
                </Text>

              </TouchableOpacity>

            </ScrollView>

          </View>

        </View>

      </Modal>
    </>
  );
};

export default TimeSlotsCard;