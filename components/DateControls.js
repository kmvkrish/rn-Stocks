import React, { Component } from 'react';
import Card from './Card';
import {
    View, StyleSheet, Text, TouchableWithoutFeedback
} from 'react-native';

import DatePicker from 'react-native-datepicker';

export default class DateControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: '',
            toDate: ''
        };
    }

    onFromDateChange = (date) => {
        this.setState({
            fromDate: date
        });
    }

    onToDateChange = (date) => {
        this.setState({
            toDate: date
        });
    }

    onSubmit = () => {
        this.props.filterData(this.state.fromDate, this.state.toDate);
    }

    render() {
        const { fromDate, toDate } = this.state;
        return (
            <Card style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.fromDateContainer}>
                        <Text style={styles.labelStyle}>Select From Date:</Text>
                        <DatePicker
                            style={styles.datepickerStyle}
                            date={fromDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={this.onFromDateChange}
                        />
                    </View>
                    <View style={styles.toDateContainer}>
                        <Text style={styles.labelStyle}>Select To Date:</Text>
                        <DatePicker
                            style={styles.datepickerStyle}
                            date={toDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={this.onToDateChange}
                        />
                    </View>
                </View>
                <View style={styles.filterButtonView}>
                    <TouchableWithoutFeedback onPress={this.onSubmit}>
                        <View style={styles.buttonView}>
                            <Text style={styles.buttonText}>Filter Stocks</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    fromDateContainer: {
        flex: 1,
        paddingLeft: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    toDateContainer: {
        flex: 1,
        paddingRight: 15,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    datepickerStyle: {
        width: 180,
        height: 50,
    },
    labelStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    filterButtonView: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 160,
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'green'
    },
    buttonView: {
        borderRadius: 10,
        backgroundColor: 'green',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
});