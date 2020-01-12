import React from 'react';

import {
    View, TouchableWithoutFeedback,
    StyleSheet,
    Text,
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const isAndroid = Platform.OS == "android";

const StocksGridItem = (props) => {

    const isNegative = (props.item.close - props.item.open) < 0;
    return (
        <View style={styles.gridItemStyle}>
            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={styles.gridItemContainer}>
                    <View style={styles.gridCell}>
                        <Text>{props.item.date}</Text>
                    </View>
                    <View style={styles.gridCell}>
                        <Text>{props.item.open}</Text>
                    </View>
                    <View style={styles.gridCell}>
                        <Text>{props.item.close}</Text>
                    </View>
                    <View style={styles.gridCell}>
                        <Text>{props.item.high}</Text>
                    </View>
                    <View style={styles.gridCell}>
                        <Text>{props.item.low}</Text>
                    </View>
                    <View style={styles.gridCell}>
                        {
                            isNegative ? <Icon name={isAndroid ? "md-arrow-down" : "ios-arrow-down"} size={30} color="red" /> : <Icon name={isAndroid ? "md-arrow-up" : "ios-arrow-up"} size={30} color="green" />
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItemStyle: {
        padding: 3,
        backgroundColor: '#f5f5f5'
    },
    gridItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5
    },
    gridCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    }
});

export default StocksGridItem;