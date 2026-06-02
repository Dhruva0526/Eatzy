import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const StaffModal = ({
  styles,
  visible,
  setShowStaffModal,

  newStaff,
  setNewStaff,

  isRolePickerVisible,
  setIsRolePickerVisible,

  isIdTypePickerVisible,
  setIsIdTypePickerVisible,

  roles,
  idTypes,

  addStaff,

  GREEN,
  ORANGE,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>

          <Text style={styles.modalTitle}>
            Add New Staff
          </Text>

          {/* NAME */}
          <TextInput
            placeholder="Full Name"
            style={styles.timeInput}
            onChangeText={(v) =>
              setNewStaff({
                ...newStaff,
                name: v,
              })
            }
          />

          {/* ROLE */}
          <TouchableOpacity
            style={[
              styles.timeInput,
              {
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() =>
              setIsRolePickerVisible(true)
            }
          >
            <Text
              style={{
                color:
                  newStaff.role === 'Select Role'
                    ? '#999'
                    : '#333',
              }}
            >
              {newStaff.role}
            </Text>

            <Ionicons
              name="chevron-down"
              size={18}
              color="#777"
            />
          </TouchableOpacity>

          {/* PHONE */}
          <TextInput
            placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
            style={[
              styles.timeInput,
              { marginTop: 12 },
            ]}
            onChangeText={(v) =>
              setNewStaff({
                ...newStaff,
                phone: v,
              })
            }
          />

          {/* ID TYPE */}
          <Text
            style={[
              styles.modalLabel,
              { marginTop: 15 },
            ]}
          >
            ID Proof Verification
          </Text>

          <TouchableOpacity
            style={[
              styles.timeInput,
              {
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() =>
              setIsIdTypePickerVisible(true)
            }
          >
            <Text
              style={{
                color:
                  newStaff.idType ===
                  'Select ID Type'
                    ? '#999'
                    : '#333',
              }}
            >
              {newStaff.idType}
            </Text>

            <Ionicons
              name="chevron-down"
              size={18}
              color="#777"
            />
          </TouchableOpacity>

          {/* ID NUMBER */}
          <TextInput
            placeholder="Enter ID Number"
            style={[
              styles.timeInput,
              { marginTop: 12 },
            ]}
            value={newStaff.idNumber}
            onChangeText={(v) =>
              setNewStaff({
                ...newStaff,
                idNumber: v,
              })
            }
          />

          {/* UPLOAD */}
          <TouchableOpacity
            style={[
              styles.uploadBtn,
              { marginTop: 12 },
            ]}
            onPress={() => {
              setNewStaff({
                ...newStaff,
                idFile: 'id_document.jpg',
              });
            }}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={ORANGE}
            />

            <Text
              style={{
                marginLeft: 10,
                color: ORANGE,
                fontWeight: '600',
              }}
            >
              {newStaff.idFile
                ? 'File Attached ✅'
                : 'Upload ID Image'}
            </Text>
          </TouchableOpacity>

          {/* SAVE */}
          <TouchableOpacity
            style={[
              styles.saveBtn,
              {
                marginTop: 25,
                backgroundColor: ORANGE,
              },
            ]}
            onPress={() => {
              if (
                newStaff.name &&
                newStaff.role !==
                  'Select Role' &&
                newStaff.phone
              ) {
                addStaff();
              } else {
                Alert.alert(
                  'Error',
                  'Please fill Name, Role and Phone.'
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
              Register Staff
            </Text>
          </TouchableOpacity>

          {/* CANCEL */}
          <TouchableOpacity
            onPress={() =>
              setShowStaffModal(false)
            }
            style={{
              marginTop: 15,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#777' }}>
              Cancel
            </Text>
          </TouchableOpacity>

          {/* ROLE PICKER */}
          <Modal
            visible={isRolePickerVisible}
            transparent
            animationType="fade"
          >
            <TouchableOpacity
              style={styles.rolePickerOverlay}
              onPress={() =>
                setIsRolePickerVisible(false)
              }
            >
              <View style={styles.rolePickerContent}>
                <Text style={styles.modalLabel}>
                  Select Staff Role
                </Text>

                {roles.map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={styles.roleOption}
                    onPress={() => {
                      setNewStaff({
                        ...newStaff,
                        role,
                      });

                      setIsRolePickerVisible(false);
                    }}
                  >
                    <Text style={styles.roleText}>
                      {role}
                    </Text>

                    {newStaff.role === role && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={GREEN}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* ID TYPE PICKER */}
          <Modal
            visible={isIdTypePickerVisible}
            transparent
            animationType="fade"
          >
            <TouchableOpacity
              style={styles.rolePickerOverlay}
              onPress={() =>
                setIsIdTypePickerVisible(false)
              }
            >
              <View style={styles.rolePickerContent}>
                <Text style={styles.modalLabel}>
                  Select ID Document Type
                </Text>

                {idTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.roleOption}
                    onPress={() => {
                      setNewStaff({
                        ...newStaff,
                        idType: type,
                      });

                      setIsIdTypePickerVisible(false);
                    }}
                  >
                    <Text style={styles.roleText}>
                      {type}
                    </Text>

                    {newStaff.idType === type && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={GREEN}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

        </View>
      </View>
    </Modal>
  );
};

export default StaffModal;