
import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

interface MarketingTip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  actionItems: string[];
  estimatedImpact: string;
}

export default function MarketingScreen() {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const marketingTips: MarketingTip[] = [
    {
      id: '1',
      category: 'Local SEO',
      title: 'Optimize Google Business Profile',
      description: 'Your Google Business Profile is the #1 way customers find local auto glass services. A well-optimized profile can increase visibility by 70%.',
      icon: 'magnifyingglass',
      color: colors.primary,
      actionItems: [
        'Add high-quality photos of completed jobs (before/after)',
        'Respond to all reviews within 24 hours',
        'Post weekly updates about services and promotions',
        'Ensure NAP (Name, Address, Phone) is consistent everywhere',
        'Add service areas and business hours',
        'Use relevant keywords in business description',
      ],
      estimatedImpact: 'High - Can increase local search visibility by 50-70%',
    },
    {
      id: '2',
      category: 'Partnerships',
      title: 'Build Strategic Partnerships',
      description: 'Partner with complementary businesses to create a steady stream of referrals and expand your customer base.',
      icon: 'person.2.fill',
      color: colors.secondary,
      actionItems: [
        'Connect with car dealerships for referrals',
        'Partner with auto body shops and mechanics',
        'Reach out to insurance agents and adjusters',
        'Join local business networking groups (BNI, Chamber)',
        'Offer referral commissions (10-15% typical)',
        'Create co-marketing materials with partners',
      ],
      estimatedImpact: 'High - Partnerships can generate 30-40% of new business',
    },
    {
      id: '3',
      category: 'Digital Advertising',
      title: 'Run Targeted Facebook & Google Ads',
      description: 'Paid advertising can quickly generate leads when done correctly. Focus on local targeting and mobile users.',
      icon: 'megaphone.fill',
      color: colors.accent,
      actionItems: [
        'Target 10-mile radius around your service area',
        'Use "mobile windshield repair near me" keywords',
        'Create ads for insurance claim assistance',
        'Set up retargeting for website visitors',
        'Budget $500-1000/month for consistent results',
        'Track phone calls and form submissions',
      ],
      estimatedImpact: 'Medium-High - ROI typically 3:1 to 5:1 when optimized',
    },
    {
      id: '4',
      category: 'Customer Retention',
      title: 'Implement Referral Program',
      description: 'Your existing customers are your best marketers. Incentivize them to spread the word about your services.',
      icon: 'gift.fill',
      color: colors.skyBlue,
      actionItems: [
        'Offer $25-50 credit for each successful referral',
        'Create referral cards to hand out after service',
        'Send automated referral requests via SMS/email',
        'Track referrals in your CRM system',
        'Reward top referrers with bonus incentives',
        'Make it easy to refer (simple online form)',
      ],
      estimatedImpact: 'Medium - Can generate 15-25% of new business',
    },
    {
      id: '5',
      category: 'Social Media',
      title: 'Showcase Your Work on Social Media',
      description: 'Visual content performs exceptionally well for auto glass services. Show your expertise and build trust.',
      icon: 'camera.fill',
      color: colors.terracotta,
      actionItems: [
        'Post before/after photos 3-4 times per week',
        'Create short video clips of installations',
        'Share customer testimonials and reviews',
        'Use local hashtags (#PhoenixAutoGlass)',
        'Go live during interesting jobs',
        'Engage with comments within 1 hour',
      ],
      estimatedImpact: 'Medium - Builds brand awareness and trust',
    },
    {
      id: '6',
      category: 'Fleet Services',
      title: 'Target Commercial Fleet Accounts',
      description: 'Fleet accounts provide consistent, high-volume business with predictable revenue streams.',
      icon: 'car.2.fill',
      color: colors.sageGreen,
      actionItems: [
        'Identify local businesses with 5+ vehicles',
        'Offer volume discounts (10-20% for fleets)',
        'Provide priority scheduling for fleet customers',
        'Create maintenance agreements with monthly billing',
        'Attend local business expos and trade shows',
        'Develop fleet-specific marketing materials',
      ],
      estimatedImpact: 'High - One fleet account = 50-100 individual customers',
    },
    {
      id: '7',
      category: 'Online Reviews',
      title: 'Build a 5-Star Reputation',
      description: '90% of customers read reviews before choosing a service. More reviews = more trust = more leads.',
      icon: 'star.fill',
      color: colors.warning,
      actionItems: [
        'Ask for reviews immediately after service',
        'Send automated review requests via SMS',
        'Make it easy (direct links to Google/Yelp)',
        'Respond to ALL reviews (positive and negative)',
        'Aim for 50+ reviews on Google',
        'Display reviews prominently on website',
      ],
      estimatedImpact: 'High - Can increase conversion rates by 30-50%',
    },
    {
      id: '8',
      category: 'Insurance Claims',
      title: 'Simplify Insurance Claims Process',
      description: 'Make it easy for customers to use insurance by handling the entire claims process for them.',
      icon: 'doc.text.fill',
      color: colors.primary,
      actionItems: [
        'Advertise "We handle all insurance claims"',
        'Build relationships with insurance adjusters',
        'Offer direct billing to insurance companies',
        'Create simple claim submission process',
        'Educate customers about zero-deductible options',
        'Follow up on claims within 24 hours',
      ],
      estimatedImpact: 'High - 70% of windshield replacements use insurance',
    },
    {
      id: '9',
      category: 'Mobile Service',
      title: 'Promote Mobile Convenience',
      description: 'Mobile service is a major differentiator. Emphasize the convenience factor in all marketing.',
      icon: 'location.fill',
      color: colors.secondary,
      actionItems: [
        'Highlight "We come to you" in all ads',
        'Offer service at home, work, or anywhere',
        'Create service area map on website',
        'Use vehicle wraps for mobile advertising',
        'Offer same-day and emergency service',
        'Show real-time technician tracking',
      ],
      estimatedImpact: 'High - Mobile service commands 20-30% premium pricing',
    },
    {
      id: '10',
      category: 'Seasonal Campaigns',
      title: 'Run Seasonal Promotions',
      description: 'Capitalize on seasonal trends and weather patterns to drive business during slower periods.',
      icon: 'sun.max.fill',
      color: colors.accent,
      actionItems: [
        'Spring: "Crack repair before summer heat"',
        'Summer: "Beat the heat with AC-friendly service"',
        'Fall: "Prepare for winter weather"',
        'Winter: "Emergency storm damage service"',
        'Offer seasonal discounts (10-15% off)',
        'Create urgency with limited-time offers',
      ],
      estimatedImpact: 'Medium - Can smooth out seasonal revenue fluctuations',
    },
  ];

  const quickWins = [
    {
      title: 'Claim Your Google Business Profile',
      time: '30 minutes',
      impact: 'High',
    },
    {
      title: 'Set Up Automated Review Requests',
      time: '1 hour',
      impact: 'High',
    },
    {
      title: 'Create Referral Program',
      time: '2 hours',
      impact: 'Medium',
    },
    {
      title: 'Design Vehicle Wrap',
      time: '1 week',
      impact: 'High',
    },
  ];

  const toggleTip = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Marketing",
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
              <Text style={styles.headerTitle}>Marketing</Text>
            </View>
          )}

          {/* Hero Section */}
          <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
            <IconSymbol name="chart.line.uptrend.xyaxis" color="#FFFFFF" size={40} />
            <Text style={styles.heroTitle}>Grow Your Auto Glass Business</Text>
            <Text style={styles.heroSubtitle}>
              Proven strategies to generate more leads and increase revenue
            </Text>
          </View>

          {/* Quick Wins Section */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>🚀 Quick Wins</Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 12 }]}>
              Start with these high-impact, easy-to-implement strategies
            </Text>
            {quickWins.map((win, index) => (
              <View key={index} style={commonStyles.card}>
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.quickWinTitle}>{win.title}</Text>
                    <Text style={commonStyles.textSecondary}>Time: {win.time}</Text>
                  </View>
                  <View style={[
                    styles.impactBadge,
                    { backgroundColor: win.impact === 'High' ? colors.success + '20' : colors.warning + '20' }
                  ]}>
                    <Text style={[
                      styles.impactText,
                      { color: win.impact === 'High' ? colors.success : colors.warning }
                    ]}>
                      {win.impact} Impact
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Marketing Tips */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>💡 Marketing Strategies</Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 12 }]}>
              Tap any strategy to see detailed action items
            </Text>
            {marketingTips.map((tip) => (
              <Pressable
                key={tip.id}
                style={commonStyles.card}
                onPress={() => toggleTip(tip.id)}
              >
                <View style={styles.tipHeader}>
                  <View style={[styles.tipIcon, { backgroundColor: tip.color + '20' }]}>
                    <IconSymbol name={tip.icon as any} color={tip.color} size={24} />
                  </View>
                  <View style={styles.tipHeaderContent}>
                    <Text style={styles.tipCategory}>{tip.category}</Text>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                  </View>
                  <IconSymbol 
                    name={expandedTip === tip.id ? "chevron.up" : "chevron.down"} 
                    color={colors.textSecondary} 
                    size={20} 
                  />
                </View>

                {expandedTip === tip.id && (
                  <View style={styles.tipContent}>
                    <View style={commonStyles.divider} />
                    <Text style={styles.tipDescription}>{tip.description}</Text>
                    
                    <Text style={styles.actionItemsTitle}>Action Items:</Text>
                    {tip.actionItems.map((item, index) => (
                      <View key={index} style={styles.actionItem}>
                        <Text style={styles.actionItemBullet}>•</Text>
                        <Text style={styles.actionItemText}>{item}</Text>
                      </View>
                    ))}

                    <View style={[styles.impactCard, { backgroundColor: tip.color + '10' }]}>
                      <IconSymbol name="chart.bar.fill" color={tip.color} size={16} />
                      <Text style={[styles.impactCardText, { color: tip.color }]}>
                        {tip.estimatedImpact}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Additional Resources */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>📚 Additional Resources</Text>
            <View style={commonStyles.card}>
              <Text style={styles.resourceTitle}>Need Help Getting Started?</Text>
              <Text style={commonStyles.textSecondary}>
                Consider hiring a marketing consultant who specializes in auto service businesses. 
                They can help you implement these strategies and track results.
              </Text>
            </View>
            <View style={commonStyles.card}>
              <Text style={styles.resourceTitle}>Track Your Results</Text>
              <Text style={commonStyles.textSecondary}>
                Use call tracking numbers, unique promo codes, and analytics to measure which 
                marketing channels are generating the most leads and revenue.
              </Text>
            </View>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  heroCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  quickWinTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  impactBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipHeaderContent: {
    flex: 1,
  },
  tipCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tipContent: {
    marginTop: 12,
  },
  tipDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  actionItemsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  actionItemBullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
    fontWeight: '700',
  },
  actionItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  impactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  impactCardText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
});
