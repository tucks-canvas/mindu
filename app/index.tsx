import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './(screens)/home';

const Stack = createStackNavigator();

const Index = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Index;
