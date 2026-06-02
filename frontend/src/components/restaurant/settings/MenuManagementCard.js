import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from './Card';

const MenuManagementCard = ({
  styles,
  GREEN,
  setShowMenuModal,
}) => {
  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>
          Menu Management
        </Text>

        <Ionicons
          name="restaurant-outline"
          size={20}
          color="#333"
        />
      </View>

      <Text
        style={[
          styles.subLabel,
          { marginBottom: 15 },
        ]}
      >
        View your menu, update prices,
        or pause items in one place.
      </Text>

      <TouchableOpacity
        style={[
          styles.logoutBtn,
          {
            marginHorizontal: 0,
            marginTop: 0,
            height: 50,
            backgroundColor: GREEN,
          },
        ]}
        onPress={() => setShowMenuModal(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="list-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 10 }}
          />

          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 16,
            }}
          >
            Manage Menu
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default MenuManagementCard;