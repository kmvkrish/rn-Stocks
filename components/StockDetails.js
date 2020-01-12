import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

import Modal from 'react-native-modal';

export default class StockDetails extends Component {
    constructor(props) {
        super(props);
    }

    hideModal = () => {
        this.props.hide();
    };

    render() {
        if (this.props.item == null) return null;
        return (
            <View>
                <Modal isVisible={this.props.visible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text>
                                {this.props.item.date}
                            </Text>
                        </View>
                        <View style={styles.modalFooter}>
                            <View style={styles.buttonContainer}>
                                <View style={styles.modalButton}>
                                    <TouchableWithoutFeedback onPress={this.hideModal}>
                                        <View style={styles.buttonStyle}>
                                            <Text style={{color: 'white', 'fontSize': 16, fontWeight: 'bold'}}>OK</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 5
    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalButton: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    }

});