import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ProfileEditScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text>
                Edit
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})