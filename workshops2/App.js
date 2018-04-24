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
        <View style={styles.container}>{this.renderCards()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 25,
    paddingHorizontal: 10,
    flex: 1,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    marginTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 18,
    marginTop: 3,
    color: '#999',
    fontFamily: 'Raleway',
  }
});
