import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const BookingAnalyticsCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] =
    useState(false);

  const analytics = [
    {
      title: "Today's Bookings",
      value: '48',
      icon: 'calendar-outline',
    },
    {
      title: 'Weekly Reservations',
      value: '312',
      icon: 'stats-chart-outline',
    },
    {
      title: 'Peak Hours',
      value: '7 PM - 9 PM',
      icon: 'time-outline',
    },
    {
      title: 'Cancellation Rate',
      value: '8%',
      icon: 'close-circle-outline',
    },
  ];

  const occupancy = 82;

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
              name="bar-chart-outline"
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
              Booking Analytics
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              Occupancy & reservation insights
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
              maxHeight: '90%',
            }}
          >

            {/* HEADER */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 26,
              }}
            >

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                Booking Analytics
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

              {/* OCCUPANCY CARD */}

              <View
                style={{
                  backgroundColor: ORANGE,
                  borderRadius: 24,
                  padding: 22,
                  marginBottom: 24,
                }}
              >

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    marginBottom: 10,
                  }}
                >
                  Current Occupancy
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 36,
                    fontWeight: '800',
                  }}
                >
                  {occupancy}%
                </Text>

                {/* PROGRESS BAR */}

                <View
                  style={{
                    height: 10,
                    backgroundColor:
                      'rgba(255,255,255,0.3)',
                    borderRadius: 10,
                    marginTop: 16,
                    overflow: 'hidden',
                  }}
                >

                  <View
                    style={{
                      width: `${occupancy}%`,
                      height: '100%',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                    }}
                  />

                </View>

              </View>

              {/* ANALYTICS GRID */}

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >

                {analytics.map((item, index) => (

                  <View
                    key={index}
                    style={{
                      width: '48%',
                      backgroundColor: '#F8F8F8',
                      borderRadius: 20,
                      padding: 18,
                      marginBottom: 16,
                    }}
                  >

                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        backgroundColor: '#FFF3EE',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 14,
                      }}
                    >

                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={ORANGE}
                      />

                    </View>

                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '800',
                        color: '#111',
                      }}
                    >
                      {item.value}
                    </Text>

                    <Text
                      style={{
                        marginTop: 6,
                        color: '#777',
                        fontSize: 13,
                        lineHeight: 18,
                      }}
                    >
                      {item.title}
                    </Text>

                  </View>
                ))}

              </View>

              {/* INSIGHT BOX */}

              <View
                style={{
                  backgroundColor: '#FFF6F1',
                  borderRadius: 20,
                  padding: 18,
                  marginTop: 6,
                  borderWidth: 1,
                  borderColor: '#FFE1D6',
                }}
              >

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >

                  <Ionicons
                    name="sparkles-outline"
                    size={20}
                    color={ORANGE}
                  />

                  <Text
                    style={{
                      marginLeft: 8,
                      color: ORANGE,
                      fontWeight: '700',
                      fontSize: 14,
                    }}
                  >
                    Smart Insights
                  </Text>

                </View>

                <Text
                  style={{
                    color: '#666',
                    lineHeight: 20,
                    fontSize: 13,
                  }}
                >
                  Peak reservation traffic occurs
                  between 7 PM and 9 PM. Consider
                  increasing table turnover or
                  enabling advance deposits during
                  these hours.
                </Text>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>
    </>
  );
};

export default BookingAnalyticsCard;