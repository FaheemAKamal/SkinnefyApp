import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='Edit Profile'
                component={ProfileEditScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}
