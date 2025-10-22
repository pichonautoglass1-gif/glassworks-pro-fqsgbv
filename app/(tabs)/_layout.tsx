
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Dashboard',
    },
    {
      name: 'jobs',
      route: '/(tabs)/jobs',
      icon: 'wrench.and.screwdriver.fill',
      label: 'Jobs',
    },
    {
      name: 'customers',
      route: '/(tabs)/customers',
      icon: 'person.2.fill',
      label: 'Customers',
    },
    {
      name: 'inventory',
      route: '/(tabs)/inventory',
      icon: 'square.stack.3d.up.fill',
      label: 'Inventory',
    },
    {
      name: 'marketing',
      route: '/(tabs)/marketing',
      icon: 'megaphone.fill',
      label: 'Marketing',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Dashboard</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="jobs">
          <Icon sf="wrench.and.screwdriver.fill" drawable="ic_jobs" />
          <Label>Jobs</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="customers">
          <Icon sf="person.2.fill" drawable="ic_customers" />
          <Label>Customers</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="inventory">
          <Icon sf="square.stack.3d.up.fill" drawable="ic_inventory" />
          <Label>Inventory</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="marketing">
          <Icon sf="megaphone.fill" drawable="ic_marketing" />
          <Label>Marketing</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="jobs" />
        <Stack.Screen name="customers" />
        <Stack.Screen name="inventory" />
        <Stack.Screen name="marketing" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
