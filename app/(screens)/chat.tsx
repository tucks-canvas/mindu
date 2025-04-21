import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import Add-Ons
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Import icons, colors, and images
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

// Import API URL
const API_URL = "http://10.0.2.2:5000"; // Replace with your ngrok URL if testing on a physical device

const Chat = () => {

  const router = useRouter();
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { user: input, bot: "" }]);

        try {
            console.log("Sending to Flask:", input);
            const response = await axios.post(`${API_URL}/chat`, { message: input });

            console.log("Received response from Flask:", response.data); 

            if (response.data.response) {
                setMessages([...messages, { user: input, bot: response.data.response }]);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setInput("");
  };

  const resetChat = async () => {
    try {
      await axios.post(`${API_URL}/reset`);
      setMessages([]);
    } catch (error) {
      console.error("Error resetting chat:", error);
    }
  };

  return (
    <>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />
        
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.headerbutton}
                        >
                            <Image
                                source={icons.left}
                                tintColor={colors.marguerite}
                                style={styles.smlicon}
                            />
                        </TouchableOpacity>

                        <Text style={styles.headertext}>MedBot</Text>
                    </View>

                    <View style={styles.chatarea}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {messages.map((msg, index) => (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <View style={styles.left}>
                                        <Text style={styles.user}>You</Text>

                                        <View style={styles.blobb}>
                                            <Text style={styles.text}>{msg.user}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.right}>
                                        <Text style={styles.bot}>Chatbot:</Text>

                                        <View style={styles.blobb}>
                                            <Text style={styles.text}>{msg.bot}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.message}>
                        <View style={styles.box}>
                            <TextInput
                                value={input}
                                onChangeText={setInput}
                                placeholder="Type your message..."
                                style={styles.chat}
                            />                        
                        </View>

                        <View style={styles.buttons}>
                            <TouchableOpacity 
                                onPress={sendMessage}
                                style={styles.chaticon}
                            >
                                <Image
                                    source={icons.send}
                                    tintColor={colors.white}
                                    style={styles.smlicon}
                                />
                            </TouchableOpacity>

                            
                            <TouchableOpacity 
                                onPress={resetChat}
                                style={styles.chaticon}
                            >
                                <Image
                                    source={icons.reset}
                                    tintColor={colors.white}
                                    style={styles.smlicon}
                                />
                            </TouchableOpacity>
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
        flex: 1,
        backgroundColor: colors.link,
        width: '100%',
        height: '100%',
        padding: 20,
    },

    container: {
        width: '100%',
        height: '100%',
    },

    scrollViewContent: {

    },

    /* Header */

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    headerbutton: {
        backgroundColor: colors.white,
        padding: 20,
        height: 50,
        width: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    headertext: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: colors.marguerite,
    },

    /* Chat */

    chatarea: {
        width: '100%',
        height: 650,
        paddingTop: 20,
    },

    chat: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)'
    },

    chaticon: {
        backgroundColor: colors.chetwood,
        padding: 20,
        height: 50,
        width: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    message: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    box: {
        flex: 1,
        padding: 20,
    },

    left: {
        alignItems: 'flex-start',
    },

    right: {
        alignItems: 'flex-end',
    },

    user: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: colors.chetwood,
    },

    bot: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: colors.marguerite,
    },

    buttons: {
        flexDirection: 'row',
        gap: 5,
    },

    /* Icons, and Images */

    smlicon: {
        height: 20,
        width: 20,
    }
  
  });

  export default Chat;
