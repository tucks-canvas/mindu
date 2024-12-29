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
    title: 'Recent'
  },
  {
    id: 2,
    title: 'Popular',
  },
  {
    id: 3,
    title: 'Trending',
  },
];

const posts = [
  {
    id: 1,
    name: 'Melinda Davis',
    username: '@melinda_davis',
    message: 'The pursuit of happiness is only encurmbered by your willingness to accept it',
    image: images.sample1,
    comments: '20K',
    likes: '100K',
    reposts: '538',
    time: '18 hours ago',
  },
  {
    id: 2,
    name: 'Petra Campbell',
    username: 'petra_campbell',
    message: 'The pursuit of happiness is only encurmbered by your willingness to accept it',
    image: images.sample2,
    comments: '10K',
    likes: '30K',
    reposts: '920',
    time: '8 hours ago',
  },
  {
    id: 3,
    name: 'Marvic Donald',
    username: '@marvic_donald',
    message: 'The pursuit of happiness is only encurmbered by your willingness to accept it',
    image: images.sample3,
    comments: '10K',
    likes: '150K',
    reposts: '5K',
    time: '1 day ago',
  },
];

const Community = () => {

  const router = useRouter();

  const [fname, setFirst] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    router.push(`/search?q=${searchQuery}`);
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
                <Text style={styles.bodytext}>Welcome to MindSpace</Text>  
                <Text style={styles.bodysub}>Your all in one community for sharing what's on your mind</Text>  
              </View> 

              <View style={styles.search}>
                <View style={styles.bar}>
                  <TextInput
                    placeholder="Search here"
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

              <View style={styles.headers}>
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scrollView3}
                >
                  {headers.map((header) => (
                    <TouchableOpacity 
                      style={styles.heading}
                    >
                      <Text style={styles.headertext}>{header.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView> 
              </View>

              <View style={styles.posts}>
                <ScrollView 
                  vertical 
                  showsVerticalScrollIndicator={false} 
                  contentContainerStyle={styles.scrollView1}
                >
                  {posts.map((post) => (
                    <View 
                      style={styles.postcomment}
                      key={post.id}
                    >
                      <View 
                        style={styles.post}
                      >
                        <View style={styles.postimage}>
                          <Image
                            source={post.image}
                            style={styles.lrgimage}
                          />
                        </View>
    
                        <View style={styles.postbody}>
                          <View style={styles.postheader}>
                            <Text style={styles.postext}>{post.name}</Text>
                            <Text style={styles.postsub}>{post.username}</Text>
                            <Text style={styles.postalt}>{post.time}</Text>
                          </View>
    
                          <Text style={styles.postsml}>{post.message}</Text>    

                          <View style={styles.postfooter}>
                            <View style={styles.postcomments}>
                              <Image
                                source={icons.comment}
                                style={styles.minicon}
                                tintColor='rgba(0, 0, 0, 0.2)'
                              />
                              <Text style={styles.commentext}>{post.comments} <Text style={styles.commentsub}>comments</Text></Text>
                            </View>

                            <View style={styles.postlikes}>
                              <Image
                                source={icons.like}
                                style={styles.minicon}
                                tintColor='rgba(0, 0, 0, 0.2)'
                              />
                              <Text style={styles.liketext}>{post.likes} <Text style={styles.likesub}>likes</Text></Text>
                            </View>

                            <View style={styles.postreposts}>
                              <Image
                                source={icons.retweet}
                                style={styles.minicon}
                                tintColor='rgba(0, 0, 0, 0.2)'
                              />
                              <Text style={styles.repostext}>{post.comments} <Text style={styles.repostsub}>reposts</Text></Text>
                            </View>
                          </View>                  
                        </View>  
                      </View>

                      <TouchableOpacity 
                        style={styles.comments}
                      >
                        <View style={styles.commentimage}>
                          <Image
                            source={post.image}
                            style={styles.lrgimage}
                          />                        
                        </View>
                        
                        <Text style={styles.commentext}>Show {post.comments} <Text style={styles.commentsub}>comments</Text></Text>
                      </TouchableOpacity>
                    </View>
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

  scrollView3: {
    flexDirection: 'row',
    width: '100%', 
    gap: 10,
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
    fontSize: 10,
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
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',  
    gap: 10,  
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },

  bartext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.2)',
  },

  /* Headers */

  headers: {
    width: '100%', 
    height: 100,
    paddingTop: 25,
    left: 20,
  },

  heading: {
    backgroundColor: colors.white,
    height: 40,
    padding: 10,
    borderRadius: 15,   
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',     
    shadowRadius: 20,
    margin: 10,
  },

  headertext: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.2)',
  },

  /* Posts */

  posts:{
    width: '85%',
    marginTop: 20,
    paddingBottom: 170,
  },

  post: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },

  postimage: {
    width: 35,
    height: 35,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 10,
    shadowRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },

  postext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
  },

  postsub: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
  },

  postalt: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
  },

  postsml: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    lineHeight: 24,
  },

  postbody: {
    width: '80%',
    flexDirection: 'column',
    gap: 10,
  },

  postheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  postfooter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  
  postcomments: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  commentext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
  },

  commentsub: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
  },

  postreposts: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  repostext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
  },

  repostsub: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
  },

  postlikes: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  liketext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
  },

  likesub: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
  },

  comments: {
    flexDirection: 'row',
    gap: 28,
    alignItems: 'center',
    marginTop: 30,
    left: 8,
  },

  commentimage: {
    width: 20,
    height: 20,
    borderRadius: 15,
    overflow: 'hidden',
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

export default Community;
