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

const categories = [
  { 
    id: 1,
    title: 'Popular',
  },
  { 
    id: 2,
    title: 'Top Rated',
  },
  { 
    id: 3,
    title: 'Affordable',
  },
  { 
    id: 4,
    title: 'Trending',
  },
];

const professionals = [
  { 
    id: 1,
    title: 'Dr. Sarah Miller',
    image: images.sample1,
    age: 32,
    speciality: 'Childhood Trauma',
    rating: 4.5,
    category: 1,
    description: 'Dr. Sarah Miller is a licensed therapist with over 10 years of experience in treating childhood trauma. She is a certified professional in EMDR and CBT therapy.',
    education: [
      { 
        id: 1,
        title: 'University of Toronto',
        degree: 'Masters in Psychology',
        year: '2011',
      },
      { 
        id: 2,
        title: 'University of Toronto',
        degree: 'Bachelors in Psychology',
        year: '2009',
      },
    ],
    services: [{
      id: 1,
      title: 'DBT Therapy, and Interpersonal Therapy',
      mode: 'Online/In-Person',
      rate: 1500,
    },],  
  },
  { 
    id: 2,
    title: 'Dr. Cynthia Brown',
    image: images.sample2,
    age: 25,
    speciality: 'Behaviourial Disorders',
    rating: 5,
    category: 2,
    description: 'Dr. Cynthia Brown is a licensed therapist with over 5 years of experience in treating behavioural disorders. She is a certified professional in EMDR and CBT therapy.',
    education: [
      { 
        id: 1,
        title: 'University of Toronto',
        degree: 'Masters in Psychology',
        year: '2016',
      },
      { 
        id: 2,
        title: 'University of Toronto',
        degree: 'Bachelors in Psychology',
        year: '2014',
      },
    ],
    services: [{
      id: 1,
      title: 'DBT Therapy, and Interpersonal Therapy',
      mode: 'Online/In-Person',
      rate: 1500,
    },],
  },
  { 
    id: 3,
    title: 'Dr. John Doe',
    image: images.sample3,
    age: 40,
    speciality: 'Anxiety Disorders',
    rating: 4.8,
    category: 3,
    description: 'Dr. John Doe is a licensed therapist with over 15 years of experience in treating anxiety disorders. He is a certified professional in CBT and mindfulness therapy.',
    education: [
      { 
        id: 1,
        title: 'University of Toronto',
        degree: 'Masters in Psychology',
        year: '2006',
      },
      { 
        id: 2,
        title: 'University of Toronto',
        degree: 'Bachelors in Psychology',
        year: '2004',
      },
    ],
    services: [{
      id: 1,
      title: 'DBT Therapy, and Interpersonal Therapy',
      mode: 'Online/In-Person',
      rate: 1500,
    },],
  },
  { 
    id: 4,
    title: 'Dr. Jane Smith',
    image: images.sample4,
    age: 29,
    speciality: 'Depression',
    rating: 4.7,
    category: 4,
    description: 'Dr. Jane Smith is a licensed therapist with over 7 years of experience in treating depression. She is a certified professional in DBT and interpersonal therapy.',
    education: [
      { 
        id: 1,
        title: 'University of Toronto',
        degree: 'Masters in Psychology',
        year: '2011',
      },
      { 
        id: 2,
        title: 'University of Toronto',
        degree: 'Bachelors in Psychology',
        year: '2015',
      },
    ],
    services: [{
      id: 1,
      title: 'DBT Therapy, and Interpersonal Therapy',
      mode: 'Online/In-Person',
      rate: 1500,
    },],
  }
];

