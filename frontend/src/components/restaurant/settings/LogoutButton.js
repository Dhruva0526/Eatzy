import React from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

const LogoutButton = ({
  styles,
  handleLogout,
}) => {
  return (
    <TouchableOpacity
      style={styles.logoutBtn}
      onPress={handleLogout}
    >
      <Text style={styles.logoutText}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;