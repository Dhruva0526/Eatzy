import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import styles from '../../../../styles/restaurant/settingsStyles';

const BankModal = ({
  showBankModal,
  setShowBankModal,

  isOtpSent,
  setIsOtpSent,

  bankForm,
  setBankForm,

  timer,
  setTimer,

  canResend,
  handleResend,

  GREEN,
  ORANGE,

  setBankName,
  setBankAccount,
}) => {

  if (!showBankModal) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>

        <Text style={styles.modalTitle}>
          {isOtpSent
            ? 'Verify OTP'
            : 'Bank Account Registration'}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 450 }}
        >

          {!isOtpSent ? (
            <>

              {/* BANK NAME */}
              <Text style={styles.modalLabel}>
                Bank Name
              </Text>

              <TextInput
                style={[
                  styles.timeInput,
                  {
                    width: '100%',
                    marginBottom: 12,
                  },
                ]}
                placeholder="e.g. HDFC Bank"
                value={bankForm.bankName}
                onChangeText={(v) =>
                  setBankForm({
                    ...bankForm,
                    bankName: v,
                  })
                }
              />

              {/* IFSC */}
              <Text style={styles.modalLabel}>
                IFSC Code
              </Text>

              <TextInput
                style={[
                  styles.timeInput,
                  {
                    width: '100%',
                    marginBottom: 5,
                  },
                ]}
                placeholder="IFSC0001234"
                autoCapitalize="characters"
                value={bankForm.ifsc}
                onChangeText={(v) => {

                  setBankForm({
                    ...bankForm,
                    ifsc: v,
                  });

                  if (v.length === 11) {

                    setBankForm(prev => ({
                      ...prev,
                      branch:
                        'Sector 62, Noida Branch',
                    }));
                  }
                }}
              />

              <Text
                style={{
                  fontSize: 11,
                  color: GREEN,
                  marginBottom: 12,
                }}
              >
                Branch: {bankForm.branch}
              </Text>

              {/* HOLDER NAME */}
              <Text style={styles.modalLabel}>
                Account Holder Name
              </Text>

              <TextInput
                style={[
                  styles.timeInput,
                  {
                    width: '100%',
                    marginBottom: 12,
                  },
                ]}
                placeholder="Name as per Bank"
                value={bankForm.holderName}
                onChangeText={(v) =>
                  setBankForm({
                    ...bankForm,
                    holderName: v,
                  })
                }
              />

              {/* ACCOUNT NUMBER */}
              <Text style={styles.modalLabel}>
                Account Number
              </Text>

              <TextInput
                style={[
                  styles.timeInput,
                  {
                    width: '100%',
                    marginBottom: 12,
                  },
                ]}
                placeholder="Enter Account No."
                keyboardType="numeric"
                secureTextEntry={true}
                value={bankForm.accountNo}
                onChangeText={(v) =>
                  setBankForm({
                    ...bankForm,
                    accountNo: v,
                  })
                }
              />

              {/* CONFIRM ACCOUNT */}
              <Text style={styles.modalLabel}>
                Confirm Account Number
              </Text>

              <TextInput
                style={[
                  styles.timeInput,
                  {
                    width: '100%',
                    marginBottom: 12,
                  },
                ]}
                placeholder="Re-enter Account No."
                keyboardType="numeric"
                value={bankForm.confirmAccountNo}
                onChangeText={(v) =>
                  setBankForm({
                    ...bankForm,
                    confirmAccountNo: v,
                  })
                }
              />

            </>
          ) : (

            <View
              style={{
                alignItems: 'center',
                paddingVertical: 20,
              }}
            >

              <Text
                style={[
                  styles.subLabel,
                  {
                    textAlign: 'center',
                    marginBottom: 20,
                  },
                ]}
              >
                OTP has been sent to your
                registered mobile number
                ending in ******45
              </Text>

              <TextInput
                style={[
                  styles.timeInput,
                  {
                    width: '80%',
                    textAlign: 'center',
                    fontSize: 24,
                    letterSpacing: 10,
                  },
                ]}
                placeholder="0000"
                keyboardType="numeric"
                maxLength={4}
                value={bankForm.otp}
                onChangeText={(v) =>
                  setBankForm({
                    ...bankForm,
                    otp: v,
                  })
                }
              />

              {/* TIMER */}
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                }}
              >

                {canResend ? (
                  <TouchableOpacity
                    onPress={handleResend}
                  >
                    <Text
                      style={{
                        color: ORANGE,
                        fontWeight: '700',
                      }}
                    >
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      color: '#999',
                      fontSize: 13,
                    }}
                  >
                    Resend OTP in{' '}
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {timer}s
                    </Text>
                  </Text>
                )}

              </View>

            </View>
          )}

        </ScrollView>

        {/* FOOTER */}
        <View style={{ marginTop: 20 }}>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {

              if (!isOtpSent) {

                if (
                  !bankForm.bankName ||
                  !bankForm.accountNo ||
                  !bankForm.ifsc
                ) {
                  Alert.alert(
                    "Error",
                    "Please fill all bank details."
                  );

                  return;
                }

                if (
                  bankForm.accountNo !==
                  bankForm.confirmAccountNo
                ) {
                  Alert.alert(
                    "Error",
                    "Account numbers do not match!"
                  );

                  return;
                }

                setIsOtpSent(true);
                setTimer(30);

              } else {

                if (
                  bankForm.otp.length < 4
                ) {
                  Alert.alert(
                    "Error",
                    "Please enter valid OTP."
                  );

                  return;
                }

                setBankName(
                  bankForm.bankName
                );

                setBankAccount(
                  'XXXX' +
                  bankForm.accountNo.slice(-4)
                );

                setShowBankModal(false);

                setIsOtpSent(false);

                Alert.alert(
                  "Success",
                  "Bank account updated successfully!"
                );
              }
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {isOtpSent
                ? 'Verify & Save'
                : 'Send OTP'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {

              setShowBankModal(false);
              setIsOtpSent(false);

            }}
            style={{
              marginTop: 15,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#777' }}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
};

export default BankModal;