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

const headers = [
    {
        id: 1,
        title: 'Qualifications',
        class: 'Education',
    },
    {
        id: 2,
        title: 'Services',
        class: 'Services',
    },
    {
        id: 3,
        title: 'Reviews',
        class: 'Ratings',
    },
];

const Professional = () => {

  const router = useRouter();
  const route = useLocalSearchParams();

  const [fname, setFirst] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const [selectedHeader, setSelectedHeader] = useState(1);

  const { professional: profDataStr } = route;
  const [profData, setProfData] = useState(() => JSON.parse(profDataStr));

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

  const handleHeaderPress = (headerid) => {
    setSelectedHeader(headerid);
    console.log('Selected Header:', headerid);
  };  

  useEffect(() => {
    console.log('Here is the data', profData);
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
                  d="M 0 0 L 148.32 0 C 296.64 0 593.28 0 889.92 0 S 1483.2 0 1631.52 0 L 1925 1 L 1927 313 C 1222 751 889.92 234 4 402 Z"
                />
              </Svg>
            </View>

            <View style={styles.container2}>              
              <View style={styles.header}>
                <View style={styles.head}>
                  <View></View>

                  <View style={styles.headerimage}>
                    <Image
                      source={profData.image || images.sample4}
                      style={styles.lrgimage}
                    />
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

                <Text style={styles.headertext}>{profData.title || 'Marvin Whyte'}</Text>  
              
                <Text style={styles.headersub}>{profData.age + ' • ' + profData.speciality || '18 • Patient'}</Text>

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

                <View style={styles.body}>
                    <Text style={styles.bodytext}>About Me</Text>

                    <Text style={styles.bodysub}>{profData.description}</Text>

                    <View style={styles.profprofile}>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.profheaders}
                        >
                            {headers.map((header) => (
                                <TouchableOpacity 
                                    key={header.id} 
                                    onPress={() => handleHeaderPress(header.id)} 
                                    style={styles.profheader}
                                >
                                    <Text style={[styles.detail, selectedHeader === header.id && styles.selectedheader]}>{header.title}</Text>
                                </TouchableOpacity>
                            ))} 
                        </ScrollView> 

                        {selectedHeader === 1 && (
                          <View style={styles.profdescription}>
                            <TouchableOpacity 
                                style={styles.profdetails}
                            >
                                <View style={styles.profimage}>
                                  <Image
                                      source={profData.image}
                                      style={styles.lrgimage}
                                  />
                                </View>
                                
                                <View style={styles.profinfo}>
                                    <Text style={styles.proftext}>{profData.title}</Text>
                                    <Text style={styles.profsub}>{profData.age} • {profData.speciality}</Text>
                                </View>
            
                                <View style={styles.profrating}>                        
                                    <View style={styles.ratingstars}>{generateStars(profData.rating)}</View>
                                    <Text style={styles.ratingsub}>{profData.rating} stars</Text>
                                </View>
                            </TouchableOpacity>

                            <View>
                              <Text style={styles.factext}>{headers.find(header => header.id === selectedHeader)?.class}</Text>

                              {profData.education.map((degree: { id: string; title: string; degree: string; year: string }) => (
                                  <View
                                    key={degree.id}
                                    style={styles.facts}
                                  >
                                    <View style={styles.fact}>
                                      <Text style={styles.factsub}><Text style={styles.highlight}>{degree.degree},</Text> {degree.title}</Text>
                                    </View>
                                    <View style={styles.line} />
                                  </View>
                                ))}
                            </View>                        
                          </View>
                        )}  

                        {selectedHeader === 2 && (
                          <View style={styles.profservices}>   
                            <TouchableOpacity 
                                style={styles.profdetails}
                            >
                                <View style={styles.profimage}>
                                    <Image
                                        source={profData.image}
                                        style={styles.lrgimage}
                                    />
                                </View>
                                
                                <View style={styles.profinfo}>
                                    <Text style={styles.proftext}>{profData.title}</Text>
                                    <Text style={styles.profsub}>{profData.age} • {profData.speciality}</Text>
                                </View>
            
                                <View style={styles.profrating}>                        
                                    <View style={styles.ratingstars}>{generateStars(profData.rating)}</View>
                                    <Text style={styles.ratingsub}>{profData.rating} stars</Text>
                                </View>
                            </TouchableOpacity> 

                            <View>
                              <Text style={styles.factext}>{headers.find(header => header.id === selectedHeader)?.class}</Text>

                              {profData.services.map((service: { id: string; title: string; mode: string; rate: string}) => (
                                  <View
                                    key={service.id}
                                    style={styles.facts}
                                  >
                                    <View style={styles.fact}>
                                      <Text style={styles.factsub}>{service.mode}</Text>
                                      <Text style={styles.factsml}>${service.rate}.00</Text>
                                    </View>

                                    <View style={styles.line} />

                                    <View style={styles.offers}>
                                      <Text style={styles.offertext}>We have a selection for you {service.title}</Text>
                                    </View>
                                  </View>
                                ))}
                            </View>                        
                          </View>
                        )}   

                        {selectedHeader === 3 && (
                          <View style={styles.profreviews}>
                            <TouchableOpacity 
                                style={styles.profdetails}
                            >
                              <View style={styles.profimage}>
                                  <Image
                                      source={profData.image}
                                      style={styles.lrgimage}
                                  />
                              </View>
                              
                              <View style={styles.profinfo}>
                                  <Text style={styles.proftext}>{profData.title}</Text>
                                  <Text style={styles.profsub}>{profData.age} • {profData.speciality}</Text>
                              </View>
          
                              <View style={styles.profrating}>                        
                                  <View style={styles.ratingstars}>{generateStars(profData.rating)}</View>
                                  <Text style={styles.ratingsub}>{profData.rating} stars</Text>
                              </View>
                            </TouchableOpacity> 

                            <View>
                              <Text style={styles.factext}>{headers.find(header => header.id === selectedHeader)?.class}</Text> 
                            </View>
                          </View>
                        )}                 
                    </View>
                </View>
              </View>
            </View>           
          </View>
        </ScrollView>

        <View style={styles.button}>
          <TouchableOpacity 
            style={styles.buttonstyle}
            onPress={() => router.push('/booking')}
          >
            <Text style={styles.buttontext}>Book an Appointment</Text>
          </TouchableOpacity>
        </View>
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
    left: 23,
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

  /* Others */

  back: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    top: 15,
    height: 45,
    width: 45,
    elevation: 50,
    borderRadius: 30,
    shadowColor: colors.grey,
  },

  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },

  /* Body */

  body: {
    width: '90%',
    justifyContent: 'center',
    marginTop: 50,
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

  /* Professional */

  profheaders: {
    width: '100%',
    gap: 40,
    marginTop: 20,    
  },

  selectedheader: {
    color: colors.azure,
  },

  detail: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',    
  },

  profimage: {
    height: 60,
    width: 58,
    elevation: 50,
    borderRadius: 15,
    shadowColor: colors.grey,
    overflow: 'hidden',
  },

  /* Headers */

  profdescription: {
    width: '100%',
    marginTop: 20,
  },

  profservices: {
    width: '100%',
    marginTop: 20,
  },

  profreviews: {
    width: '100%',
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

  /* Rating */

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

  /* Facts */

  facts: {
    width: '95%',    
    justifyContent: 'center',
    marginTop: 20,
  },

  fact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  factext: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    marginTop: 30,
    marginBottom: -10,
  },

  factsml: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
  },

  factsub: {
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

  /* Offers */

  offertext: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    paddingTop: 20,
    lineHeight: 20,
  },


  /* Button */

  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  buttonstyle: {
    backgroundColor: colors.azure,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '80%',
    borderRadius: 15,

  },

  buttontext: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },

  /* Images, and Icons */
  
  lrgimage: {
    height: '100%',
    width: '100%',
  },

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

  subicon: {
    height: 20,
    width: 20,
  },
});

export default Professional;
