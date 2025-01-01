import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import Slidder
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// Import View and Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
 
// Import icons, colors, and images
import { icons, images } from '../../../constants';
import colors from '../../../constants/colors';

const Policy = () => {

  const router = useRouter();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content"  />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={true} 
          indicatorStyle="black"
          contentContainerStyle={styles.scrollView1}
        >
          <View style={styles.container1}>
            <View style={styles.waves}>
              <Svg
                height="300"
                width="105%"
                viewBox="0 0 1440 320"
                style={[styles.wave, {bottom: 105, right: 2,}]}
              >
                <Path
                  fill={colors.azure}
                  d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1.1888 L 1921 403.3867 C 1029 805.1459 641 477 4 477.8824 Z"
                />
              </Svg>
            </View>

            <View style={styles.container2}>              
              <View style={styles.header}>
                <View></View>                
                
                <View style={styles.headerimage}>
                  <Image
                    source={images.logo}
                    style={styles.lrgimage}
                  />
                </View>

                <TouchableOpacity 
                  onPress={() => router.back()}
                  style={styles.back}
                >
                  <Image
                    source={icons.larrow}
                    style={styles.minicon}
                    tintColor={colors.white}
                  />
                </TouchableOpacity> 
              </View>

              <View style={styles.body}>
                <Text style={styles.bodytext}>Privacy Policy</Text>
                
                <Text style={styles.bodysub}>
                    <Text style={styles.highlight}>Effective Date</Text>: November 24th, 2024.{"\n\n"}
                    Welcome to <Text style={styles.highlight}>MindYou</Text>, a Caribbean-focused mental health app designed to promote wellness, accessibility, and culturally relevant mental health support.
                    We value your privacy and are committed to safeguarding your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information.
                </Text>
                
                <Text style={styles.bodybig}>Information We Collect</Text>

                <Text style={styles.bodysub}>
                    We collect the following types of information to provide our services effectively:{"\n"} 
                    •  <Text style={styles.highlight}>Personal Information</Text>: Name, email address, age, and 
                        {"\n"}   location (optional). {"\n"}
                    •  <Text style={styles.highlight}>Health Information</Text>: Self-reported mental health data, 
                        {"\n"}   journal entries, mood tracking, and survey responses. {"\n"}
                    •  <Text style={styles.highlight}>Usage Data</Text>: App interactions, device type, and 
                        {"\n"}   anonymized analytics for performance improvement.
                </Text>

                <Text style={styles.bodybig}>How We Use Your Information</Text>

                <Text style={styles.bodysub}>
                    We use your information to: {"\n"}
                    •  Provide personalized mental health resources and 
                        {"\n"}   recommendations. {"\n"}
                    •  Facilitate communication with mental health 
                        {"\n"}   professionals. {"\n"}
                    •  Improve app functionality and user experience 
                        {"\n"}   through analytics. {"\n"}
                    •  Ensure compliance with applicable legal and ethical 
                        {"\n"}   standards. {"\n"}
                </Text>

                <Text style={styles.bodybig}>How We Protect Your Data</Text>

                <Text style={styles.bodysub}>
                    We prioritize your data security by implementing: {"\n"}
                    •  End-to-end encryption for all communications. {"\n"}
                    •  Secure data storage on encrypted servers. {"\n"}
                    •  Periodic security audits and compliance checks.
                </Text>

                <Text style={styles.bodybig}>Your Rights</Text>

                <Text style={styles.bodysub}>
                    You have the right to: {"\n"}
                    •  Access, update, or delete your personal information at 
                        {"\n"}   any time. {"\n"}
                    •  Withdraw consent for data collection and usage. {"\n"}
                    •  Request clarification on our data practices. {"\n"}
                </Text>

                <Text style={styles.bodybig}>Third-Party Sharing</Text>

                <Text style={styles.bodysub}>
                    We do not sell or share your personal information with third parties without your consent, except when required by law or necessary for providing our services (e.g., connecting with mental health professionals).
                </Text>

                <Text style={styles.bodybig}>Changes to this Policy</Text>

                <Text style={styles.bodysub}>
                    We may update this Privacy Policy from time to time. Significant changes will be communicated via email or in-app notifications.
                    If you have any questions or concerns about your privacy, please contact us at <Text style={styles.highlight}>support@mindyouapp.com.</Text>
                </Text>
              </View>
            </View>           
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  /* Safe Area */

  safeArea: {
    backgroundColor: colors.white,
    height: '100%',
    flex: 1,
    bottom: 30,
  },

  container1: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 50,
  },

  /* Scroll View */

  scrollView2: {
    paddingTop: 40,
    paddingBottom: 100,
  },

  /* Waves */

  waves: {
    position: 'absolute',
    height: 200,
    width: '100%',
    top: 0,
  },

  wave: {
    backgroundColor: colors.white,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  headerimage: {
    height: 70,
    width: 68,
    left: 13,
    elevation: 50,
    shadowColor: colors.grey,
  },

  headerinfo: {
    flexDirection: 'column',
    right: 25,
    gap: 5,
  },

  headertext: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },

  headersub: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },

  /* Body */

  body: {
    width: '85%',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 50,
  },

  bodytext: {
    color: colors.grey,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },

  bodysub: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
    lineHeight: 25,
  },

  bodybig: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginTop: 20,
    lineHeight: 35,
  },

  /* Other */

  back: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 45,
    width: 45,
    elevation: 50,
    borderRadius: 30,
    shadowColor: colors.grey,
  },

  highlight: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },

  /* Images, and Icons */

  smallicon: {
    height: 25, 
    width: 25,
  },

  bigicon: {
    height: 70, 
    width: 70,
  },

  minicon: {
    height: 15, 
    width: 15,
  },

  lrgimage: {
    height: '100%',
    width: '100%',
  },
});

export default Policy;
