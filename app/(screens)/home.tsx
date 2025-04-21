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

const headings = [
    {
        id: 1,
        icon: icons.message,
    },
    {
        id: 2,
        icon: icons.notification,
    },
];

const searches = [
    {
        id: 1,
        icon: icons.search,
    },
    {
        id: 2,
        icon: icons.filter,
    },
];

const professionals = [
    {
        id: 1,
        name: 'Dr. John Doe',
        profession: 'Child Psychatrist',
        image: images.doctor1,
        specialisations: [
            {
                id: 1,
                icon: icons.brain,
            },
            {
                id: 2,
                icon: icons.lung,
            },
            {
                id: 3,
                icon: icons.heart,
            },
        ],
    },
    {
        id: 2,
        name: 'Dr. John Doe',
        profession: 'Child Psychatrist',
        image: images.doctor2,
        specialisations: [
            {
                id: 1,
                icon: icons.brain,
            },
            {
                id: 2,
                icon: icons.lung,
            },
            {
                id: 3,
                icon: icons.heart,
            },
        ],
    },
];

const visits =[
    {
        id: 1,
        name: 'General Visits',
        money: '~1500 JMD',
    },
    {
        id: 2,
        name: 'Specific Visits',
        money: '~1350 JMD',
    },
    {
        id: 3,
        name: 'Medical Tests',
        money: '~1200 JMD',
    },
    {
        id: 4,
        name: 'Therapeutic',
        money: '~1100 JMD',
    },
];

