import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RemediesScreen from '../screens/RemediesScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export default function RemediesStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Conditions and Remedies'
                component={RemediesScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='Details'
                component={DetailsScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}
