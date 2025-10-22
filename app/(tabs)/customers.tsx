
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

// Note: react-native-maps is not supported on web in Natively
// We'll show a message for web users and use the map on native platforms
let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
  } catch (error) {
    console.log('react-native-maps not available');
  }
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  jobsCompleted: number;
  lastService: string;
  vehicleInfo: string;
}

export default function CustomersScreen() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Smith',
      phone: '(555) 123-4567',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      latitude: 37.7749,
      longitude: -122.4194,
      jobsCompleted: 3,
      lastService: '2024-01-15',
      vehicleInfo: '2020 Honda Accord',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '(555) 234-5678',
      address: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103',
      latitude: 37.7699,
      longitude: -122.4130,
      jobsCompleted: 2,
      lastService: '2024-01-18',
      vehicleInfo: '2019 Toyota Camry',
    },
    {
      id: '3',
      name: 'Mike Davis',
      phone: '(555) 345-6789',
      address: '789 Pine Rd',
      city: 'San Francisco',
      state: 'CA',
      zip: '94104',
      latitude: 37.7799,
      longitude: -122.4250,
      jobsCompleted: 5,
      lastService: '2024-01-20',
      vehicleInfo: '2021 Ford F-150',
    },
    {
      id: '4',
      name: 'Emily Wilson',
      phone: '(555) 456-7890',
      address: '321 Elm St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      latitude: 37.7850,
      longitude: -122.4100,
      jobsCompleted: 1,
      lastService: '2024-01-22',
      vehicleInfo: '2022 Tesla Model 3',
    },
    {
      id: '5',
      name: 'David Brown',
      phone: '(555) 567-8901',
      address: '654 Maple Dr',
      city: 'San Francisco',
      state: 'CA',
      zip: '94106',
      latitude: 37.7650,
      longitude: -122.4300,
      jobsCompleted: 4,
      lastService: '2024-01-25',
      vehicleInfo: '2020 Chevrolet Silverado',
    },
  ];

  const initialRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleCustomerPress = (customer: Customer) => {
    console.log('Customer pressed:', customer.name);
    Alert.alert(
      customer.name,
      `${customer.address}\n${customer.city}, ${customer.state} ${customer.zip}\n\n` +
      `Phone: ${customer.phone}\n` +
      `Vehicle: ${customer.vehicleInfo}\n` +
      `Jobs Completed: ${customer.jobsCompleted}\n` +
      `Last Service: ${customer.lastService}`
    );
  };

  const handleAddCustomer = () => {
    console.log('Add new customer');
    Alert.alert('Add Customer', 'Customer creation form would open here');
  };

  const renderHeaderRight = () => (
    <View style={styles.headerRightContainer}>
      <Pressable
        onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
        style={styles.headerButton}
      >
        <IconSymbol 
          name={viewMode === 'map' ? 'list.bullet' : 'map.fill'} 
          color={colors.primary} 
          size={24} 
        />
      </Pressable>
      <Pressable
        onPress={handleAddCustomer}
        style={styles.headerButton}
      >
        <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
      </Pressable>
    </View>
  );

  const renderMapView = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webMapPlaceholder}>
          <IconSymbol name="map.fill" color={colors.textSecondary} size={64} />
          <Text style={styles.webMapTitle}>Maps Not Supported on Web</Text>
          <Text style={styles.webMapText}>
            Interactive maps are not available in the web version of Natively.
          </Text>
          <Text style={styles.webMapText}>
            Please use the iOS or Android app to view customer locations on a map.
          </Text>
          <Pressable 
            style={[buttonStyles.primary, { marginTop: 20 }]}
            onPress={() => setViewMode('list')}
          >
            <Text style={styles.buttonText}>View Customer List</Text>
          </Pressable>
        </View>
      );
    }

    if (!MapView || !Marker) {
      return (
        <View style={styles.webMapPlaceholder}>
          <IconSymbol name="exclamationmark.triangle.fill" color={colors.error} size={64} />
          <Text style={styles.webMapTitle}>Map Not Available</Text>
          <Text style={styles.webMapText}>
            Unable to load map component. Please check your installation.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {customers.map((customer) => (
            <Marker
              key={customer.id}
              coordinate={{
                latitude: customer.latitude,
                longitude: customer.longitude,
              }}
              title={customer.name}
              description={`${customer.address}, ${customer.city}`}
              onPress={() => handleCustomerPress(customer)}
            />
          ))}
        </MapView>
        
        {/* Map Legend */}
        <View style={styles.mapLegend}>
          <View style={styles.legendItem}>
            <IconSymbol name="mappin.circle.fill" color={colors.error} size={20} />
            <Text style={styles.legendText}>Customer Locations ({customers.length})</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>All Customers ({customers.length})</Text>
        </View>

        {customers.map((customer) => (
          <Pressable 
            key={customer.id} 
            style={commonStyles.card}
            onPress={() => handleCustomerPress(customer)}
          >
            <View style={commonStyles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <Text style={commonStyles.textSecondary}>{customer.phone}</Text>
              </View>
              <View style={styles.jobsBadge}>
                <Text style={styles.jobsCount}>{customer.jobsCompleted}</Text>
                <Text style={styles.jobsLabel}>Jobs</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.customerDetail}>
              <IconSymbol name="location.fill" color={colors.textSecondary} size={16} />
              <View style={{ flex: 1 }}>
                <Text style={styles.customerDetailText}>{customer.address}</Text>
                <Text style={styles.customerDetailText}>
                  {customer.city}, {customer.state} {customer.zip}
                </Text>
              </View>
            </View>

            <View style={styles.customerDetail}>
              <IconSymbol name="car.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.customerDetailText}>{customer.vehicleInfo}</Text>
            </View>

            <View style={styles.customerDetail}>
              <IconSymbol name="calendar" color={colors.textSecondary} size={16} />
              <Text style={styles.customerDetailText}>Last Service: {customer.lastService}</Text>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Pressable 
                style={styles.actionButton}
                onPress={() => Alert.alert('Call', `Calling ${customer.phone}`)}
              >
                <IconSymbol name="phone.fill" color={colors.primary} size={18} />
                <Text style={styles.actionButtonText}>Call</Text>
              </Pressable>
              <Pressable 
                style={styles.actionButton}
                onPress={() => Alert.alert('Directions', `Getting directions to ${customer.address}`)}
              >
                <IconSymbol name="map.fill" color={colors.primary} size={18} />
                <Text style={styles.actionButtonText}>Directions</Text>
              </Pressable>
              <Pressable 
                style={styles.actionButton}
                onPress={() => Alert.alert('New Job', `Creating job for ${customer.name}`)}
              >
                <IconSymbol name="plus.circle.fill" color={colors.primary} size={18} />
                <Text style={styles.actionButtonText}>New Job</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Customers",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={commonStyles.container} edges={['top']}>
        {Platform.OS !== 'ios' && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Customers</Text>
            {renderHeaderRight()}
          </View>
        )}

        {viewMode === 'map' ? renderMapView() : renderListView()}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapLegend: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  webMapTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  webMapText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  listHeader: {
    marginBottom: 16,
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  jobsBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  jobsCount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  jobsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  customerDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  customerDetailText: {
    fontSize: 14,
    color: colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.highlight,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
