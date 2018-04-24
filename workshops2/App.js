import React from 'react';
import { Font, AppLoading, Permissions } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import data from './data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Raleway': require('./assets/Raleway-Light.ttf')
    });
    const response = await Permissions.askAsync(Permissions.LOCATION);
    if (response.status !== 'granted') throw "Jebło :<<";
    this.setState({ loading: false });
  }

  renderCard = (
    { name, country, region: { latitude, longitude }}
  ) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {}}
    >
      <Text style={styles.header}>{name}</Text>
      <Text style={styles.subheading}>{country}</Text>
    </TouchableOpacity>
  );

  renderCards = () => (
    <View style={styles.container}>
      {data.map(dish => (
        <View key={dish.name}>
          {this.renderCard(dish)}
        </View>
      ))}
    </View>
  );

  render() {
    const { loading } = this.state;

    if (loading) return <AppLoading />;

    return (
      <View style={styles.center}>
        <View style={styles.cotainer}>{this.renderCards()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  kwadracik: {
    width: 50,
    height: 50,
  },
});
