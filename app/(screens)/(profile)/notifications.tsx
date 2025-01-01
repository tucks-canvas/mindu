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

const notifications = [
  { 
    id: 1,
    title: 'In-App Notifications',
    icon: 'lswitch',
  },
  { 
    id: 2,
    title: 'Chat Notifications',
    icon: 'lswitch',
  },
  { 
    id: 3,
    title: 'Community Chat Notifications',
    icon: 'lswitch',
  },
];


const Notifications = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const [notificationSettings, setNotificationSettings] = useState<typeof notifications>(notifications);

  // Load notification states from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await AsyncStorage.getItem("notificationSettings");
      if (savedSettings) {
        setNotificationSettings(JSON.parse(savedSettings));
      }
    };
    loadSettings();
  }, []);

  // Save notification states to AsyncStorage
  const saveSettings = async (updatedSettings) => {
    setNotificationSettings(updatedSettings);
    await AsyncStorage.setItem(
      "notificationSettings",
      JSON.stringify(updatedSettings)
    );
  };

  const toggleNotification = (id) => {
    const updatedSettings = notificationSettings.map((notification) =>
      notification.id === id
        ? {
            ...notification,
            icon:
              notification.icon === "lswitch"
                ? "rswitch"
                : "lswitch",
          }
        : notification
    );
    saveSettings(updatedSettings);
  };

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
                  d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1.05 L 1927 328.65 C 1222 788.55 889.92 245.7 4 422.1 Z"
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

                <View style={styles.headerinfo}>
                  <Text style={styles.headertext}>{fname || 'Marvin Whyte'}</Text>  
                  <Text style={styles.headersub}>{age || '18 • Patient'}</Text>  
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
                <Text style={styles.notificationtext}>Notifications</Text>

                {notificationSettings.map((notification) => (
                  <TouchableOpacity key={notification.id}>
                    <View style={styles.notification}>
                      <Text style={styles.notificationsub}>
                        {notification.title}
                      </Text>

                      <TouchableOpacity
                        onPress={() => toggleNotification(notification.id)}
                      >
                        <Image
                          source={
                            notification.icon === "lswitch"
                              ? icons.lswitch
                              : icons.rswitch
                          }
                          style={styles.smallicon}
                          tintColor={
                            notification.icon === "lswitch"
                              ? "rgba(0, 0, 0, 0.1)"
                              : "rgba(100, 163, 241, 1)"
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                  </TouchableOpacity>
                ))}
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
    elevation: 50,
    borderRadius: 15,
    shadowColor: colors.grey,
    overflow: 'hidden',
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

  /* Body */

  body: {
    width: '85%',
    justifyContent: 'center',
    marginTop: 30,
  },

  notifications: {
    width: '100%',    
    justifyContent: 'center',
    marginTop: 20,
  },

  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },

  notificationtext: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    paddingTop: 20,
  },

  notificationsub: {
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
    height: 15, 
    width: 15,
  },

  lrgimage: {
    height: '100%',
    width: '100%',
  },
});

export default Notifications;
