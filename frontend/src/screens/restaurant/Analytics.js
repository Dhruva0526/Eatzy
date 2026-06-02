import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getRestaurantAnalyticsAPI
} from "../../services/restaurantOrderService";

const ORANGE = '#FF6A3D';
const GREEN = '#4CAF50';

export default function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    orders: "0",
    sales: "₹0",
    orderGrowth: "0%",
    salesGrowth: "0%",
    items: [],
    chart: []
  });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const restaurantRegisterDate = new Date(2024, 0, 10); 
  // year, month(0 index), day


  // 🔹 Effect to simulate data fetching based on filter
  useEffect(() => {

    fetchAnalyticsData();

    const interval = setInterval(() => {

      fetchAnalyticsData();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const fetchAnalyticsData = async () => {

    try {

      setIsLoading(true);

      const restaurantId =
        await AsyncStorage.getItem(
          "restaurant_id"
        );

      const res =
        await getRestaurantAnalyticsAPI(
          restaurantId
        );

      const maxQty = Math.max(
        ...res.top_items.map(i => i.qty),
        1
      );

      const formattedItems =
        res.top_items.map(item => ({
          name: item.name,
          val: `${item.qty} sold`,
          width: `${(item.qty / maxQty) * 100}%`
        }));

      setData({

        // completed orders count
        orders: `${res.completed_orders}`,

        // completed sales amount
        sales: `₹${res.today_sales}`,

        // optional small text
        orderGrowth: "Completed Orders",

        salesGrowth: "Today's Revenue",

        items: formattedItems,

        chart: [
          res.completed_orders,
          res.today_sales / 100,
          res.completed_orders * 0.8,
          res.today_sales / 150
        ]

      });
    } catch (error) {

      console.log(error);

    } finally {

      setIsLoading(false);

    }
  };

  const handleCalendarPress = () => {
    setShowPicker(true);
  };

  const today = new Date();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Final minimum date = later of register date OR oneYearAgo
  const minimumSelectableDate =
    restaurantRegisterDate > oneYearAgo
      ? restaurantRegisterDate
      : oneYearAgo;

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
      setSelectedFilter('Custom');   // 👈 IMPORTANT
      fetchAnalyticsData();
    }
  };


  const formatDate = (d) =>
    `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

  const getTitleLabel = () => {
    if (selectedFilter === 'Monthly') return 'Monthly';

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, today)) return 'Today';
    if (isSameDay(date, yesterday)) return 'Yesterday';

    return formatDate(date);
  };


  const isSameDay = (d1, d2) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSub}>Pizza Palace • {getTitleLabel()} Summary</Text>
        </View>
        <TouchableOpacity onPress={fetchAnalyticsData}>
           <Ionicons name="refresh-circle" size={32} color={ORANGE} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Filter */}
        <View style={styles.filterRow}>
          {['Today', 'Monthly'].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterBtn,
                selectedFilter === item && styles.filterActive,
              ]}
              onPress={() => {
                if (item === 'Today') {
                  setSelectedFilter('Today');
                  setDate(new Date());   // reset to current date
                } else {
                  setSelectedFilter(item);
                }
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.calendarBtn} onPress={handleCalendarPress}>
            <Text style={styles.calendarText}>{formatDate(date)}</Text>
            <Ionicons name="calendar-outline" size={18} color="#555" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="large" color={ORANGE} />
            <Text style={{ textAlign: 'center', marginTop: 10, color: '#777' }}>Updating Stats...</Text>
          </View>
        ) : (
          <>
            {/* Dynamic Cards */}
            <AnalyticsCard 
                title={`${getTitleLabel()} Orders`}
                value={data.orders} 
                growth={data.orderGrowth}
                chartData={data.chart} 
            />
            <AnalyticsCard 
                title={`${getTitleLabel()} Sales`}
                value={data.sales} 
                growth={data.salesGrowth}
                chartData={data.chart} 
            />

            {/* Items Sales Breakdown */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>
                  {getTitleLabel()} Item Performance
                </Text>
                <Ionicons name="stats-chart" size={16} color="#777" />
              </View>
              
              {data.items.length > 0 ? (
                data.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <View style={{ width: '45%' }}>
                        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                        <Text style={{ fontSize: 10, color: '#999' }}>{item.val}</Text>
                      </View>
                      <View style={styles.barBg}>
                        <View style={[styles.barFill, { width: item.width }]} />
                      </View>
                    </View>
                  ))
              ) : (
                <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>No item data available</Text>
              )}
            </View>
          </>
        )}

        {/* Bottom safe spacing */}
        <View style={{ height: 90 }} />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={today}                 // no future
            minimumDate={minimumSelectableDate} // register or 1 year
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔹 Enhanced Reusable Card with dynamic color logic */
function AnalyticsCard({ title, value, growth, chartData }) {
  const isNegative = growth.includes('-');
  const max = Math.max(
    ...(chartData?.length ? chartData : [1])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={[styles.growth, { color: isNegative ? '#F44336' : GREEN, marginLeft: 8 }]}>
          {growth}
        </Text>
      </View>

      <View style={styles.chartRow}>
        {chartData.map((num, i) => {
          const height = (num / max) * 60; // scale

          return (
            <View
              key={i}
              style={[
                styles.chartBar,
                { height }
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }, 
  headerTitle: { fontSize: 26, fontWeight: '700' },
  headerSub: { fontSize: 14, color: '#777' },
  container: { padding: 20 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  filterActive: { backgroundColor: ORANGE, borderColor: ORANGE },
  filterText: { color: '#555', fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  calendarBtn: { flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' },
  calendarText: { marginRight: 6, color: '#555', fontWeight: '500' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  cardValue: { fontSize: 24, fontWeight: '800', color: '#000' },
  growth: { fontSize: 14, fontWeight: '700' },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
    marginTop: 10
  },
  chartBar: { width: '8%', borderRadius: 4, backgroundColor: ORANGE },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  itemName: { color: '#444', fontWeight: '500', fontSize: 13 },
  barBg: { width: '55%', height: 8, backgroundColor: '#fde2d9', borderRadius: 10 },
  barFill: { height: '100%', backgroundColor: ORANGE, borderRadius: 10 },
});