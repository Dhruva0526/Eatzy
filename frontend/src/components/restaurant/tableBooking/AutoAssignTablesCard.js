import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const AutoAssignTablesCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [enabled, setEnabled] = useState(true);

  const [smartMatching, setSmartMatching] =
    useState(true);

  const [mergeTables, setMergeTables] =
    useState(false);

  const [vipPriority, setVipPriority] =
    useState(false);

  const ToggleRow = ({
    title,
    subtitle,
    value,
    onToggle,
  }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={{
          backgroundColor: '#F8F8F8',
          borderRadius: 18,
          padding: 16,
          marginBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >

        <View style={{ flex: 1 }}>

          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: '#111',
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: '#777',
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            {subtitle}
          </Text>

        </View>

        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            backgroundColor: value
              ? ORANGE
              : '#DDD',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          {value && (
            <Ionicons
              name="checkmark"
              size={16}
              color="#fff"
            />
          )}

        </View>

      </TouchableOpacity>
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
              name="sparkles-outline"
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
              Auto Assign Tables
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              {enabled
                ? 'Smart table assignment enabled'
                : 'Manual assignment only'}
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
                Auto Assign Tables
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

              {/* ENABLE */}

              <ToggleRow
                title="Enable Auto Assignment"
                subtitle="Automatically assign tables for incoming reservations"
                value={enabled}
                onToggle={() =>
                  setEnabled(!enabled)
                }
              />

              {enabled && (
                <>
                  <ToggleRow
                    title="Smart Capacity Matching"
                    subtitle="Assign tables based on guest count and seating efficiency"
                    value={smartMatching}
                    onToggle={() =>
                      setSmartMatching(
                        !smartMatching
                      )
                    }
                  />

                  <ToggleRow
                    title="Merge Tables"
                    subtitle="Combine nearby tables for large groups"
                    value={mergeTables}
                    onToggle={() =>
                      setMergeTables(
                        !mergeTables
                      )
                    }
                  />

                  <ToggleRow
                    title="VIP / Window Priority"
                    subtitle="Reserve premium tables for priority customers"
                    value={vipPriority}
                    onToggle={() =>
                      setVipPriority(
                        !vipPriority
                      )
                    }
                  />

                  {/* INFO BOX */}

                  <View
                    style={{
                      backgroundColor: '#FFF6F1',
                      borderRadius: 18,
                      padding: 16,
                      marginTop: 10,
                      marginBottom: 28,
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
                        Smart Automation
                      </Text>

                    </View>

                    <Text
                      style={{
                        color: '#666',
                        fontSize: 13,
                        lineHeight: 20,
                      }}
                    >
                      Eatzy will automatically optimize
                      seating arrangements to reduce
                      empty tables and improve booking
                      efficiency.
                    </Text>

                  </View>
                </>
              )}

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

export default AutoAssignTablesCard;