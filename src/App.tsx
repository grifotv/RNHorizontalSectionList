import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { HorizontalSectionList, Section } from './HorizontalSectionList';

const SECTIONS:Section[] = [
  {
    id: 'group0',
    title: 'group0',
    data: [
      {
        id: '0',
        title: '0'
      },
      {
        id: '1',
        title: '1'
      }
    ]
  },
  {
    id: 'group1',
    title: 'group1',
    data: [
      {
        id: '2',
        title: '2',
      },
      {
        id: '3',
        title: '3',
      },
      {
        id: '4',
        title: '4',
      }
    ]
  },
  {
    id: 'group2',
    title: 'group2',
    data: [
      {
        id: '5',
        title: '5',
      }
    ]
  },
  {
    id: 'group3',
    title: 'group3',
    data: [
      {
        id: '6',
        title: '6',
      },
      {
        id: '7',
        title: '7',
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
});

type Props = {};

export const App:React.FC<Props> = React.memo(() => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Header</Text>
          <HorizontalSectionList sections={SECTIONS} />
          <Text style={styles.title}>Footer</Text>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
});