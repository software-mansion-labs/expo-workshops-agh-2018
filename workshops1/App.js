import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderForm: false,
      input: "",
      id: 3,
      movies: [{
        id: 1,
        title: 'Film nr 1'
      }, {
        id: 2,
        title: 'Inny film, też spoko, ale trochę przydługi'
      }]
    };
  }

  onShowList = () => this.setState({ shouldRenderForm: true });

  onButtonPress = () => {
    const { movies, id, input } = this.state;

    if (input !== '') {
      this.setState({
        input: '',
        id: id + 1,
        shouldRenderForm: false,
        movies: [
          ...movies,
          { id: id, title: input }]
      })
    }
  }

  onXPress = id => {
    const movies = this.state.movies
      .filter(movie => movie.id !== id);

    this.setState({ movies });
  }

  onTextChange = input => this.setState({ input });

  keyExtractor = (item, index) => `klucz-${item.id}`;

  renderItem = ({ item }) =>
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity
        style={styles.buttonX}
        onPress={() => this.onXPress(item.id)}
      >
        <Text style={styles.buttonTextX}>x</Text>
      </TouchableOpacity>
    </View>

  renderForm = () => (
    <View style={styles.box}>
      <TextInput
        style={[styles.input, styles.itemText]}
        onChangeText={this.onTextChange}
        value={this.state.input}
      />
      <TouchableOpacity
        onPress={this.onButtonPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Dodaj film!</Text>
      </TouchableOpacity>
    </View>
  );

  renderList = () => (
    <View>
      <TouchableOpacity
        onPress={this.onShowList}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Chcę dodać film!</Text>
      </TouchableOpacity>
      <FlatList
        data={this.state.movies}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.shouldRenderForm
          ? this.renderForm()
          : this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  box: {
    width: '100%',
    paddingHorizontal: 30,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff000',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#999',
  },
  button: {
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  buttonX: {
    height: 50,
    width: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonTextX: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    height: 50,
    justifyContent: 'center',
  }
});
