
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const companyInfo = {
    name: 'GlassWorks Auto Service',
    email: 'contact@glassworks.com',
    phone: '(555) 123-4567',
    address: '123 Business Park Dr, City, ST 12345',
  };

  const menuItems = [
    {
      icon: 'person.circle.fill',
      title: 'Account Settings',
      subtitle: 'Manage your profile and preferences',
      onPress: () => Alert.alert('Account Settings', 'Account settings would open here'),
    },
    {
      icon: 'bell.fill',
      title: 'Notifications',
      subtitle: 'Configure alerts and reminders',
      onPress: () => Alert.alert('Notifications', 'Notification settings would open here'),
    },
    {
      icon: 'person.2.fill',
      title: 'Team Management',
      subtitle: 'Add and manage technicians',
      onPress: () => Alert.alert('Team Management', 'Team management would open here'),
    },
    {
      icon: 'gearshape.fill',
      title: 'Business Settings',
      subtitle: 'Configure business details',
      onPress: () => Alert.alert('Business Settings', 'Business settings would open here'),
    },
    {
      icon: 'creditcard.fill',
      title: 'Payment Methods',
      subtitle: 'Manage payment integrations',
      onPress: () => Alert.alert('Payment Methods', 'Payment methods would open here'),
    },
    {
      icon: 'chart.bar.fill',
      title: 'Reports & Analytics',
      subtitle: 'View business insights',
      onPress: () => Alert.alert('Reports', 'Reports and analytics would open here'),
    },
    {
      icon: 'questionmark.circle.fill',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      onPress: () => Alert.alert('Help & Support', 'Help center would open here'),
    },
    {
      icon: 'info.circle.fill',
      title: 'About',
      subtitle: 'App version and information',
      onPress: () => Alert.alert('About', 'GlassWorks Pro v1.0.0\n\nBuilt for auto glass professionals'),
    },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Profile",
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
              <Text style={styles.headerTitle}>Profile</Text>
            </View>
          )}

          {/* Company Info Card */}
          <View style={[commonStyles.card, styles.companyCard]}>
            <View style={styles.companyIcon}>
              <IconSymbol name="building.2.fill" color={colors.primary} size={32} />
            </View>
            <Text style={styles.companyName}>{companyInfo.name}</Text>
            
            <View style={styles.companyDetail}>
              <IconSymbol name="envelope.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.companyDetailText}>{companyInfo.email}</Text>
            </View>
            
            <View style={styles.companyDetail}>
              <IconSymbol name="phone.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.companyDetailText}>{companyInfo.phone}</Text>
            </View>
            
            <View style={styles.companyDetail}>
              <IconSymbol name="location.fill" color={colors.textSecondary} size={16} />
              <Text style={styles.companyDetailText}>{companyInfo.address}</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={commonStyles.section}>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={commonStyles.card}
                onPress={item.onPress}
              >
                <View style={styles.menuItem}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.primary + '20' }]}>
                    <IconSymbol name={item.icon as any} color={colors.primary} size={24} />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={commonStyles.textSecondary}>{item.subtitle}</Text>
                  </View>
                  <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
                </View>
              </Pressable>
            ))}
          </View>

          {/* Logout Button */}
          <Pressable 
            style={styles.logoutButton}
            onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
            ])}
          >
            <IconSymbol name="arrow.right.square.fill" color={colors.error} size={20} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
          </Pressable>

          <Text style={styles.version}>Version 1.0.0</Text>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  companyCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  companyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  companyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    width: '100%',
  },
  companyDetailText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
});