const Listing = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const generateStars = (rating) => {
    const stars = [];
    
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={`full-${i}`}
          source={icons.starfill}
          style={styles.subicon}
          tintColor={colors.azure}
        />
      );
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={`empty-${i}`}
          source={icons.star}
          style={styles.subicon}
          tintColor='rgba(0, 0, 0, 0.3)'
        />
      );
    }
  
    return stars;
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
              <Image
                source={images.sample4}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              />
              <Path
                fill={colors.azure}
                d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1.1094 L 1927 347.2344 C 892 817.4034 708 322.7273 4 445.9688 Z"
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
                    style={styles.subicon}
                    tintColor={colors.white}
                  />
                </TouchableOpacity> 
              </View>

              <View style={styles.search}>
                <View style={styles.bar}>
                  <TextInput
                      placeholder="Searching for a therapist?"
                      placeholderTextColor='rgba(0, 0, 0, 0.2)'
                      value={searchQuery}
                      onChangeText={handleSearch}
                      style={styles.searchtext}
                  />

                  <Image
                      source={icons.search}
                      style={styles.subicon}
                      tintColor='rgba(0, 0, 0, 0.2)'
                  />
                </View>
              </View>

              <View style={styles.catlisting}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scrollView2}
                >
                    {categories.map((category) => (
                        <TouchableOpacity 
                            style={[styles.category, category.id === selectedCategory && styles.selectedcategory]} 
                            key={category.id}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={[styles.catext, category.id === selectedCategory && styles.selectedcatext]}>
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>

              <View style={styles.proflisting}>
                {professionals.map((professional) => (
                  <TouchableOpacity 
                    style={styles.profdetails}
                    key={professional.id}
                    onPress={() => {
                      const selectedProfessional = professionals.find(pro => pro.id === professional.id);
                      console.log(selectedProfessional);
            
                      router.push({ 
                        pathname: '/professional', 
                        params: {
                          professional: JSON.stringify(selectedProfessional),
                        }
                      });
                    }}
                  >
                    <View style={styles.profimage}>
                      <Image
                          source={professional.image}
                          style={styles.lrgimage}
                      />
                    </View>
                    
                    <View style={styles.profinfo}>
                      <Text style={styles.proftext}>{professional.title}</Text>
                      <Text style={styles.profsub}>{professional.age} • {professional.speciality}</Text>
                    </View>

                    <View style={styles.profrating}>                        
                      <View style={styles.ratingstars}>{generateStars(professional.rating)}</View>
                      <Text style={styles.ratingsub}>{professional.rating} stars</Text>
                    </View>
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

  /* Scroll View */

  scrollView2: {
    gap: 20,
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

  /* Others */

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

  /* Search */

  search: {
    width: '86%',
    marginTop: 10,
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
    marginTop: 50,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: 0,
  },

  searchtext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
  },    

  /* Category */

  catlisting: {
    width: '85%',
    marginTop: 20,
  },
  
  category: {
    backgroundColor: colors.link,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 37,
    padding: 10,
    borderRadius: 30,
    margin: 0,
  },

  selectedcategory: {
    backgroundColor: colors.azure,
  },

  catext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 11,
    fontFamily: 'Montserrat-SemiBold',
  },

  selectedcatext: {
    color: colors.white,
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
  },

  /* Professional */

  profimage: {
    height: 60,
    width: 58,
    elevation: 50,
    borderRadius: 15,
    shadowColor: colors.grey,
    overflow: 'hidden',
  },

  proflisting: {
    width: '85%',
    marginTop: 20,
  },

  profdetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  profinfo: {
    flexDirection: 'column',
    left: 25,
    justifyContent: 'space-between',
    flex: 1,
  },

  proftext: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },

  profsub: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },

  profrating: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  ratingsub: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },

  ratingstars: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  /* Images, and Icons */

  smallimage: {
    height: 80,
    width: 80,
  },

  lrgimage: {
    height: '100%',
    width: '100%',
  },

  bigicon: {
    width: 100,
    height: 100,
  },

  smallicon: {
    height: 35,
    width: 35,
  },

  alticon: {
    height: 15,
    width: 15,
  },

  subicon: {
    height: 20,
    width: 20,
  },
});

export default Listing;
