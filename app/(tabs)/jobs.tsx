
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable, TextInput, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

interface VehicleGlassInfo {
  windshield: {
    size: string;
    tint: string;
    features: string[];
  };
  backGlass: {
    size: string;
    tint: string;
    features: string[];
  };
}

export default function JobsScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'progress' | 'completed'>('all');
  const [vinInput, setVinInput] = useState('');
  const [decodedInfo, setDecodedInfo] = useState<VehicleGlassInfo | null>(null);

  const jobs = [
    {
      id: '1',
      customer: 'John Smith',
      phone: '(555) 123-4567',
      vehicle: '2020 Honda Accord',
      vin: '1HGCV1F30LA123456',
      service: 'Windshield Replacement',
      glassType: 'Windshield',
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
      service: 'Back Glass Replacement',
      glassType: 'Back Glass',
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
      service: 'Windshield Replacement',
      glassType: 'Windshield',
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
      glassType: 'Windshield',
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
    console.log('Decoding VIN for auto glass:', vinInput);
    
    // Simulate VIN decoding with glass-specific information
    const mockGlassInfo: VehicleGlassInfo = {
      windshield: {
        size: '59" x 32"',
        tint: 'Light Green',
        features: ['Rain Sensor', 'Heated', 'Acoustic Interlayer', 'HUD Compatible'],
      },
      backGlass: {
        size: '54" x 28"',
        tint: 'Privacy Dark',
        features: ['Heated', 'Defrost Lines', 'Privacy Tint'],
      },
    };
    
    setDecodedInfo(mockGlassInfo);
    
    Alert.alert(
      'VIN Decoded - Auto Glass Info',
      `Vehicle: 2020 Honda Accord\n\n` +
      `WINDSHIELD:\n` +
      `Size: ${mockGlassInfo.windshield.size}\n` +
      `Tint: ${mockGlassInfo.windshield.tint}\n` +
      `Features: ${mockGlassInfo.windshield.features.join(', ')}\n\n` +
      `BACK GLASS:\n` +
      `Size: ${mockGlassInfo.backGlass.size}\n` +
      `Tint: ${mockGlassInfo.backGlass.tint}\n` +
      `Features: ${mockGlassInfo.backGlass.features.join(', ')}\n\n` +
      `This would integrate with a VIN decoder API in production.`
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

          {/* VIN Decoder Section - Auto Glass Specific */}
          <View style={[commonStyles.card, styles.vinSection]}>
            <View style={styles.vinHeader}>
              <IconSymbol name="barcode.viewfinder" color={colors.primary} size={24} />
              <Text style={styles.vinTitle}>VIN Decoder - Auto Glass</Text>
            </View>
            <Text style={[commonStyles.textSecondary, styles.vinDescription]}>
              Decode VIN to get windshield and back glass specifications
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
              <Text style={styles.buttonText}>Decode Glass Specs</Text>
            </Pressable>

            {/* Decoded Glass Information */}
            {decodedInfo && (
              <View style={styles.decodedInfo}>
                <View style={styles.glassInfoSection}>
                  <View style={styles.glassInfoHeader}>
                    <IconSymbol name="windshield" color={colors.primary} size={20} />
                    <Text style={styles.glassInfoTitle}>Windshield</Text>
                  </View>
                  <View style={styles.glassInfoDetail}>
                    <Text style={styles.glassInfoLabel}>Size:</Text>
                    <Text style={styles.glassInfoValue}>{decodedInfo.windshield.size}</Text>
                  </View>
                  <View style={styles.glassInfoDetail}>
                    <Text style={styles.glassInfoLabel}>Tint:</Text>
                    <Text style={styles.glassInfoValue}>{decodedInfo.windshield.tint}</Text>
                  </View>
                  <View style={styles.featuresContainer}>
                    {decodedInfo.windshield.features.map((feature, index) => (
                      <View key={index} style={styles.featureBadge}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.glassInfoSection}>
                  <View style={styles.glassInfoHeader}>
                    <IconSymbol name="rectangle.fill" color={colors.secondary} size={20} />
                    <Text style={styles.glassInfoTitle}>Back Glass</Text>
                  </View>
                  <View style={styles.glassInfoDetail}>
                    <Text style={styles.glassInfoLabel}>Size:</Text>
                    <Text style={styles.glassInfoValue}>{decodedInfo.backGlass.size}</Text>
                  </View>
                  <View style={styles.glassInfoDetail}>
                    <Text style={styles.glassInfoLabel}>Tint:</Text>
                    <Text style={styles.glassInfoValue}>{decodedInfo.backGlass.tint}</Text>
                  </View>
                  <View style={styles.featuresContainer}>
                    {decodedInfo.backGlass.features.map((feature, index) => (
                      <View key={index} style={styles.featureBadge}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
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
                  <IconSymbol 
                    name={job.glassType === 'Windshield' ? 'windshield' : 'rectangle.fill'} 
                    color={colors.textSecondary} 
                    size={16} 
                  />
                  <Text style={styles.jobDetailText}>{job.service}</Text>
                  <View style={[styles.glassTypeBadge, { 
                    backgroundColor: job.glassType === 'Windshield' ? colors.primary + '20' : colors.secondary + '20' 
                  }]}>
                    <Text style={[styles.glassTypeText, { 
                      color: job.glassType === 'Windshield' ? colors.primary : colors.secondary 
                    }]}>
                      {job.glassType}
                    </Text>
                  </View>
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
  decodedInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 16,
  },
  glassInfoSection: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
  },
  glassInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  glassInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  glassInfoDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  glassInfoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  glassInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  featureBadge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
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
  glassTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  glassTypeText: {
    fontSize: 10,
    fontWeight: '600',
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
