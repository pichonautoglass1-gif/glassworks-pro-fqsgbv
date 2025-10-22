
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const stats = [
    { label: 'Jobs Today', value: '8', icon: 'calendar', color: colors.primary },
    { label: 'Pending', value: '3', icon: 'clock', color: colors.warning },
    { label: 'Completed', value: '24', icon: 'checkmark.circle', color: colors.success },
    { label: 'Revenue', value: '$4,250', icon: 'dollarsign.circle', color: colors.secondary },
  ];

  const recentJobs = [
    { id: '1', customer: 'John Smith', vehicle: '2020 Honda Accord', status: 'In Progress', time: '10:30 AM' },
    { id: '2', customer: 'Sarah Johnson', vehicle: '2019 Toyota Camry', status: 'Scheduled', time: '2:00 PM' },
    { id: '3', customer: 'Mike Davis', vehicle: '2021 Ford F-150', status: 'Completed', time: '8:00 AM' },
  ];

  const technicians = [
    { id: '1', name: 'Alex Martinez', status: 'Active', jobs: 3 },
    { id: '2', name: 'Chris Lee', status: 'Active', jobs: 2 },
    { id: '3', name: 'Jordan Taylor', status: 'Break', jobs: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
      case 'Active':
        return colors.primary;
      case 'Scheduled':
        return colors.warning;
      case 'Completed':
        return colors.success;
      case 'Break':
        return colors.textSecondary;
      default:
        return colors.text;
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Notifications pressed')}
      style={styles.headerButton}
    >
      <IconSymbol name="bell.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "GlassWorks Pro",
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
              <Text style={styles.headerTitle}>GlassWorks Pro</Text>
              <Pressable
                onPress={() => console.log('Notifications pressed')}
                style={styles.headerButton}
              >
                <IconSymbol name="bell.fill" color={colors.primary} size={24} />
              </Pressable>
            </View>
          )}

          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.subGreeting}>Here&apos;s what&apos;s happening today</Text>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <IconSymbol name={stat.icon as any} color={stat.color} size={24} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Recent Jobs */}
          <View style={commonStyles.section}>
            <View style={commonStyles.row}>
              <Text style={commonStyles.subtitle}>Recent Jobs</Text>
              <Pressable onPress={() => console.log('View all jobs')}>
                <Text style={[styles.linkText, { color: colors.primary }]}>View All</Text>
              </Pressable>
            </View>
            {recentJobs.map((job) => (
              <View key={job.id} style={commonStyles.card}>
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobCustomer}>{job.customer}</Text>
                    <Text style={commonStyles.textSecondary}>{job.vehicle}</Text>
                  </View>
                  <Text style={commonStyles.textSecondary}>{job.time}</Text>
                </View>
                <View style={styles.statusBadgeContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
                      {job.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Technician Status */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Technician Status</Text>
            {technicians.map((tech) => (
              <View key={tech.id} style={commonStyles.card}>
                <View style={commonStyles.row}>
                  <View style={styles.techInfo}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(tech.status) }]} />
                    <View>
                      <Text style={styles.techName}>{tech.name}</Text>
                      <Text style={commonStyles.textSecondary}>{tech.status}</Text>
                    </View>
                  </View>
                  <View style={styles.jobsCount}>
                    <Text style={styles.jobsCountText}>{tech.jobs}</Text>
                    <Text style={commonStyles.textSecondary}>Jobs</Text>
                  </View>
                </View>
              </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 24,
  },
  statCard: {
    width: '50%',
    padding: 6,
  },
  statCardInner: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  jobCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  statusBadgeContainer: {
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  techInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  techName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  jobsCount: {
    alignItems: 'center',
  },
  jobsCountText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
});
