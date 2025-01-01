import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import View and Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
 
// Import icons, colors, and images
import { icons, images } from '../../../constants';
import colors from '../../../constants/colors';

const categories = [
  { 
    id: 1,
    title: 'General',
  },
  { 
    id: 2,
    title: 'Therapists',
  },
  { 
    id: 3,
    title: 'In-App Features',
  },
  { 
    id: 4,
    title: 'Mental Issues',
  },
];

const questions = [
    { 
        id: 1,
        title: 'Who is this app designed for?',
        category: 1,
        description: 'The app is for anyone seeking mental health support, whether through therapy, tools or educational resources',
    },
    { 
        id: 2,
        title: 'How can I find a therapist?',
        category: 2,
        description: 'You can find a therapist by using the search feature and filtering by your preferences.',
    },
    { 
        id: 3,
        title: 'What features are available in the app?',
        category: 3,
        description: 'The app offers a variety of features including therapy sessions, mental health tools, and educational resources.',
    },
    { 
        id: 4,
        title: 'How can I track my mental health progress?',
        category: 4,
        description: 'You can track your mental health progress by using the built-in tracking tools and regularly updating your status.',
    },
    { 
        id: 5,
        title: 'Is the app free to use?',
        category: 1,
        description: 'The app offers both free and premium features. You can choose the plan that best suits your needs.',
    },
    { 
        id: 6,
        title: 'Can I change my therapist?',
        category: 2,
        description: 'Yes, you can change your therapist at any time by going to the therapist selection screen.',
    },
    { 
        id: 7,
        title: 'What mental health tools are available?',
        category: 3,
        description: 'The app includes tools such as mood tracking, journaling, and guided meditations.',
    },
    { 
        id: 8,
        title: 'How can I get the most out of the app?',
        category: 4,
        description: 'To get the most out of the app, regularly use the tools and resources available, and stay consistent with your therapy sessions.',
    },
    { 
        id: 9,
        title: 'Is my data secure?',
        category: 1,
        description: 'Yes, your data is secure. We use encryption and other security measures to protect your information.',
    },
    { 
        id: 10,
        title: 'Can I use the app anonymously?',
        category: 2,
        description: 'Yes, you can use the app anonymously by not providing any personal information.',
    },
];

const Listing = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');
  const [age, setAge] = useState('');

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

              <View style={styles.questlistings}>
                { searchQuery ? (
                    <View style={styles.resultlisting}>
                        <Text style={styles.resultext}>
                            {questions.filter((question) => question.title.toLowerCase().includes(searchQuery.toLowerCase())).length} 
                            
                            <Text style={styles.resultsub}>results found</Text>
                        </Text>
                        {questions
                            .filter((question) => question.title.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((question) => {
                                const [expandedQuestions, setExpandedQuestions] = useState({});

                                const toggleExpand = (id) => {
                                setExpandedQuestions((prev) => ({
                                    ...prev,
                                    [id]: !prev[id],
                                }));
                            };

                            return (
                                <View 
                                    style={styles.questdetails}
                                    key={question.id}
                                >
                                    <View style={styles.questdetail}>
                                        <Text style={styles.questext}>{question.title}</Text>

                                        <TouchableOpacity onPress={() => toggleExpand(question.id)}>
                                            <Image
                                            source={expandedQuestions[question.id] ? icons.uarrow : icons.darrow}
                                            style={styles.subicon}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {expandedQuestions[question.id] && <Text style={styles.questsub}>{question.description}</Text>}
                                    
                                    <View style={styles.line} />
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <View style={styles.questlisting}>
                        {questions
                            .filter((question) => question.category === selectedCategory)
                            .map((question) => {
                                const [expandedQuestions, setExpandedQuestions] = useState({});

                                const toggleExpand = (id) => {
                                setExpandedQuestions((prev) => ({
                                    ...prev,
                                    [id]: !prev[id],
                                }));
                            };

                            return (
                                <View 
                                    style={styles.questdetails}
                                    key={question.id}
                                >
                                    <View style={styles.questdetail}>
                                        <Text style={styles.questext}>{question.title}</Text>

                                        <TouchableOpacity onPress={() => toggleExpand(question.id)}>
                                            <Image
                                            source={expandedQuestions[question.id] ? icons.uarrow : icons.darrow}
                                            style={styles.subicon}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {expandedQuestions[question.id] && <Text style={styles.questsub}>{question.description}</Text>}
                                    
                                    <View style={styles.line} />
                                </View>
                            );
                        })}
                    </View>
                )}
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

  line: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '97%',
    marginVertical: 10,
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

  /* Results */

  resultlisting: {
    width: '85%',
    marginTop: 20,
  },

  resultext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },

  resultsub: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
  },

  /* Question */

  quesimage: {
    height: 60,
    width: 58,
    elevation: 50,
    borderRadius: 15,
    shadowColor: colors.grey,
    overflow: 'hidden',
  },

  questlistings: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  questlisting: {
    width: '85%',
    marginTop: 20,
  },

  questdetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10,
  },
  
  questdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quesinfo: {
    flexDirection: 'column',
    left: 25,
    justifyContent: 'space-between',
    flex: 1,
  },

  questext: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },

  questsub: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    paddingVertical: 10,
},

  quesrating: {
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
