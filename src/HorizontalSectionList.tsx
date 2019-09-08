import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Item, ItemData } from './Item';

const SIZE = 210;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    content: {
        flex: 1,
        backgroundColor: 'rgba(255,0,0,0.1)',
    },
    sectionTitle: {
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: 24,
        fontWeight: '600',
        color: 'blue',
    },
});

export type Section = {
    id: string;
    title: string;
    data: ItemData[];
};

type Props = {
    sections: Section[];
};


export const HorizontalSectionList:React.FC<Props> = React.memo(({ sections }) => {
    const animatedScrollXRef = React.useRef(new Animated.Value(0));

    const keyExtractor = React.useCallback((item) => {
      return item.id;
    }, []);

    const renderItem = React.useCallback(({ item }) => {
        return <Item {...item} size={SIZE} />;
    }, []);

    const data = React.useMemo(() => {
        let sectionData:ItemData[] = [];
        sections.forEach(section => {
            sectionData = [...sectionData, ...section.data];
        })
        return sectionData;
    }, [sections]);

    const renderSectionTitles = React.useCallback(() => {
        let numItems = 0;
        return sections.map(section => {
            const currentX = 10 + numItems * SIZE;
            numItems += section.data.length;
            const nextX = 10 + numItems * SIZE;

            const x0 = animatedScrollXRef.current.interpolate({
                inputRange: [nextX - 100, nextX],
                outputRange: [0, -100],
                // extrapolate: 'clamp',
                extrapolateLeft: 'clamp',
            });

            const x1 = animatedScrollXRef.current.interpolate({
                inputRange: [0, currentX],
                outputRange: [currentX, 10],
                extrapolate: 'clamp',
            });

            const translateX = Animated.add(x0, x1);

            return (
                <Animated.Text
                    key={section.id}
                    style={[styles.sectionTitle, { transform: [{ translateX }]}]}
                >
                    {section.title}
                </Animated.Text>
            );
        });
    }, [sections]);

    return (
        <View style={styles.container}>
            {renderSectionTitles()}
            <Animated.FlatList
                style={styles.content}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: animatedScrollXRef.current } } }],
                    { useNativeDriver: true },
                )}
            />
        </View>
    );
})