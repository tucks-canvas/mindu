import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

// Import Tabs
import Home from './home';
import Chat from './chat';
import Community from './community';
import Profile from './profile';

// Import Images, Icons, and Colors
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

const Tab = createBottomTabNavigator();

const TabIcon = ({ source, focused }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={source}
        style={{
          width: focused ? 23 : 20,
          height: focused ? 23 : 20,
          top: 20,
          backgroundColor: 'transparent',
          tintColor: focused ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)',
        }}
      />
    </View>
);

const Tabs = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            flexGrow: 1,
            backgroundColor: colors.azure,
            position: 'absolute',
            width: '90%',
            height: '9%',
            margin: 20,
            borderRadius: 50,
            borderColor: 'transparent',
            elevation: 50,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Home':
              iconSource = icons.home;
              break;
            case 'Chat':
              iconSource = icons.chat;
              break;
            case 'Community':
              iconSource = icons.community;
              break;
            case 'Profile':
              iconSource = icons.profile;
              break;
            default:
              iconSource = icons.home;
          }
          return <TabIcon source={iconSource} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
