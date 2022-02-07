import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.post ? 45 : 30}
      style={{ marginBottom: props.post ? 0 : -5 }}
      color={props.focused ? "#2f95dc" : "#ccc"}
    />
  );
}
