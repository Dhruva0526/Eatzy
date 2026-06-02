import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import styles from '../../../../styles/restaurant/settingsStyles';

const ScheduleModal = ({
  showScheduleModal,
  setShowScheduleModal,

  openHour,
  setOpenHour,

  openMin,
  setOpenMin,

  closeHour,
  setCloseHour,

  closeMin,
  setCloseMin,

  openPeriod,
  setOpenPeriod,

  closePeriod,
  setClosePeriod,

  setOpenTime,
  setCloseTime,

  handleTimeChange,
  formatOnBlur,
  finalFormat,

  callUpdate,
}) => {

  if (!showScheduleModal) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>

        <Text style={styles.modalTitle}>
          Operating Hours
        </Text>

        {/* OPENING TIME */}
        <Text style={styles.modalLabel}>
          Opening Time
        </Text>

        <View style={styles.timeRow}>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >

            <TextInput
              value={openHour}
              onChangeText={(v) =>
                handleTimeChange(
                  'hour',
                  v,
                  setOpenHour
                )
              }
              onBlur={() =>
                formatOnBlur(
                  openHour,
                  setOpenHour
                )
              }
              placeholder="HH"
              keyboardType="numeric"
              maxLength={2}
              style={[
                styles.timeInput,
                {
                  width: 55,
                  textAlign: 'center',
                },
              ]}
            />

            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: 'bold',
              }}
            >
              :
            </Text>

            <TextInput
              value={openMin}
              onChangeText={(v) =>
                handleTimeChange(
                  'min',
                  v,
                  setOpenMin
                )
              }
              onBlur={() =>
                formatOnBlur(
                  openMin,
                  setOpenMin
                )
              }
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2}
              style={[
                styles.timeInput,
                {
                  width: 55,
                  textAlign: 'center',
                },
              ]}
            />

          </View>

          <View style={styles.periodRow}>
            {['AM', 'PM'].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.periodBtn,
                  openPeriod === p &&
                    styles.periodActive,
                ]}
                onPress={() =>
                  setOpenPeriod(p)
                }
              >
                <Text
                  style={{
                    color:
                      openPeriod === p
                        ? '#fff'
                        : '#555',
                    fontWeight: '600',
                  }}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        {/* CLOSING TIME */}
        <Text
          style={[
            styles.modalLabel,
            { marginTop: 10 },
          ]}
        >
          Closing Time
        </Text>

        <View style={styles.timeRow}>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >

            <TextInput
              value={closeHour}
              onChangeText={(v) =>
                handleTimeChange(
                  'hour',
                  v,
                  setCloseHour
                )
              }
              onBlur={() =>
                formatOnBlur(
                  closeHour,
                  setCloseHour
                )
              }
              placeholder="HH"
              keyboardType="numeric"
              maxLength={2}
              style={[
                styles.timeInput,
                {
                  width: 55,
                  textAlign: 'center',
                },
              ]}
            />

            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: 'bold',
              }}
            >
              :
            </Text>

            <TextInput
              value={closeMin}
              onChangeText={(v) =>
                handleTimeChange(
                  'min',
                  v,
                  setCloseMin
                )
              }
              onBlur={() =>
                formatOnBlur(
                  closeMin,
                  setCloseMin
                )
              }
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2}
              style={[
                styles.timeInput,
                {
                  width: 55,
                  textAlign: 'center',
                },
              ]}
            />

          </View>

          <View style={styles.periodRow}>
            {['AM', 'PM'].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.periodBtn,
                  closePeriod === p &&
                    styles.periodActive,
                ]}
                onPress={() =>
                  setClosePeriod(p)
                }
              >
                <Text
                  style={{
                    color:
                      closePeriod === p
                        ? '#fff'
                        : '#555',
                    fontWeight: '600',
                  }}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        {/* ACTIONS */}
        <View style={styles.modalActionRow}>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={async () => {

              const fOpenH =
                finalFormat(openHour);

              const fOpenM =
                finalFormat(openMin);

              const fCloseH =
                finalFormat(closeHour);

              const fCloseM =
                finalFormat(closeMin);

              setOpenHour(fOpenH);
              setOpenMin(fOpenM);

              setCloseHour(fCloseH);
              setCloseMin(fCloseM);

              const open =
                `${fOpenH}:${fOpenM} ${openPeriod}`;

              const close =
                `${fCloseH}:${fCloseM} ${closePeriod}`;

              setOpenTime(open);
              setCloseTime(close);

              await callUpdate({
                openTime: open,
                closeTime: close,
              });

              setShowScheduleModal(false);
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setShowScheduleModal(false)
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

        </View>

      </View>
    </View>
  );
};

export default ScheduleModal;