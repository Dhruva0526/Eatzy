import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from '../../../../styles/restaurant/settingsStyles';

const PrepTimeModal = ({
  showPrepModal,
  setShowPrepModal,
  prepTime,
  setPrepTime,
  callUpdate,
}) => {

  if (!showPrepModal) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>

        <Text style={styles.modalTitle}>
          Prep Time (minutes)
        </Text>

        <View style={styles.counterRow}>

          <TouchableOpacity
            onPress={() =>
              setPrepTime(p => Math.max(5, p - 5))
            }
            style={styles.counterBtn}
          >
            <Text>-</Text>
          </TouchableOpacity>

          <Text style={styles.counterValue}>
            {prepTime}
          </Text>

          <TouchableOpacity
            onPress={() =>
              setPrepTime(p => p + 5)
            }
            style={styles.counterBtn}
          >
            <Text>+</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            setShowPrepModal(false);

            callUpdate({
              prepTime,
            });
          }}
        >
          <Text style={{ color: '#fff' }}>
            Save
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default PrepTimeModal;