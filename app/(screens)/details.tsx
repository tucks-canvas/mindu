import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import View and Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import icons, colors, and images
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

const headers = [
    {
        id: 1,
        image: icons.phone,
    },
    {
        id: 2,
        image: icons.video,
    },
    {
        id: 3,
        image: icons.chat,
    },
];

const ratings = [
    {
        id: 1,
        no: '8 Years', 
        description: 'Experience',
        image: icons.fast,
    },
    {
        id: 2,
        no: 20, 
        description: 'People',
        image: icons.people,
    },
    {
        id: 3,
        no: '2.8K', 
        description: 'Reviews',
        image: icons.star,
    },
];

const Details = () => {

    const router = useRouter();
  
    return (
      <>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />
  
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.headericon}
                        onPress={() => router.back()}
                    >
                        <Image 
                            source={icons.left}
                            style={styles.smlicon}
                            tintColor={colors.marguerite}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.headericon}
                    >
                        <Image 
                            source={icons.like}
                            style={styles.smlicon}
                            tintColor={colors.marguerite}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.aside}>
                        <View style={styles.rate}>
                            <Image 
                                source={icons.star}
                                tintColor={colors.marguerite}
                                style={styles.subicon}
                            />
                            
                            <Text style={styles.ratext}>5.0</Text>
                        </View>

                        <View style={styles.professional}>
                            <View style={styles.body}>
                                <Text style={styles.bodytext}>Sarah</Text>
                                <Text style={styles.bodysub}>Johnson</Text>
                            </View>

                            <View style={styles.subbody}>
                                <Text style={styles.bodymid}>MBBS, MD</Text>
                                <Text style={styles.bodysml}>Medicine Specialist</Text>      
                            </View>                 
                        </View>
                    </View>

                    <View style={styles.image}>
                        <Image 
                            source={images.doctored1}                       
                        />
                    </View>
                </View>
            </View>
          </SafeAreaView> 

          <View style={styles.details}>
            <View style={styles.contact}>
                <View style={styles.contactheader}>
                    <TouchableOpacity style={styles.info}>
                        <Image
                            source={icons.info}
                            style={styles.subicon}
                            tintColor={colors.white}
                        />

                        <Text style={styles.infotext}>Details</Text>
                    </TouchableOpacity>

                    <View style={styles.contacts}>
                        {headers.map(header => (
                            <TouchableOpacity
                                key={header.id}
                                style={styles.contactbutton}
                            >
                                <Image
                                    source={header.image}
                                    style={styles.subicon}
                                    tintColor={colors.chetwood}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>                        
                </View>

                <View style={styles.contactfooter}>
                    {ratings.map(rating => (
                        <View style={styles.ratingheader}>
                            <Image 
                                source={rating.image}
                                style={styles.smlicon}
                                tintColor={colors.chetwood}
                            />

                            <View style={styles.ratingfooter}>
                                <Text style={styles.ratingtext}>{rating.no}</Text>
                                <Text style={styles.ratingsub}>{rating.description}</Text>
                            </View>
                        </View>
                    ))}                        
                </View>
            </View>
          </View> 

          <View style={styles.booking}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.date}>
                    <View style={styles.dateheader}>
                        <Text style={styles.datetext}>Select Date</Text>

                        <View style={styles.month}>
                            <Image 
                                source={icons.left}
                                tintColor={colors.chetwood}
                                style={styles.subicon}
                            />

                            <Text style={styles.datetext}>January</Text>

                            <Image 
                                source={icons.right}
                                tintColor={colors.chetwood}
                                style={styles.subicon}
                            />
                        </View>
                    </View>

                    <View style={styles.dates}>
                        {Array.from({ length: 7 }).map((_, index) => {
                            const date = new Date();
                            date.setDate(date.getDate() + index);
                            const day = date.getDate();
                            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

                            return (
                                <View key={index} style={styles.weekdate}>
                                    <Text style={styles.day}>{day}</Text>
                                    <Text style={styles.weekday}>{weekday}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.time}>
                    <Text style={styles.timetext}>Select Time</Text>

                    <View style={styles.times}>
                        {Array.from({ length: 12 }).map((_, index) => {
                            const hour = 8 + index;
                            const period = hour < 12 ? 'AM' : 'PM';
                            const displayHour = hour <= 12 ? hour : hour - 12;

                            return (
                                <View key={index} style={styles.timestamp}>
                                    <Text style={styles.timesub}>{displayHour}</Text>
                                    <Text style={styles.timesml}>{period}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <TouchableOpacity style={styles.bookbutton}>
                    <Text style={styles.booktext}>Booking</Text>
                </TouchableOpacity>
            </ScrollView>
          </View> 
      </>
    );
  };
  
  const styles = StyleSheet.create({

    /* Scroll View, Wave and Safe Srea */

    safeArea: {
        backgroundColor: colors.link,
        width: '100%',
        height: '100%',
        padding: 10,
        paddingBottom: 200,
    },

    container: {
        width: '100%',
        height: '100%',
    },

    scrollViewContent: {
        paddingBottom: 100,
        height: '100%',
    },

    /* Header */

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    headericon: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 50,
    },

    /* Professional */

    professional: {
        flexDirection: 'column',
        gap: 10,
    },

    /* Body */

    content: {
        flexDirection: 'column',
        gap: 10,
        padding: 20,
    },

    body: {
        flexDirection: 'column',  
        paddingBottom: 5,
    },

    bodytext: {
        fontSize: 30,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    bodysub: {
        fontSize: 30,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    subbody: {
        flexDirection: 'column',  
    },

    bodymid: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    bodysml: {
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    /* Rate */

    rate: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        height: 50,
        width: 80,
        borderRadius: 25,
        padding: 5,
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    ratext: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    /* Information */

    details: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        flexDirection: 'column',
        gap: 20,
        padding: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        bottom: 450,
        width: '100%',
        height: 230,
    },

    info: {
        flexDirection: 'row',
        gap: 5,
        padding: 12,
        backgroundColor: colors.chetwood,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    infotext: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: colors.white,
    },   
    
    /* Contacts */

    contacts: {
        flexDirection: 'row',
        gap: 10,
    },

    contact: {
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'space-between',
        width: '100%',
    },

    contactheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },

    contactfooter: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        padding: 20,
        gap: 10, 
        justifyContent: 'space-between',
        borderRadius: 20, 
    },

    contactbutton: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },

    /* Rating */

    ratingheader: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 20,
    },

    ratingtext: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    ratingsub: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color: 'rgba(0, 0, 0, 0.4)',
    },

    /* Date */

    dates: {
        flexDirection: 'row',
        paddingVertical: 25,
    },

    date: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },

    dateheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    weekdate: {
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 30,
        width: 90,
        height: 50,
    },

    day: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: colors.chetwood,
    },

    weekday: {
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    month: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    datetext: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,   
    },

    /* Time */

    times: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 50,
    },

    timestamp: {
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 30,
        width: 90,
        height: 50,
    },

    timetext: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        color: colors.chetwood,
    },

    timesub: {
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        color: colors.chetwood,
    },

    /* Booking */

    booking: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(10px)',
        flexDirection: 'column',
        gap: 20,
        padding: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        bottom: 460,
        width: '100%',
        height: '100%',
    },

    booktext: {
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(255, 255, 255, 1)',
    },

    bookbutton: {
        borderRadius: 25,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.chetwood,
    },

    /* Add-Ons */

    image: {
        bottom: 270,
        left: 40, 
    },

    /* Icons and Images */

    smlicon: {
        height: 30,
        width: 30,
    },

    subicon: {
        height: 18,
        width: 18,
    },

    midicon: {
        height: 26,
        width: 26, 
    },
  
  });

  export default Details;