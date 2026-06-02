import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const WaitlistCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [enabled, setEnabled] = useState(true);

  const [autoPromote, setAutoPromote] = useState(true);

  const [notifications, setNotifications] = useState(true);

  const [maxWaitlist, setMaxWaitlist] = useState(20);

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
              name="people-outline"
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
              Waitlist System
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              {enabled
                ? `${maxWaitlist} customers max`
                : 'Waitlist disabled'}
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
                Waitlist Settings
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
                title="Enable Waitlist"
                subtitle="Allow customers to join waitlist when tables are full"
                value={enabled}
                onToggle={() =>
                  setEnabled(!enabled)
                }
              />

              {enabled && (
                <>
                  {/* AUTO PROMOTE */}

                  <ToggleRow
                    title="Auto Promote Customers"
                    subtitle="Automatically move waitlisted customers to active bookings"
                    value={autoPromote}
                    onToggle={() =>
                      setAutoPromote(!autoPromote)
                    }
                  />

                  {/* NOTIFICATIONS */}

                  <ToggleRow
                    title="Notify Customers"
                    subtitle="Send notification when table becomes available"
                    value={notifications}
                    onToggle={() =>
                      setNotifications(!notifications)
                    }
                  />

                  {/* MAX WAITLIST */}

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111',
                      marginBottom: 14,
                      marginTop: 10,
                    }}
                  >
                    Max Waitlist Capacity
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#F8F8F8',
                      borderRadius: 16,
                      padding: 10,
                      marginBottom: 30,
                    }}
                  >

                    <TouchableOpacity
                      onPress={() => {
                        if (maxWaitlist > 1) {
                          setMaxWaitlist(
                            maxWaitlist - 1
                          );
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
                        fontSize: 22,
                        fontWeight: '700',
                        color: ORANGE,
                      }}
                    >
                      {maxWaitlist}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        setMaxWaitlist(
                          maxWaitlist + 1
                        )
                      }
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

export default WaitlistCard;