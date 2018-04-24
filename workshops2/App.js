import React from 'react';
import { Font, AppLoading, Permissions, MapView } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import data from './data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: null,
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

  showCountry = ({ latitude, longitude }) => this.setState({
    region: {
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    }
  });

  closeMapView = () => this.setState({ region: null });

  renderCard = ({ name, country, region }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => this.showCountry(region)}
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

  renderMapView = () => (
    <View style={styles.topWrapper}>
      <View style={styles.mapWrapper}>
        <View style={styles.roundWrapper}>
          <MapView
            region={this.state.region}
            style={styles.map}
          >
          </MapView>
          <TouchableOpacity
            style={styles.button}
            onPress={this.closeMapView}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>close the map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  render() {
    const { loading, region } = this.state;

    if (loading) return <AppLoading />;

    return (
      <View style={styles.center}>
        {region !== null && this.renderMapView()}
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
  },
  map: {
    alignSelf: 'stretch',
    flex: 1,
  },
  topWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  roundWrapper: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: 10000,
  },
  mapWrapper: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width - 50,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 1000000,
    overflow: 'hidden',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Raleway',
    textAlign: 'center',
    color: '#000',
  },
});
