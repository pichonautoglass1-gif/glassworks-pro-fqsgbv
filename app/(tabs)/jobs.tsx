
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable, TextInput, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobsScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'progress' | 'completed'>('all');
  const [vinInput, setVinInput] = useState('');

  const jobs = [
    {
      id: '1',
      customer: 'John Smith',
      phone: '(555) 123-4567',
      vehicle: '2020 Honda Accord',
      vin: '1HGCV1F30LA123456',
      service: 'Windshield Replacement',
      status: 'In Progress',
      technician: 'Alex Martinez',
      scheduledTime: '10:30 AM',
      location: '123 Main St, City, ST',
      hasPhotos: true,
    },
    {
      id: '2',
      customer: 'Sarah Johnson',
      phone: '(555) 234-5678',
      vehicle: '2019 Toyota Camry',
      vin: '4T1BF1FK5KU123456',
      service: 'Side Window Repair',
      status: 'Scheduled',
      technician: 'Chris Lee',
      scheduledTime: '2:00 PM',
      location: '456 Oak Ave, City, ST',
      hasPhotos: false,
    },
    {
      id: '3',
      customer: 'Mike Davis',
      phone: '(555) 345-6789',
      vehicle: '2021 Ford F-150',
      vin: '1FTFW1E50MFA12345',
      service: 'Rear Window Replacement',
      status: 'Completed',
      technician: 'Alex Martinez',
      scheduledTime: '8:00 AM',
      location: '789 Pine Rd, City, ST',
      hasPhotos: true,
    },
    {
      id: '4',
      customer: 'Emily Wilson',
      phone: '(555) 456-7890',
      vehicle: '2022 Tesla Model 3',
      vin: '5YJ3E1EA0NF123456',
      service: 'Windshield Chip Repair',
      status: 'Scheduled',
      technician: 'Jordan Taylor',
      scheduledTime: '4:30 PM',
      location: '321 Elm St, City, ST',
      hasPhotos: false,
    },
  ];

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'all') return true;
    if (activeTab === 'scheduled') return job.status === 'Scheduled';
    if (activeTab === 'progress') return job.status === 'In Progress';
    if (activeTab === 'completed') return job.status === 'Completed';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return colors.primary;
      case 'Scheduled':
        return colors.warning;
      case 'Completed':
        return colors.success;
      default:
        return colors.text;
    }
  };

  const handleDecodeVIN = () => {
    if (vinInput.length < 17) {
      Alert.alert('Invalid VIN', 'VIN must be 17 characters long');
      return;
    }
    console.log('Decoding VIN:', vinInput);
    Alert.alert(
      'VIN Decoded',
      `Vehicle Information:\n\nMake: Honda\nModel: Accord\nYear: 2020\nBody Style: Sedan\n\nThis would integrate with a VIN decoder API in production.`
    );
  };

  const handleCreateJob = () => {
    console.log('Create new job');
    Alert.alert('Create Job', 'Job creation form would open here');
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={handleCreateJob}
      style={styles.headerButton}
    >
      <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Job Management",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={commonStyles.container} edges={['top']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {Platform.OS !== 'ios' && (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Job Management</Text>
              <Pressable
                onPress={handleCreateJob}
                style={styles.headerButton}
              >
                <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
              </Pressable>
            </View>
          )}

          {/* VIN Decoder Section */}
          <View style={[commonStyles.card, styles.vinSection]}>
            <View style={styles.vinHeader}>
              <IconSymbol name="barcode.viewfinder" color={colors.primary} size={24} />
              <Text style={styles.vinTitle}>VIN Decoder</Text>
            </View>
            <Text style={[commonStyles.textSecondary, styles.vinDescription]}>
              Scan or enter VIN to auto-fill vehicle details
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Enter 17-digit VIN"
              placeholderTextColor={colors.textSecondary}
              value={vinInput}
              onChangeText={setVinInput}
              maxLength={17}
              autoCapitalize="characters"
            />
            <Pressable 
              style={[buttonStyles.primary, vinInput.length !== 17 && styles.buttonDisabled]}
              onPress={handleDecodeVIN}
              disabled={vinInput.length !== 17}
            >
              <Text style={styles.buttonText}>Decode VIN</Text>
            </Pressable>
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'all' && styles.tabActive]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
                All ({jobs.length})
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'scheduled' && styles.tabActive]}
              onPress={() => setActiveTab('scheduled')}
            >
              <Text style={[styles.tabText, activeTab === 'scheduled' && styles.tabTextActive]}>
                Scheduled
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'progress' && styles.tabActive]}
              onPress={() => setActiveTab('progress')}
            >
              <Text style={[styles.tabText, activeTab === 'progress' && styles.tabTextActive]}>
                In Progress
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
                Completed
              </Text>
            </Pressable>
          </View>

          {/* Jobs List */}
          <View style={commonStyles.section}>
            {filteredJobs.map((job) => (
              <Pressable 
                key={job.id} 
                style={commonStyles.card}
                onPress={() => console.log('View job details:', job.id)}
              >
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobCustomer}>{job.customer}</Text>
                    <Text style={commonStyles.textSecondary}>{job.phone}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
                      {job.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.jobDetail}>
                  <IconSymbol name="car.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.jobDetailText}>{job.vehicle}</Text>
                </View>

                <View style={styles.jobDetail}>
                  <IconSymbol name="wrench.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.jobDetailText}>{job.service}</Text>
                </View>

                <View style={styles.jobDetail}>
                  <IconSymbol name="person.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.jobDetailText}>{job.technician}</Text>
                </View>

                <View style={styles.jobDetail}>
                  <IconSymbol name="clock.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.jobDetailText}>{job.scheduledTime}</Text>
                </View>

                <View style={styles.jobDetail}>
                  <IconSymbol name="location.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.jobDetailText}>{job.location}</Text>
                </View>

                {job.hasPhotos && (
                  <View style={styles.photoIndicator}>
                    <IconSymbol name="camera.fill" color={colors.success} size={16} />
                    <Text style={[styles.photoText, { color: colors.success }]}>
                      Photos Uploaded
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </ScrollView>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerButton: {
    padding: 8,
  },
  vinSection: {
    marginBottom: 16,
  },
  vinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  vinTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  vinDescription: {
    marginBottom: 12,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.card,
  },
  jobCustomer: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  jobDetailText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  photoIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  photoText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
