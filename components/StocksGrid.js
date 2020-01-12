import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import StocksGridItem from './StocksGridItem';

export default class StocksGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            selectedItem: null
        };
    }

    renderItem({item, index}) {
        return <StocksGridItem item={item} key={index} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.stocksData}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#f5f5f5'
    }
});