import * as React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiagnosisStackNavigator from './DiagnosisStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import RemediesStackNavigator from './RemediesStackNavigator';
import TabBarIcon from '../components/TabBarIcon';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Remedies"
                component={RemediesStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => 
                        <TabBarIcon focused={focused} name="ios-search" />,
                }}
            />
            <BottomTab.Screen
                name="Diagnosis"
                component={DiagnosisStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => 
                        <TabBarIcon focused={focused} name="ios-heart-half" />,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => 
                        <TabBarIcon focused={focused} name="ios-person" />,
                }}
            />
        </BottomTab.Navigator>
    )
}