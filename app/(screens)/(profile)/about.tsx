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

const About = () => {

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
                <Text style={styles.bodytext}>About Us</Text>
                
                <Text style={styles.bodysub}>
                    <Text style={styles.highlight}>MindYou</Text> is a mental health application created to address the unique 
                    challenges faced by individuals in the Caribbean region. With a mission to break the stigma surrounding 
                    mental health and provide accessible, culturally relevant tools.
                </Text>
                
                <Text style={styles.bodybig}>In-App Features</Text>

                <Text style={styles.bodysub}>
                    MindYou offers a comprehensive suite of features, including: {"\n"}
                    <Text style={styles.highlight}>1.  Mental Health Resources</Text>: Curated guides tailored to 
                       {"\n"}    Caribbean contexts. {"\n"}
                    <Text style={styles.highlight}>2.  Self-Help Tools</Text>: Journaling, mood tracking, and 
                        {"\n"}     goal-setting features. {"\n"}
                    <Text style={styles.highlight}>3.  Professional Access</Text>: Seamless connection to 
                        {"\n"}     certified mental health professionals. {"\n"}
                    <Text style={styles.highlight}>4.  Community Support</Text>: Peer-to-peer engagement and 
                        {"\n"}     support networks. {"\n"}                
                </Text>

                <Text style={styles.bodysub}>
                    At <Text style={styles.highlight}>MindYou</Text>, we understand the importance of addressing mental health through a lens 
                    that respects and reflects Caribbean cultures and traditions. Our platform is designed 
                    to empower users with the tools they need to improve their well-being, while ensuring 
                    privacy, inclusivity, and accessibility for all. {"\n\n"}
                    Together, let’s build a healthier, stigma-free Caribbean.
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.footertext}>
                       © <Text style={styles.highlight}> 2024 Mind</Text>U. <Text style={styles.highlight}>All rights reserved.</Text>
                    </Text>
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

  scrollView1: {
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

  /* Footer */

  footer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  footertext: {
    color: 'rgba(0, 0, 0, 0.3)',
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

export default About;
