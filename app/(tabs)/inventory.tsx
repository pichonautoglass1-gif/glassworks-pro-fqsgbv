
import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable, TextInput, Alert, Modal } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

interface InventoryItem {
  id: string;
  glassType: 'Windshield' | 'Back Glass';
  manufacturer: string;
  partNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  yearRange: string;
  quantity: number;
  minQuantity: number;
  location: string;
  features: string[];
  cost: number;
}

export default function InventoryScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'windshield' | 'backglass' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      glassType: 'Windshield',
      manufacturer: 'Pilkington',
      partNumber: 'FW03456',
      vehicleMake: 'Honda',
      vehicleModel: 'Accord',
      yearRange: '2018-2023',
      quantity: 8,
      minQuantity: 3,
      location: 'Shelf A-12',
      features: ['Rain Sensor', 'Heated', 'Acoustic'],
      cost: 285.00,
    },
    {
      id: '2',
      glassType: 'Back Glass',
      manufacturer: 'Safelite',
      partNumber: 'BG02134',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      yearRange: '2019-2024',
      quantity: 5,
      minQuantity: 2,
      location: 'Shelf B-08',
      features: ['Heated', 'Defrost'],
      cost: 195.00,
    },
    {
      id: '3',
      glassType: 'Windshield',
      manufacturer: 'PPG',
      partNumber: 'FW04789',
      vehicleMake: 'Ford',
      vehicleModel: 'F-150',
      yearRange: '2020-2024',
      quantity: 2,
      minQuantity: 3,
      location: 'Shelf A-15',
      features: ['Rain Sensor', 'HUD Compatible'],
      cost: 425.00,
    },
    {
      id: '4',
      glassType: 'Windshield',
      manufacturer: 'Pilkington',
      partNumber: 'FW05123',
      vehicleMake: 'Tesla',
      vehicleModel: 'Model 3',
      yearRange: '2021-2024',
      quantity: 4,
      minQuantity: 2,
      location: 'Shelf A-20',
      features: ['Rain Sensor', 'Heated', 'Acoustic', 'HUD Compatible'],
      cost: 650.00,
    },
    {
      id: '5',
      glassType: 'Back Glass',
      manufacturer: 'Safelite',
      partNumber: 'BG03456',
      vehicleMake: 'Chevrolet',
      vehicleModel: 'Silverado',
      yearRange: '2019-2023',
      quantity: 6,
      minQuantity: 3,
      location: 'Shelf B-12',
      features: ['Heated', 'Privacy Tint'],
      cost: 225.00,
    },
    {
      id: '6',
      glassType: 'Windshield',
      manufacturer: 'PPG',
      partNumber: 'FW06789',
      vehicleMake: 'Nissan',
      vehicleModel: 'Altima',
      yearRange: '2020-2024',
      quantity: 1,
      minQuantity: 2,
      location: 'Shelf A-18',
      features: ['Rain Sensor', 'Acoustic'],
      cost: 295.00,
    },
    {
      id: '7',
      glassType: 'Back Glass',
      manufacturer: 'Pilkington',
      partNumber: 'BG04567',
      vehicleMake: 'Honda',
      vehicleModel: 'CR-V',
      yearRange: '2018-2023',
      quantity: 7,
      minQuantity: 3,
      location: 'Shelf B-15',
      features: ['Heated', 'Defrost', 'Privacy Tint'],
      cost: 215.00,
    },
  ]);

  const filteredInventory = inventory.filter(item => {
    // Filter by tab
    let tabMatch = true;
    if (activeTab === 'windshield') tabMatch = item.glassType === 'Windshield';
    if (activeTab === 'backglass') tabMatch = item.glassType === 'Back Glass';
    if (activeTab === 'low') tabMatch = item.quantity <= item.minQuantity;

    // Filter by search query
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = searchQuery === '' || 
      item.vehicleMake.toLowerCase().includes(searchLower) ||
      item.vehicleModel.toLowerCase().includes(searchLower) ||
      item.partNumber.toLowerCase().includes(searchLower) ||
      item.manufacturer.toLowerCase().includes(searchLower);

    return tabMatch && searchMatch;
  });

  const lowStockCount = inventory.filter(item => item.quantity <= item.minQuantity).length;
  const windshieldCount = inventory.filter(item => item.glassType === 'Windshield').length;
  const backGlassCount = inventory.filter(item => item.glassType === 'Back Glass').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.cost * item.quantity), 0);

  const handleUpdateQuantity = (itemId: string, change: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        console.log(`Updated ${item.partNumber} quantity: ${item.quantity} -> ${newQuantity}`);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    console.log('Add new inventory item');
    setShowAddModal(true);
  };

  const handleViewDetails = (item: InventoryItem) => {
    console.log('View item details:', item.id);
    setSelectedItem(item);
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={handleAddItem}
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
            title: "Inventory",
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
              <Text style={styles.headerTitle}>Inventory</Text>
              <Pressable
                onPress={handleAddItem}
                style={styles.headerButton}
              >
                <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
              </Pressable>
            </View>
          )}

          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={[commonStyles.card, styles.summaryCard]}>
              <IconSymbol name="square.stack.3d.up.fill" color={colors.primary} size={28} />
              <Text style={styles.summaryValue}>{inventory.length}</Text>
              <Text style={commonStyles.textSecondary}>Total Items</Text>
            </View>
            <View style={[commonStyles.card, styles.summaryCard]}>
              <IconSymbol name="exclamationmark.triangle.fill" color={colors.error} size={28} />
              <Text style={styles.summaryValue}>{lowStockCount}</Text>
              <Text style={commonStyles.textSecondary}>Low Stock</Text>
            </View>
            <View style={[commonStyles.card, styles.summaryCard]}>
              <IconSymbol name="dollarsign.circle.fill" color={colors.success} size={28} />
              <Text style={styles.summaryValue}>${totalValue.toLocaleString()}</Text>
              <Text style={commonStyles.textSecondary}>Total Value</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by make, model, or part number..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <Pressable onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={20} />
              </Pressable>
            )}
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'all' && styles.tabActive]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
                All ({inventory.length})
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'windshield' && styles.tabActive]}
              onPress={() => setActiveTab('windshield')}
            >
              <Text style={[styles.tabText, activeTab === 'windshield' && styles.tabTextActive]}>
                Windshield ({windshieldCount})
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'backglass' && styles.tabActive]}
              onPress={() => setActiveTab('backglass')}
            >
              <Text style={[styles.tabText, activeTab === 'backglass' && styles.tabTextActive]}>
                Back Glass ({backGlassCount})
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'low' && styles.tabActive]}
              onPress={() => setActiveTab('low')}
            >
              <Text style={[styles.tabText, activeTab === 'low' && styles.tabTextActive]}>
                Low Stock
              </Text>
            </Pressable>
          </View>

          {/* Inventory List */}
          <View style={commonStyles.section}>
            {filteredInventory.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="tray.fill" color={colors.textSecondary} size={48} />
                <Text style={styles.emptyText}>No items found</Text>
                <Text style={commonStyles.textSecondary}>
                  {searchQuery ? 'Try a different search term' : 'Add your first inventory item'}
                </Text>
              </View>
            ) : (
              filteredInventory.map((item) => (
                <Pressable 
                  key={item.id} 
                  style={commonStyles.card}
                  onPress={() => handleViewDetails(item)}
                >
                  <View style={commonStyles.row}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>
                          {item.vehicleMake} {item.vehicleModel}
                        </Text>
                        {item.quantity <= item.minQuantity && (
                          <View style={styles.lowStockBadge}>
                            <IconSymbol name="exclamationmark.triangle.fill" color={colors.error} size={12} />
                            <Text style={styles.lowStockText}>Low</Text>
                          </View>
                        )}
                      </View>
                      <Text style={commonStyles.textSecondary}>{item.yearRange}</Text>
                    </View>
                    <View style={[styles.glassTypeBadge, { 
                      backgroundColor: item.glassType === 'Windshield' ? colors.primary + '20' : colors.secondary + '20' 
                    }]}>
                      <Text style={[styles.glassTypeText, { 
                        color: item.glassType === 'Windshield' ? colors.primary : colors.secondary 
                      }]}>
                        {item.glassType}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.itemDetail}>
                    <IconSymbol name="number" color={colors.textSecondary} size={16} />
                    <Text style={styles.itemDetailText}>Part #: {item.partNumber}</Text>
                  </View>

                  <View style={styles.itemDetail}>
                    <IconSymbol name="building.2.fill" color={colors.textSecondary} size={16} />
                    <Text style={styles.itemDetailText}>{item.manufacturer}</Text>
                  </View>

                  <View style={styles.itemDetail}>
                    <IconSymbol name="location.fill" color={colors.textSecondary} size={16} />
                    <Text style={styles.itemDetailText}>{item.location}</Text>
                  </View>

                  {item.features.length > 0 && (
                    <View style={styles.featuresContainer}>
                      {item.features.map((feature, index) => (
                        <View key={index} style={styles.featureBadge}>
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  <View style={styles.quantitySection}>
                    <View>
                      <Text style={styles.quantityLabel}>In Stock</Text>
                      <Text style={styles.quantityValue}>{item.quantity} units</Text>
                      <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                        Min: {item.minQuantity} units
                      </Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <Pressable 
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, -1)}
                      >
                        <IconSymbol name="minus" color={colors.error} size={20} />
                      </Pressable>
                      <Pressable 
                        style={[styles.quantityButton, styles.quantityButtonPrimary]}
                        onPress={() => handleUpdateQuantity(item.id, 1)}
                      >
                        <IconSymbol name="plus" color={colors.card} size={20} />
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.costSection}>
                    <Text style={styles.costLabel}>Unit Cost: ${item.cost.toFixed(2)}</Text>
                    <Text style={styles.totalCost}>
                      Total: ${(item.cost * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddModal(false)}
      >
        <SafeAreaView style={commonStyles.container}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowAddModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Add Inventory Item</Text>
            <Pressable onPress={() => {
              console.log('Save new item');
              Alert.alert('Success', 'Item would be added to inventory');
              setShowAddModal(false);
            }}>
              <Text style={styles.modalSave}>Save</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={commonStyles.subtitle}>Glass Type</Text>
            <View style={styles.glassTypeSelector}>
              <Pressable style={[buttonStyles.outline, { flex: 1 }]}>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>Windshield</Text>
              </Pressable>
              <Pressable style={[buttonStyles.outline, { flex: 1 }]}>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>Back Glass</Text>
              </Pressable>
            </View>
            <Text style={[commonStyles.textSecondary, { marginTop: 16 }]}>
              Form fields for manufacturer, part number, vehicle details, quantity, location, features, and cost would appear here.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
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
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.card,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  lowStockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.error + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lowStockText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.error,
  },
  glassTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  glassTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  itemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  itemDetailText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
    marginBottom: 12,
  },
  featureBadge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityButtonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  costSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  costLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  totalCost: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  modalCancel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  modalSave: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  glassTypeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
});
