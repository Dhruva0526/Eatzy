import React from 'react';

import {
  View,
 Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from '../../../../styles/restaurant/settingsStyles';

const BankDetailsModal = ({
  showDetailsModal,
  setShowDetailsModal,

  GREEN,

  bankForm,
  bankName,
}) => {

  if (!showDetailsModal) return null;

  return (
    <View style={styles.modalOverlay}>

      <View style={styles.modalCard}>

        {/* HEADER */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >

          <Text style={styles.modalTitle}>
            Saved Bank Details
          </Text>

          <Ionicons
            name="shield-checkmark"
            size={24}
            color={GREEN}
          />

        </View>

        {/* HOLDER */}
        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Account Holder
          </Text>

          <Text style={styles.detailValue}>
            {bankForm.holderName || "Not Set"}
          </Text>

        </View>

        {/* BANK NAME */}
        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Bank Name
          </Text>

          <Text style={styles.detailValue}>
            {bankName}
          </Text>

        </View>

        {/* ACCOUNT */}
        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Account Number
          </Text>

          <Text style={styles.detailValue}>
            {bankForm.accountNo || "********"}
          </Text>

        </View>

        {/* IFSC */}
        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            IFSC Code
          </Text>

          <Text style={styles.detailValue}>
            {bankForm.ifsc || "Not Set"}
          </Text>

        </View>

        {/* BRANCH */}
        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>
            Branch
          </Text>

          <Text style={styles.detailValue}>
            {bankForm.branch}
          </Text>

        </View>

        {/* CLOSE BUTTON */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            {
              marginTop: 20,
            },
          ]}
          onPress={() =>
            setShowDetailsModal(false)
          }
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            Close
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default BankDetailsModal;