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

const chats = [
  {
    id: 1,
    name: 'Melinda Davis',
    message: 'Hey, could we talk?',
    image: images.sample1,
    time: '2:58 pm',
  },
  {
    id: 2,
    name: 'Melinda Davis',
    message: 'Hey, how are you doing?',
    image: images.sample2,
    time: '8:58 pm',
  },
  {
    id: 3,
    name: 'Marvin Lewis',
    message: 'Mervin, how are ya?!',
    image: images.sample3,
    time: '5:58 pm',
  },
];

const Home = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  
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

  const handleSearch = () => {
    router.push(`/search?q=${searchQuery}`);
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
                  d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1 L 1927 313 C 1096 805 889.92 234 2 298 Z"
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
                <Text style={styles.bodytext}>{screenText}, {fname || 'Marvin'}</Text>  
                <Text style={styles.bodysub}>{currentDate}</Text>  
              </View> 

              <View style={styles.search}>
                <View style={styles.bar}>
                  <TextInput
                    placeholder="Who you looking for?"
                    placeholderTextColor='rgba(0, 0, 0, 0.2)'
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.bartext}
                  />

                  <Image
                    source={icons.search}
                    style={styles.tinyicon}
                    tintColor='rgba(0, 0, 0, 0.2)'
                  />
                </View>
              </View>

              <View style={styles.chats}>
                <ScrollView 
                  vertical 
                  showsVerticalScrollIndicator={false} 
                  contentContainerStyle={styles.scrollView1}
                >
                  {chats.map((chat) => (
                    <TouchableOpacity 
                      style={styles.chat}
                      key={chat.id}
                    >
                      <View style={styles.chatimage}>
                        <Image
                          source={chat.image}
                          style={styles.lrgimage}
                        />
                      </View>
  
                      <View style={styles.chatbody}>
                        <View style={styles.chatheader}>
                          <Text style={styles.chatext}>{chat.name}</Text>
                          <Text style={styles.chatsub}>{chat.time}</Text>
                        </View>
  
                        <Text style={styles.chatsml}>{chat.message}</Text>                      
                      </View>    
                    </TouchableOpacity>
                  ))}
                </ScrollView>
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

  scrollView1: {
    gap: 30,
  },

  scrollView2: {
    gap: 20,
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
    marginTop: 65,
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

  /* Search */

  search: {
    flexDirection: 'row',
    width: '87%',
    justifyContent: 'space-between',
    alignItems: 'center',   
    marginTop: 30, 
  },

  bar: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: colors.link,
    justifyContent: 'space-between',
    alignItems: 'center',  
    gap: 10,  
    padding: 10,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: 0,
  },

  bartext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
  },

  /* Week */

  week: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    gap: 10,
  },

  date: {
    flexDirection: 'column',
    width: 50,
    height: 90,
    alignItems: 'center',
    gap: 10,
  },

  weekday: {
    backgroundColor: colors.lightGrey,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },

  selectedweekday: {
    backgroundColor: colors.azure,
    width: 50,
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },

  datesub: {
    color: colors.grey,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  selectedsub: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  datetext: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  /* Chats */

  chats:{
    width: '85%',
    marginTop: 40,
  },

  chat: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },

  chatimage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },

  chatext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },

  chatsub: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  chatsml: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  chatbody: {
    width: '80%',
    flexDirection: 'column',
    gap: 10,
  },

  chatheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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

  tinyicon: {
    height: 16,
    width: 16,
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
