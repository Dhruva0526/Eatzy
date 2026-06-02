import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const AdvancePaymentCard = ({
  styles,
  ORANGE,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [enabled, setEnabled] = useState(false);

  const [paymentType, setPaymentType] = useState('fixed');

  const [amount, setAmount] = useState('200');

  const paymentOptions = [
    {
      id: 'fixed',
      label: 'Fixed Amount',
      icon: 'cash-outline',
    },
    {
      id: 'percentage',
      label: 'Percentage',
      icon: 'pie-chart-outline',
    },
  ];

  const getSubtitle = () => {

    if (!enabled) {
      return 'No advance payment required';
    }

    if (paymentType === 'fixed') {
      return `₹${amount} advance required`;
    }

    return `${amount}% advance required`;
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
              name="wallet-outline"
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
              Advance Payment
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#777',
                fontSize: 13,
              }}
            >
              {getSubtitle()}
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
                Advance Payment
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

              {/* ENABLE / DISABLE */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setEnabled(!enabled)}
                style={{
                  backgroundColor: '#F8F8F8',
                  borderRadius: 18,
                  padding: 16,
                  marginBottom: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >

                <View>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111',
                    }}
                  >
                    Require Advance Payment
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: '#777',
                      fontSize: 13,
                    }}
                  >
                    Prevent fake reservations
                  </Text>

                </View>

                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    backgroundColor: enabled
                      ? ORANGE
                      : '#DDD',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >

                  {enabled && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#fff"
                    />
                  )}

                </View>

              </TouchableOpacity>

              {enabled && (
                <>
                  {/* PAYMENT TYPE */}

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111',
                      marginBottom: 14,
                    }}
                  >
                    Payment Type
                  </Text>

                  <View
                    style={{
                      marginBottom: 24,
                    }}
                  >

                    {paymentOptions.map((item) => {

                      const active =
                        paymentType === item.id;

                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.8}
                          onPress={() =>
                            setPaymentType(item.id)
                          }
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 16,
                            borderRadius: 16,
                            backgroundColor: active
                              ? '#FFF3EE'
                              : '#F8F8F8',
                            borderWidth: active ? 1 : 0,
                            borderColor: active
                              ? ORANGE
                              : 'transparent',
                            marginBottom: 12,
                          }}
                        >

                          <Ionicons
                            name={item.icon}
                            size={22}
                            color={
                              active
                                ? ORANGE
                                : '#666'
                            }
                          />

                          <Text
                            style={{
                              marginLeft: 14,
                              flex: 1,
                              fontSize: 15,
                              fontWeight: '600',
                              color: '#111',
                            }}
                          >
                            {item.label}
                          </Text>

                          {active && (
                            <Ionicons
                              name="checkmark-circle"
                              size={22}
                              color={ORANGE}
                            />
                          )}

                        </TouchableOpacity>
                      );
                    })}

                  </View>

                  {/* AMOUNT */}

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111',
                      marginBottom: 14,
                    }}
                  >
                    {paymentType === 'fixed'
                      ? 'Advance Amount'
                      : 'Advance Percentage'}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#F8F8F8',
                      borderRadius: 16,
                      paddingHorizontal: 16,
                      marginBottom: 30,
                    }}
                  >

                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: ORANGE,
                        marginRight: 8,
                      }}
                    >
                      {paymentType === 'fixed'
                        ? '₹'
                        : '%'}
                    </Text>

                    <TextInput
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="numeric"
                      placeholder="Enter amount"
                      placeholderTextColor="#999"
                      style={{
                        flex: 1,
                        height: 56,
                        fontSize: 16,
                        color: '#111',
                        fontWeight: '600',
                      }}
                    />

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

export default AdvancePaymentCard;