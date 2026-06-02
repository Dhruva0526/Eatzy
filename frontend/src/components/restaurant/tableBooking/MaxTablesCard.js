import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const MaxTablesCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [totalTables, setTotalTables] = useState(10);

  const [maxGuests, setMaxGuests] = useState(4);

  const [parallelBookings, setParallelBookings] = useState(5);

  const Counter = ({
    label,
    value,
    setValue,
    min = 1,
  }) => {

    return (
      <View
        style={{
          marginBottom: 24,
        }}
      >

        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: '#111',
            marginBottom: 14,
          }}
        >
          {label}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8F8F8',
            borderRadius: 16,
            padding: 10,
          }}
        >

          <TouchableOpacity
            onPress={() => {
              if (value > min) {
                setValue(value - 1);
              }
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >

            <Ionicons
              name="remove"
              size={22}
              color="#333"
            />

          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: ORANGE,
            }}
          >
            {value}
          </Text>

          <TouchableOpacity
            onPress={() => setValue(value + 1)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: ORANGE,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >

            <Ionicons
              name="add"
              size={22}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

      </View>
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
              name="grid-outline"
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
              Table Capacity
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              {totalTables} tables • {maxGuests} guests/table
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
              maxHeight: '85%',
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
                Table Capacity
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

              <Counter
                label="Total Tables"
                value={totalTables}
                setValue={setTotalTables}
              />

              <Counter
                label="Max Guests Per Table"
                value={maxGuests}
                setValue={setMaxGuests}
              />

              <Counter
                label="Parallel Bookings"
                value={parallelBookings}
                setValue={setParallelBookings}
              />

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

export default MaxTablesCard;