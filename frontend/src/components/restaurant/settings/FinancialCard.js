import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const FinancialCard = ({
  styles,
  ORANGE,
  GREEN,

  bankName,
  bankAccount,

  commissionRate,

  setShowDetailsModal,
  setShowBankModal,
}) => {
  return (
    <Card>
      {/* Header */}
      <View style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="wallet-outline"
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />

          <Text style={styles.cardTitle}>
            Payouts & Financial
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Reports',
              'Opening Payout Reports...'
            )
          }
        >
          <Text
            style={{
              color: ORANGE,
              fontWeight: '600',
              fontSize: 13,
            }}
          >
            View History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bank Details */}
      <View style={styles.menuRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            Bank Account
          </Text>

          <Text style={styles.subLabel}>
            {bankName}
          </Text>

          <Text
            style={[
              styles.subLabel,
              {
                color: '#333',
                fontWeight: '500',
              },
            ]}
          >
            {bankAccount}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {/* Show Details */}
          <TouchableOpacity
            style={[
              styles.editScheduleBtn,
              {
                marginBottom: 8,
                backgroundColor: '#e3f2fd',
              },
            ]}
            onPress={() =>
              setShowDetailsModal(true)
            }
          >
            <Text
              style={[
                styles.editScheduleText,
                {
                  color: '#1976d2',
                },
              ]}
            >
              Show Details
            </Text>

            <Ionicons
              name="eye-outline"
              size={14}
              color="#1976d2"
            />
          </TouchableOpacity>

          {/* Edit */}
          <TouchableOpacity
            style={styles.editScheduleBtn}
            onPress={() =>
              setShowBankModal(true)
            }
          >
            <Text style={styles.editScheduleText}>
              Edit Account
            </Text>

            <Ionicons
              name="pencil"
              size={12}
              color="#555"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Commission Box */}
      <View
        style={{
          marginTop: 15,
          padding: 15,
          backgroundColor: '#F0FFF4',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#C6F6D5',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#2F855A',
              }}
            >
              Platform Commission
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: '#48BB78',
              }}
            >
              Per order basis
            </Text>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: '#2F855A',
              }}
            >
              {commissionRate}
            </Text>

            <Text
              style={{
                fontSize: 10,
                color: '#48BB78',
              }}
            >
              Lowest in Market
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: '#C6F6D5',
            marginVertical: 10,
          }}
        />

        <Text
          style={[
            styles.subLabel,
            {
              fontSize: 11,
              fontStyle: 'italic',
            },
          ]}
        >
          *A small service fee of 3-5% is
          applied to each order to maintain
          the platform services.
        </Text>
      </View>
    </Card>
  );
};

export default FinancialCard;