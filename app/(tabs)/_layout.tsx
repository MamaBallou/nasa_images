import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
            }}
          />
          <Tabs.Screen
            name="image_list"
            options={{
              title: 'All Images',
              tabBarIcon: ({ color }) => <MaterialIcons size={28} name="image" color={color} />,
            }}
          />
        </Tabs>
      );    
}
