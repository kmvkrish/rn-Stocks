/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import Loader from './components/Loader';
import DateControls from './components/DateControls';

import StocksGrid from './components/StocksGrid';

import Icon from 'react-native-vector-icons/Ionicons';

const columns = [{
  id: "date",
  name: "Date",
  isSorted: true,
  asc: false
}, {
  id: "open",
  name: "Open",
  isSorted: false,
  asc: false
},
{
  id: "close",
  name: "Close",
  isSorted: false,
  asc: false
},
{
  id: "high",
  name: "High",
  isSorted: false,
  asc: false
},
{
  id: "low",
  name: "Low",
  isSorted: false,
  asc: false
},
{
  id: "",
  name: "",
  isSorted: false,
  asc: false
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.stocks = [];
    this.fromDate = "";
    this.toDate = "";
    this.state = {
      isLoading: false,
      stocksData: [],
      columns: columns
    };
  }

  fetchStocksData = async (fromDate, toDate) => {
    let stocksData = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      const stocks = await this.getStocksData(currentPage);
      totalPages = stocks.totalPages;
      stocksData.push(...stocks.data);
      while (currentPage != totalPages) {
        currentPage++;
        const res = await this.getStocksData(currentPage);
        stocksData.push(...res.data);
      }
      this.stocks = stocksData;
      this.setState({
        isLoading: false
      });
      const filteredData = this.filterData(stocksData, fromDate, toDate);
      this.setState({
        stocksData: filteredData
      });
    } catch (error) {
      console.log("Error", error);
      this.setState({
        isLoading: false
      });
    }
  };

  filterData = (stocks, fromDate, toDate) => {
    const filteredData = stocks.filter(item => {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const itemDate = new Date(item.date);
      return (itemDate >= from && itemDate <= to);
    });
    return filteredData;
  }

  getStocksData = async (currentPage) => {
    const API_URL = "https://jsonmock.hackerrank.com/api/stocks?page=";
    let stocksData = {};
    try {
      const response = await fetch(API_URL + currentPage);
      const data = await response.json();
      stocksData = {
        status: response.status,
        totalPages: data.total_pages,
        data: data.data
      };
    } catch (error) {
      console.log("Response Error", error);
    }
    return stocksData
  };

  filterStocks = (fromDate, toDate) => {
    this.fromDate = fromDate;
    this.toDate = toDate;
    if (fromDate.length > 0 && toDate.length > 0) {
      this.setState({
        isLoading: true
      });
      this.fetchStocksData(fromDate, toDate);
    }
  }

  resetColumns() {
    columns.forEach(column => {
      column.asc = false;
      column.isSorted = false;
    });
  }

  sortData = (index) => {
    if (this.state.stocksData.length <= 0) return; 
    this.setState({
      isLoading: true
    });

    const key = columns[index].id;
    const asc = columns[index].asc;
    const isSorted = columns[index].isSorted;

    this.resetColumns();
    columns[index].isSorted = true;
    columns[index].asc = !asc;
    const data = this.filterData(this.stocks, this.fromDate, this.toDate).sort((a, b) => {
      if (isSorted && asc) {
        if (key == "date") {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return bDate < aDate;
        }
        return b[key] < a[key];
      } else {
        if (key == "date") {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate < bDate;
        }
        return a[key] < b[key];
      }
    });
    setTimeout(() => {
      this.setState({
        stocksData: data,
        columns: columns,
        isLoading: false 
      });
    }, 2000);
    
  }

  renderGridHeader = () => {
    const headerItems = this.state.columns.map((item, index) => {
      return (
        <View style={styles.headerItemStyle}>
          <TouchableWithoutFeedback onPress={() => { this.sortData(index) }}>
            <View style={styles.buttonStyle}>
              <Text style={styles.headerItemText}>{item.name}</Text>
              {
                item.isSorted ? (
                  <Icon name={ item.asc ? "md-arrow-dropdown" : "md-arrow-dropup"} size={12} color="black"/>
                ) : null
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    });
    return (
      <View style={styles.headerStyle}>
        {headerItems}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.isLoading} />
        <View style={styles.dateControlsContainer}>
          <DateControls filterData={this.filterStocks} />
        </View>
        <View style={styles.gridContainer}>
          {this.renderGridHeader()}
          <StocksGrid stocksData={this.state.stocksData} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    marginBottom: 15
  },
  dateControlsContainer: {
    flex: 3,
  },
  gridContainer: {
    flex: 7,
    paddingTop: 10
  },
  headerStyle: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  headerItemStyle: {
    flex: 1,
    borderWidth: 0.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerItemText: {
    color: 'black',
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default App;