const Home = () => {

  const router = useRouter();

  return (
    <>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />

        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={styles.container}>
                    <View style={styles.header}>                    
                        <Text style={styles.headertext}>Me<Text style={styles.bold}>dic</Text></Text>

                        <View style={styles.headerbody}>
                            <View style={styles.headericons}>
                                {headings.map((heading) => (
                                    <View 
                                        key={heading.id}
                                        style={styles.headericon}
                                    >
                                        <Image 
                                            source={heading.icon} 
                                            style={styles.smlicon} 
                                            tintColor={colors.black}
                                        />
                                    </View>
                                ))}
                            </View>

                            <View style={styles.headerimage}>
                                <Image 
                                    source={images.sample1} 
                                    style={styles.lrgimage} 
                                    resizeMode='cover'
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.professionals}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.professional}
                            style={styles.horizontalScrollView}
                        >
                            {professionals.map(professional => (
                                <View 
                                    style={styles.professionalbody}
                                    key={professional.id}
                                >
                                    <ImageBackground
                                        source={professional.image}
                                        style={styles.lrgimage}
                                        imageStyle={styles.lrgstyle}
                                        resizeMode='cover'
                                    >
                                        <View style={styles.professionalinfo}>
                                            <Text style={styles.proftext}>{professional.name}</Text>
                                            <Text style={styles.profsub}>{professional.profession}</Text>

                                            <View style={styles.professionalcontent}>
                                                <View
                                                    style={styles.professionalspecs}
                                                >
                                                    {professional.specialisations.map(specialisation => (
                                                        <View 
                                                            style={styles.professionalspec}
                                                            key={specialisation.id}
                                                        >
                                                            <Image
                                                                source={specialisation.icon}
                                                                style={styles.subicon}
                                                                key={specialisation.id}
                                                            />
                                                        </View>
                                                    ))}
                                                </View>
                                                
                                                <TouchableOpacity 
                                                    style={styles.professionalicon}
                                                    onPress={() => router.push({
                                                        pathname: '/(screens)/details',
                                                    })}
                                                >
                                                    <Image 
                                                        source={icons.link}
                                                        style={styles.midicon}
                                                        tintColor={colors.white}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

        <View style={styles.professionalsearch}>    
            <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.scrollViewContent2}
            >
                <View style={styles.searcheader}>
                    <View style={styles.searchtexts}>
                        <Text style={styles.searchtext}>Let's find</Text>
                        <Text style={styles.searchsub}>your doctor</Text>
                    </View>
                    
                    <View style={styles.searchicons}>
                        {searches.map(search => (
                        <View 
                            style={styles.searchicon}
                            key={search.id}
                        >
                            <Image
                            source={search.icon}
                            style={styles.midicon}
                            tintColor={colors.marguerite}
                            />
                        </View>
                        ))}
                    </View>
                </View>

                <View style={styles.visits}>
                    {visits.map(visit => (
                        <View 
                            style={styles.visit} 
                            key={visit.id}
                        >
                            <Text style={styles.visitext}>{visit.name}</Text>
                            
                            <View style={styles.visitinfo}>  
                                <View style={styles.visitcontent}>
                                    <Text style={styles.visitsub}>{visit.money}</Text>
                                    <Text style={styles.visitsml}>Per session</Text>
                                </View>

                                <View style={styles.visitbutton}>
                                    <Image
                                        source={icons.link}
                                        style={styles.midicon}
                                        tintColor={colors.white}
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>

        <TouchableOpacity 
            onPress={() => router.push('/(screens)/chat')}
            style={styles.chatbutton}
        >
            <Image
                source={icons.chat}
                style={styles.icon}
                tintColor={colors.white}
            />
        </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({

    /* Scroll View, Wave and Safe Srea */

    safeArea: {
        backgroundColor: colors.link,
        width: '100%',
        height: '100%',
        padding: 20,
        paddingBottom: 200,
    },

    container: {
        width: '100%',
        height: '100%',
    },

    scrollViewContent2: {
        paddingBottom: 200,
        gap: 5,
    },

    /* Header */

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerbody: {
        flexDirection: 'row',
        gap: 10,
    },

    headericon: {
        borderRadius: 30,
        padding: 15,
        backgroundColor: colors.white,
    },

    headericons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },

    headertext: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: colors.chetwood,
    },

    headerimage: {
        height: 50,
        width: 50,
        borderRadius: 30,
        overflow: 'hidden',
    },

    /* Professionals */

    professionals: {
        marginTop: 30,
    },

    professional: {
        flexDirection: 'row',
        gap: 15,
    },

    professionalbody: {
        height: 315,
        width: 215,
        borderRadius: 20,
        overflow: 'visible',
    },

    professionalspecs: {
        flexDirection: 'row',
        gap: -10,
        alignItems: 'flex-end',
    },

    professionalspec: {
        backgroundColor: colors.white,
        height: 20,
        width: 20,
        borderRadius: 80,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
    },

    professionalinfo: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        padding: 10,
        margin: 7,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        top: 190,
    },

    proftext: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        color: colors.marguerite,
    },

    profsub: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 10,
        color: colors.marguerite,
    },

    professionalcontent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },

    professionalicon: {
        backgroundColor: colors.marguerite,
        borderRadius: 30,
        padding: 10,
    },


    /* Search */

    professionalsearch: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        padding: 30,
        bottom: 400,
        zIndex: 1,
    },

    searcheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    searchtexts: {
        flexDirection: 'column',
        gap: 2,
        marginBottom: 10,
    },

    searchtext: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 25,
        color: colors.marguerite,
    },

    searchsub: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        color: colors.marguerite,
    },

    searchicons: {
        flexDirection: 'row',
        gap: 10,
    },

    searchicon: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        borderRadius: 30,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center', 
        elevation: 10,
        margin: 5,
    },

    /* Visits */

    visits: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    visit: {
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        height: 165,
        width: 158,
        gap: 10,
        padding: 17,
        justifyContent: 'space-between',
        borderColor: 'rgba(193, 193, 193, 0.30)',
        borderRadius: 30,
        borderWidth: 1,
        elevation: 10,
        margin: 6,
    },

    visitinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
    },

    visitcontent: {
        flexDirection: 'column',
        gap: 2,
    },

    visitext: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        color: colors.marguerite,
    },

    visitsub: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        color: colors.marguerite,
    },

    visitsml: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        color: 'rgba(123, 123, 123, 0.85)',
    },

    visitbutton: {
        backgroundColor: colors.marguerite,
        padding: 10,
        borderRadius: 30,
    },

    /* Chat */

    chatbutton: {
        position: 'absolute',
        borderRadius: 20,
        zIndex: 2,
        backgroundColor: colors.chetwood,
        bottom: 75,
        left: 335,
        height: 60,
        width: 60,  
        justifyContent: 'center',
        alignItems: 'center',  
        elevation: 10,
    },

    /* Add-Ons */

    bold: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: colors.marguerite,
    },

    /* Images, and Icons */

    smlimage: {
        width: 20,
        height: 20,
    },

    icon: {
        height: 30,
        width: 30,
        padding: 5,
    },

    smlicon: {
        height: 19,
        width: 19,
    },

    midicon: {
        width: 20,
        height: 20,
    },

    subicon: {
        width: 15,
        height: 15,
    },

    lrgimage: {
        width: '100%',
        height: '100%',
    },

    lrgstyle: {
        borderRadius: 30,
    },

    scrollView: {
        flexGrow: 1,
    },

    horizontalScrollView: {
        flexGrow: 0,
    },
});

export default Home;