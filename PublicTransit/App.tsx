import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://www.ctabustracker.com/bustime/api/v2/getpredictions?key=KaT6fK5ENCnNwCUkuRBX3nk5d&rt=20&stpid=456&format=json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json['bustime-response']['prd'] });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleDelay(eta: string): string {
    if(eta === 'DLY') {
      return eta
    } else {
      return eta + ' min(s)'
    }
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                Route: {item.rt + ' '}
                Bus stop: {item.stpnm + ' '} 
                ETA: {this.handleDelay(item.prdctdn) + ' '}
              </Text>
            )}
          /> //end of Flatlist
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center'
  },

  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#5bff33',
    padding: 20,
    fontSize: 15,
  },

  nothing: {

  }
})
