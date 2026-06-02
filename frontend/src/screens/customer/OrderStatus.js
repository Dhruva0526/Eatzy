import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import { getSingleOrderAPI } from "../../services/orderService";

const ORANGE = '#FF6A3D';
const BG = '#F2F2F2';

export default function OrderStatus() {
  const navigation = useNavigation();

  
  const route = useRoute();

  const orderId =
    route.params?.orderData?.order_id;


  const [order, setOrder] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);


  const messages = [ 
    "Your order has been placed!",
    "Restaurant accepted your order.", 
    "We’ve started preparing your order.", 
    "Your order is ready for pickup!", 
    "Order completed. Enjoy your meal!", 
    "Order was rejected by restaurant.", 
  ];
  


  const loadOrder = async () => {

    try {

      const res = await getSingleOrderAPI(
        orderId
      );

      setOrder(res);

      if (res.status === "pending") {
        setCurrentStep(0);
      }

      else if (res.status === "accepted") {
        setCurrentStep(1);
      }

      else if (res.status === "preparing") {
        setCurrentStep(2);
      }

      else if (res.status === "ready") {
        setCurrentStep(3);
      }

      else if (res.status === "completed") {
        setCurrentStep(4);
      }

      else if (res.status === "rejected") {
        setCurrentStep(5);
      }



    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    loadOrder();

    const interval = setInterval(() => {

      loadOrder();

    }, 3000);

    return () => clearInterval(interval);

  }, []);


  const progressWidth = [
    '5%',
    '25%',
    '50%',
    '75%',
    '100%',
    '100%',
  ][currentStep];



  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Status</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* MAIN CARD */}
      <View style={styles.card}>
        <Text style={styles.grayText}>Your Token Number</Text>
        <Text style={styles.token}>
          #{orderId}
        </Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.smallToken}>
              #{orderId}
            </Text>
            <Text style={styles.grayText}>Current Token</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.grayText}>ETA</Text>
            <Text style={styles.eta}>
              {20 - currentStep * 5}
            </Text>
            <Text style={styles.grayText}>minutes</Text>
          </View>
        </View>

        {/* STEPS */}
        
        <View style={styles.stepsRow}>
          <Text style={styles.stepText}>Placed</Text>
          <Text style={styles.stepText}>Accepted</Text>
          <Text style={styles.stepText}>Cooking</Text>
          <Text style={styles.stepText}>Ready</Text>
          <Text style={styles.stepText}>Done</Text>
        </View>



        {/* PROGRESS BAR */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: progressWidth }]}>
            <View style={styles.dot} />
          </View>
        </View>
      </View>

      {/* MESSAGE BOX */}
      <View
        style={[
          styles.messageBox,
          order?.status === "rejected" && {
            backgroundColor: "#FEE2E2"
          }
        ]}
      >
        <Text
          style={[
            styles.messageText,
            order?.status === "rejected" && {
              color: "#DC2626"
            }
          ]}
        >
          {messages[currentStep]}
        </Text>
      </View>



      {/* DETAILS LINK */}
      <TouchableOpacity
        style={styles.detailsBtn}
        onPress={() =>
          navigation.navigate("OrderDetails", {
            order: {
              id: orderId,
              items: [],
              total: 0,
            },
          })
        }
      >
        <Text style={styles.detailsText}>View Order Details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 24,
    padding: 20,
    elevation: 3,
  },

  grayText: {
    color: '#777',
    fontSize: 16,
  },

  token: {
    fontSize: 64,
    color: ORANGE,
    fontWeight: '800',
    marginVertical: 10,
  },

  smallToken: {
    fontSize: 40,
    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  eta: {
    fontSize: 34,
    fontWeight: '700',
  },

  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  stepText: {
    fontSize: 16,
    fontWeight: '600',
  },

  progressBg: {
    height: 12,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginTop: 14,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: ORANGE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  dot: {
    width: 22,
    height: 22,
    backgroundColor: ORANGE,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    right: -10,
  },

  messageBox: {
    backgroundColor: '#FFD9CC',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
  },

  messageText: {
    color: ORANGE,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  detailsBtn: {
    marginTop: 30,
    alignItems: 'center',
  },

  detailsText: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#666',
  },
});
