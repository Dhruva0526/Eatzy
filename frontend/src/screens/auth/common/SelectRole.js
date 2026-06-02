import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function SelectRole({ navigation }) {
  
  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Eatzy 🍽️</Text>
      <Text style={styles.subtitle}>
        Choose how you want to continue
      </Text>

      {/* Customer Button */}
      <TouchableOpacity
        style={styles.customerBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.btnText}>Continue as Customer</Text>
      </TouchableOpacity>
      

      {/* Restaurant Button */}
      <TouchableOpacity
        style={styles.restaurantBtn}
        onPress={() => navigation.navigate('RestaurantLogin')}
      >
        <Text style={styles.btnText}>Continue as Restaurant</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40
  },
  customerBtn: {
    width: '100%',
    backgroundColor: '#FF6F3C',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15
  },
  restaurantBtn: {
    width: '100%',
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  }
});
