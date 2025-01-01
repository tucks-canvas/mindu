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
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

const headers = [
  { 
    id: 1,
    title: 'Account Settings',
  },
  { 
    id: 2,
    title: 'More',
  },
];

const pages = [
  {
    id: 1,
    header: 1,
    title: 'Edit Profile',
    link: '/editprofile',
  },
  {
    id: 2,
    header: 1,
    title: 'Notifications',
    link: '/notifications',
  },
  {
    id: 3,
    header: 1,
    title: 'Preferences',
    link: '/preferences',
  },
  {
    id: 4,
    header: 2,
    title: 'About Us',
    link: '/about',
  },
  {
    id: 5,
    header: 2,
    title: 'Privacy Policy',
    link: '/policy',
  },
  {
    id: 6,
    header: 2,
    title: 'Professional Listing',
    link: '/listing',
  },
  {
    id: 7,
    header: 2,
    title: 'FAQs',
    link: '/faqs',
  },
  {
    id: 8,
    header: 2,
    title: 'Self-Help Control',
    link: '/selfhelp',
  },
  {
    id: 9,
    header: 2,
    title: 'User Support',
    link: '/support',
  },
  {
    id: 10,
    header: 2,
    title: 'Billing Information',
    link: '/billing',
  },
  {
    id: 11,
    header: 2,
    title: 'Subscription',
    link: '/subscription',
  },
];

const Profile = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content"  />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={true} 
          indicatorStyle={colors.azure}
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
                  d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1 L 1927 313 C 1222 751 889.92 234 4 402 Z"
                />
              </Svg>
            </View>

            <View style={styles.container2}>              
              <View style={styles.header}>
                <View style={styles.headerimage}>
                  <Image
                    source={images.sample4}
                    style={styles.lrgimage}
                  />
                </View>

                <Text style={styles.headertext}>{fname || 'Marvin Whyte'}</Text>  
              
                <Text style={styles.headersub}>{age || '18 • Patient'}</Text>

                <View style={styles.headercontact}>
                  <View style={styles.contactimage}>
                    <Image
                      source={icons.phone}
                      style={styles.minicon}
                      tintColor={colors.white}
                    />
                  </View>  
                  
                  <View style={styles.contactimage}>
                    <Image
                      source={icons.mail}
                      style={styles.minicon}
                      tintColor={colors.white}
                    />
                  </View>  

                  <View style={styles.contactimage}>
                    <Image
                      source={icons.at}
                      style={styles.minicon}
                      tintColor={colors.white}
                    />
                  </View>  
                </View>

                <View style={styles.pages}>
                  {headers.map((header) => (
                    <View 
                      key={header.id}
                    >
                      <Text style={styles.pagetext}>{header.title}</Text>

                      {pages
                        .filter((page) => page.header === header.id)
                        .map((page) => (
                          <TouchableOpacity
                            key={page.id}
                            onPress={() => router.push(page.link)}
                          >
                            <View style={styles.page}>
                              <Text style={styles.pagesub}>{page.title}</Text>

                              <Image
                                source={icons.arrow}
                                style={styles.smallicon}
                                tintColor="rgba(0, 0, 0, 0.1)"
                              />
                            </View>
                            <View style={styles.line} />
                          </TouchableOpacity>
                        ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>           
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  /* Scroll View, Wave and Safe Srea */

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

  /* Waves */

  waves: {
    position: 'absolute',
    height: 200,
    width: '100%',
    top: 0,
  },

  /* Scroll View */

  scrollView1: {
    paddingBottom: 150,
  },

  /* Header */

  header: {
    flexDirection: 'column',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerimage: {
    height: 78,
    width: 80,
    elevation: 50,
    borderRadius: 15,
    marginTop: 16,
    shadowColor: colors.grey,
    overflow: 'hidden',
  },

  headertext: {
    color: colors.azure,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 30,
  },

  headersub: {
    color: colors.grey,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
  },

  headercontact: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },

  contactimage: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: colors.azure,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Body */

  pages: {
    width: '95%',    
    justifyContent: 'center',
    marginTop: 20,
  },

  page: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },

  pagetext: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    paddingTop: 20,
  },

  pagesub: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
  },

  line: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '97%',
    marginVertical: 10,
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
    height: 12, 
    width: 12,
  },

  lrgimage: {
    height: '100%',
    width: '100%',
  },
});

export default Profile;
