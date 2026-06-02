import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const ProfileCard = ({
  styles,
  ORANGE,
  profileData,
  navigation,
}) => {
  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>My Profile</Text>

        <Ionicons
          name="person-circle-outline"
          size={22}
          color="#333"
        />
      </View>

      <TouchableOpacity
        style={styles.profileSummaryRow}
        onPress={() =>
          navigation.navigate("Profile", { profileData })
        }
      >
        <View style={styles.avatarMini}>
          <Ionicons
            name="person"
            size={24}
            color={ORANGE}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {profileData?.ownerName || "Loading..."}
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#777',
            }}
          >
            {profileData?.shopName || "Loading..."} •{" "}
            {profileData?.phone || "Loading..."}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#ccc"
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 11,
          color: '#999',
          marginTop: 10,
          fontStyle: 'italic',
        }}
      >
        Manage your shop address, GST, and account security here.
      </Text>
    </Card>
  );
};

export default ProfileCard;