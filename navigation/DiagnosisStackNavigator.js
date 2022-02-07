import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from '../screens/CameraScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator();

export default function DiagnosisStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Camera'
                component={CameraScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Results'
                component={ResultsScreen}
                options={{
                    headerShown: true,
                    title: "Here's what we think"
                }}
            />
        </Stack.Navigator>
    )
}
