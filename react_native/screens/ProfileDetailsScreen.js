import * as React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { Badge } from 'react-native-elements';

export default function ProfileDetailsScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{fontSize:15, color: "#5a5d81"}}>
                I have a history of...
            </Text>
            <View style={{
                paddingVertical: 10, 
                flexDirection: "row", flexWrap: "wrap", 
                justifyContent: "center"
            }}>
                {
                    data.history.map((x, i) => {
                        return (
                            <Badge 
                                badgeStyle={{
                                    backgroundColor: "#dbdbdb", 
                                    borderColor: "#cccccc",
                                    borderWidth: 0.5,
                                    elevation: 1,
                                    padding: 14, 
                                    margin: 3, 
                                }} 
                                key={i} 
                                value={x}
                                textStyle={{
                                    color: "#555"
                                }}
                            />
                        ) 
                    })
                }
            </View>
        </View>
    )
}