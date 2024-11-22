import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
    
    const theme = useTheme();
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.onSurface, tabBarInactiveTintColor: theme.colors.onSurfaceDisabled, tabBarActiveBackgroundColor: theme.colors.inversePrimary, tabBarInactiveBackgroundColor: theme.colors.background, headerTintColor: theme.colors.onBackground, headerStyle: { backgroundColor: theme.colors.background }}}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color}
               />,
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
