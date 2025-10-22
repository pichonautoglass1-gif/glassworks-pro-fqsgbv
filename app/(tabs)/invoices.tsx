
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoicesScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  const invoices = [
    {
      id: 'INV-001',
      customer: 'John Smith',
      vehicle: '2020 Honda Accord',
      service: 'Windshield Replacement',
      amount: 450.00,
      status: 'Paid',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-002',
      customer: 'Sarah Johnson',
      vehicle: '2019 Toyota Camry',
      service: 'Side Window Repair',
      amount: 275.00,
      status: 'Pending',
      date: '2024-01-16',
      paymentMethod: null,
    },
    {
      id: 'INV-003',
      customer: 'Mike Davis',
      vehicle: '2021 Ford F-150',
      service: 'Rear Window Replacement',
      amount: 525.00,
      status: 'Paid',
      date: '2024-01-14',
      paymentMethod: 'Cash',
    },
    {
      id: 'INV-004',
      customer: 'Emily Wilson',
      vehicle: '2022 Tesla Model 3',
      service: 'Windshield Chip Repair',
      amount: 125.00,
      status: 'Pending',
      date: '2024-01-16',
      paymentMethod: null,
    },
    {
      id: 'INV-005',
      customer: 'Robert Brown',
      vehicle: '2018 Chevrolet Silverado',
      service: 'Windshield Replacement',
      amount: 475.00,
      status: 'Overdue',
      date: '2024-01-10',
      paymentMethod: null,
    },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return invoice.status === 'Pending';
    if (activeTab === 'paid') return invoice.status === 'Paid';
    if (activeTab === 'overdue') return invoice.status === 'Overdue';
    return true;
  });

  const totalRevenue = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === 'Pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return colors.success;
      case 'Pending':
        return colors.warning;
      case 'Overdue':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const handleCreateInvoice = () => {
    console.log('Create new invoice');
    Alert.alert('Create Invoice', 'Invoice creation form would open here');
  };

  const handleSendInvoice = (invoiceId: string) => {
    console.log('Send invoice:', invoiceId);
    Alert.alert('Send Invoice', `Invoice ${invoiceId} would be sent via email/SMS`);
  };

  const handleProcessPayment = (invoiceId: string) => {
    console.log('Process payment:', invoiceId);
    Alert.alert('Process Payment', `Payment processing for ${invoiceId} would integrate with Stripe/Square`);
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={handleCreateInvoice}
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
            title: "Invoices",
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
              <Text style={styles.headerTitle}>Invoices</Text>
              <Pressable
                onPress={handleCreateInvoice}
                style={styles.headerButton}
              >
                <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
              </Pressable>
            </View>
          )}

          {/* Revenue Summary */}
          <View style={styles.summaryContainer}>
            <View style={[commonStyles.card, styles.summaryCard]}>
              <IconSymbol name="dollarsign.circle.fill" color={colors.success} size={32} />
              <Text style={styles.summaryAmount}>${totalRevenue.toFixed(2)}</Text>
              <Text style={commonStyles.textSecondary}>Total Revenue</Text>
            </View>
            <View style={[commonStyles.card, styles.summaryCard]}>
              <IconSymbol name="clock.fill" color={colors.warning} size={32} />
              <Text style={styles.summaryAmount}>${pendingAmount.toFixed(2)}</Text>
              <Text style={commonStyles.textSecondary}>Pending</Text>
            </View>
            <View style={[commonStyles.card, styles.summaryCard]}>
              <IconSymbol name="exclamationmark.triangle.fill" color={colors.error} size={32} />
              <Text style={styles.summaryAmount}>${overdueAmount.toFixed(2)}</Text>
              <Text style={commonStyles.textSecondary}>Overdue</Text>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'all' && styles.tabActive]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
                All
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
              onPress={() => setActiveTab('pending')}
            >
              <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
                Pending
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'paid' && styles.tabActive]}
              onPress={() => setActiveTab('paid')}
            >
              <Text style={[styles.tabText, activeTab === 'paid' && styles.tabTextActive]}>
                Paid
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'overdue' && styles.tabActive]}
              onPress={() => setActiveTab('overdue')}
            >
              <Text style={[styles.tabText, activeTab === 'overdue' && styles.tabTextActive]}>
                Overdue
              </Text>
            </Pressable>
          </View>

          {/* Invoices List */}
          <View style={commonStyles.section}>
            {filteredInvoices.map((invoice) => (
              <View key={invoice.id} style={commonStyles.card}>
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.invoiceId}>{invoice.id}</Text>
                    <Text style={styles.invoiceCustomer}>{invoice.customer}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
                      {invoice.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.invoiceDetail}>
                  <IconSymbol name="car.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.invoiceDetailText}>{invoice.vehicle}</Text>
                </View>

                <View style={styles.invoiceDetail}>
                  <IconSymbol name="wrench.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.invoiceDetailText}>{invoice.service}</Text>
                </View>

                <View style={styles.invoiceDetail}>
                  <IconSymbol name="calendar" color={colors.textSecondary} size={16} />
                  <Text style={styles.invoiceDetailText}>{invoice.date}</Text>
                </View>

                {invoice.paymentMethod && (
                  <View style={styles.invoiceDetail}>
                    <IconSymbol name="creditcard.fill" color={colors.textSecondary} size={16} />
                    <Text style={styles.invoiceDetailText}>{invoice.paymentMethod}</Text>
                  </View>
                )}

                <View style={styles.amountContainer}>
                  <Text style={styles.amountLabel}>Total Amount</Text>
                  <Text style={styles.amountValue}>${invoice.amount.toFixed(2)}</Text>
                </View>

                {invoice.status !== 'Paid' && (
                  <View style={styles.actionButtons}>
                    <Pressable 
                      style={[buttonStyles.outline, styles.actionButton]}
                      onPress={() => handleSendInvoice(invoice.id)}
                    >
                      <IconSymbol name="paperplane.fill" color={colors.primary} size={16} />
                      <Text style={[styles.actionButtonText, { color: colors.primary }]}>Send</Text>
                    </Pressable>
                    <Pressable 
                      style={[buttonStyles.primary, styles.actionButton]}
                      onPress={() => handleProcessPayment(invoice.id)}
                    >
                      <IconSymbol name="dollarsign.circle.fill" color={colors.card} size={16} />
                      <Text style={[styles.actionButtonText, { color: colors.card }]}>Pay</Text>
                    </Pressable>
                  </View>
                )}
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
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
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
  invoiceId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  invoiceCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
  invoiceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  invoiceDetailText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
