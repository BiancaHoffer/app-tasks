import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, TaskItem } from './estyle';

export function TaskList( {data, deleteItem, editItem} ) {
  return(
    <Container>
      <TouchableOpacity onPress={() => deleteItem(data.key)}>
        <MaterialCommunityIcons name="delete-off-outline" size={27} color="#593942" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => editItem(data)}>
        <TaskItem>{data.nome}</TaskItem>
      </TouchableOpacity>
    </Container>
  )
}