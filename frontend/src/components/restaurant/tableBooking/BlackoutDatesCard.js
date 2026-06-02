import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const BlackoutDatesCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] =
    useState(false);

  const [blackoutDates, setBlackoutDates] =
    useState([
      {
        id: 1,
        date: '25 Dec 2025',
        reason: 'Christmas Event',
      },
      {
        id: 2,
        date: '31 Dec 2025',
        reason: 'New Year Private Party',
      },
    ]);

  const addDummyDate = () => {

    const newItem = {
      id: Date.now(),
      date: '15 Aug 2025',
      reason: 'Restaurant Maintenance',
    };

    setBlackoutDates([
      ...blackoutDates,
      newItem,
    ]);
  };

  const removeDate = (id) => {

    setBlackoutDates(
      blackoutDates.filter(
        (item) => item.id !== id
      )
    );
  };

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
              name="calendar-outline"
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
              Blackout Dates
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              {blackoutDates.length} blocked dates
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
              maxHeight: '88%',
            }}
          >

            {/* HEADER */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                Blackout Dates
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
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

              {/* ADD BUTTON */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={addDummyDate}
                style={{
                  backgroundColor: ORANGE,
                  borderRadius: 18,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >

                <Ionicons
                  name="add"
                  size={20}
                  color="#fff"
                />

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '700',
                    marginLeft: 8,
                  }}
                >
                  Add Blackout Date
                </Text>

              </TouchableOpacity>

              {/* INFO BOX */}

              <View
                style={{
                  backgroundColor: '#FFF6F1',
                  borderRadius: 18,
                  padding: 16,
                  marginBottom: 24,
                  borderWidth: 1,
                  borderColor: '#FFE1D6',
                }}
              >

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >

                  <Ionicons
                    name="information-circle"
                    size={20}
                    color={ORANGE}
                  />

                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 14,
                      fontWeight: '700',
                      color: ORANGE,
                    }}
                  >
                    Booking Restrictions
                  </Text>

                </View>

                <Text
                  style={{
                    color: '#666',
                    fontSize: 13,
                    lineHeight: 20,
                  }}
                >
                  Customers won't be able to make
                  reservations on blackout dates.
                  Useful for private events,
                  maintenance, or holidays.
                </Text>

              </View>

              {/* DATE LIST */}

              {blackoutDates.map((item) => (

                <View
                  key={item.id}
                  style={{
                    backgroundColor: '#F8F8F8',
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >

                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: '#FFF3EE',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 14,
                    }}
                  >

                    <Ionicons
                      name="calendar"
                      size={20}
                      color={ORANGE}
                    />

                  </View>

                  <View style={{ flex: 1 }}>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#111',
                      }}
                    >
                      {item.date}
                    </Text>

                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: '#777',
                      }}
                    >
                      {item.reason}
                    </Text>

                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      removeDate(item.id)
                    }
                  >

                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color="#FF4D4F"
                    />

                  </TouchableOpacity>

                </View>
              ))}

              {/* SAVE BUTTON */}

              <TouchableOpacity
                style={{
                  backgroundColor: ORANGE,
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                  marginTop: 10,
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

export default BlackoutDatesCard;