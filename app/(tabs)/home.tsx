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

const tasks = [
  {
    id: 1,
    title: 'Meditation',
    description: 'Step into serenity.',
    image: icons.timer,
    link: '/meditation',
  },
  {
    id: 2,
    title: 'Goal Tracking',
    description: 'Start your goal-tackling journey!',
    image: icons.target,
    link: '/goal',
  },
  {
    id: 3,
    title: 'Journaling',
    description: 'Embrace in this literary marvel.',
    image: icons.text,
    link: '/diary',
  },
];

const Home = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');
  
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const [screenText, setScreenText] = useState('Good Morning');

  const generateDates = () => {
    const today = new Date();
    const datesArray = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      datesArray.push({
        day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        date: currentDate.getDate(),
        fulldate: currentDate.toDateString(),
        weekday: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      });
    }

    setDates(datesArray);

    // Set the default selected date to today
    const todayDate = datesArray.find(date => date.fulldate === new Date().toDateString());
    setSelectedDate(todayDate);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
    generateDates();
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setScreenText('Good morning'); 
    } 

    else if (currentHour >= 12 && currentHour < 18) {
      setScreenText('Good afternoon');  
    } 
    
    else if (currentHour >= 18 && currentHour < 22) {
      setScreenText('Good evening'); 
    }   

    else {
      setScreenText('Good night'); 
    }
  }, []);

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
                  d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1 L 1927 313 C 1096 805 889.92 234 1.236 202.8 Z"
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

                <View style={styles.headernotify}>
                  <Image
                    source={icons.notification}
                    style={styles.smallicon}
                    tintColor={colors.white}
                  />
                </View> 

              </View>

              <View style={styles.body}>
                <Text style={styles.bodytext}>{screenText}, </Text>  
                <Text style={styles.bodysub}>{currentDate}</Text>  
              </View> 

              <View style={styles.notifications}>
                <View style={styles.notification}>
                  <View style={styles.notifyheader}>
                    <Image
                      source={icons.alert}
                      tintColor={colors.white}
                      style={styles.minicon}
                    />

                    <Text style={styles.notifytext}>Activities today</Text>

                    <Text style={styles.notifysub}>8:00 pm</Text>
                  </View>

                  <View style={styles.notifybody}>
                    <Text style={styles.notifysml}>Meditation & Relaxation</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tasks}>
                <Text style={styles.tasktext}>What do you need today?</Text>

                <View style={styles.tasklist}>
                  <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView2}
                  >
                    {tasks.map((task) => ( 
                      <TouchableOpacity 
                        onPress={() => router.push(task.link)}
                        style={styles.task}
                        key={task.id}
                      >
                        <Image 
                          source={task.image}
                          tintColor={colors.white}  
                          style={styles.bigicon}                
                        />
                        <View style={styles.taskbody}>
                          <Text style={styles.taskbig}>{task.title}</Text>
                          <Text style={styles.tasksml}>{task.description}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>      
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

  /* Header */

  header: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerimage: {
    height: 58,
    width: 60,
    elevation: 50,
    borderRadius: 15,
    shadowColor: colors.grey,
    overflow: 'hidden',
  },

  headernotify: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    elevation: 50,
    borderRadius: 15,
    shadowColor: colors.grey,
    overflow: 'hidden',
  },

  /* Body */

  body: {
    flexDirection: 'column',
    width: '85%',
    justifyContent: 'space-between', 
    marginTop: 55,
    gap: 15,
  },

  bodytext: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Montserrat-Bold',
  },

  bodysub: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.3)',
    fontFamily: 'Montserrat-SemiBold',
  },

  /* Notification */

  notifications: {
    height: 300, 
    width: '85%',
    marginVertical: 10,
  },

  notification: {
    height: '32%', 
    width: '100%',
    backgroundColor: 'rgba(100, 163, 241, 1)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },

  notifyheader: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  notifybody: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'space-between',
  },

  notifytext: {
    fontSize: 11,
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    right: 70,
  },

  notifysub: {
    fontSize: 10,
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
  },

  notifysml: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
  },

  /* Tasks */

  tasks: {   
    width: '85%',
    gap: 10,
  },

  tasklist: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    marginVertical: 20,
  },
  
  task: {
    flexDirection: 'row',
    backgroundColor: 'rgba(100, 163, 241, 1)',
    alignItems: 'center',
    height: 125,
    width: 345, 
    borderRadius: 18,
    gap: 20,
    padding: 20,
    marginRight: 20,
  }, 

  taskbody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },

  tasktext: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Montserrat-Bold',
  },
  
  taskbig: {
    fontSize: 15,
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
  },

  tasksml: {
    fontSize: 10,
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
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

export default Home;
