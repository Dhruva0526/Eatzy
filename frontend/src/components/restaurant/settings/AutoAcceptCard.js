import React from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const AutoAcceptCard = ({
  styles,
  GREEN,

  autoAccept,
  setAutoAccept,

  callUpdate,
}) => {
  return (
    <Card style={styles.autoCard}>
      <Ionicons
        name="print-outline"
        size={26}
        color={
          autoAccept
            ? GREEN
            : '#777'
        }
      />

      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        <Text style={styles.label}>
          Auto Accept Order
        </Text>

        <Text style={styles.subLabel}>
          {autoAccept
            ? 'Orders are being accepted automatically'
            : 'Accept orders automatically'}
        </Text>
      </View>

      <Switch
        value={autoAccept}
        onValueChange={async (value) => {
          setAutoAccept(value);

          await callUpdate({
            autoAccept: value,
          });

          if (value) {
            Alert.alert(
              'Auto-Accept ON',
              'All incoming orders will be accepted automatically.'
            );
          }
        }}
      />
    </Card>
  );
};

export default AutoAcceptCard;