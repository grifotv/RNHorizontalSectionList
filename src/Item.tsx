import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'tomato',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export type ItemData = {
    id: string,
    title: string,
}

type Props = ItemData & {
    size: number,
};

export const Item:React.FC<Props> = React.memo(({ title, size }) => {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
})