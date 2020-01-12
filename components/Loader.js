import React from 'react';

import {
    View, Modal, ActivityIndicator, StyleSheet
} from 'react-native';

const Loader = (props) => {

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={props.loading}
            onRequestClose={() => { }}
        >
            <View style={styles.loaderContainerView}>
                <View style={[styles.activityIndicatorWrapper]}>
                    <ActivityIndicator
                        size="large"
                        color="blue"
                        style={{ zIndex: 100 }}
                        animating={props.loading} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    loaderContainerView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    loaderView: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    activityIndicatorWrapper: {
        backgroundColor: 'white',
        height: 100,
        width: 100,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default Loader;