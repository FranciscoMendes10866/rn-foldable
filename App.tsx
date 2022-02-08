import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  ScaledSize,
  EmitterSubscription,
} from 'react-native';

import Splash from './splash';

interface IAppState {
  dimensions: {
    window: ScaledSize;
  };
}

class App extends Component {
  dimensionsSubscription: EmitterSubscription | undefined;

  state: IAppState = {
    dimensions: {
      window: Dimensions.get('window'),
    },
  };

  onChange = ({window}: {window: ScaledSize; screen: ScaledSize}) => {
    this.setState({dimensions: {window}});
  };

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener(
      'change',
      this.onChange,
    );
  }

  componentWillUnmount() {
    this.dimensionsSubscription?.remove();
  }

  render() {
    const window = this.state.dimensions.window;

    const windowWidth = window.width;
    const windowHeight = window.height;

    const aspectRatio = windowWidth / windowHeight;
    const isAndroid = Platform.OS === 'android';

    function isFoldableScreenOpen() {
      switch (true) {
        case aspectRatio > 1.44:
          return false;
        case aspectRatio > 0.65 && aspectRatio < 1 && isAndroid:
          // Foldable Screen Portrait
          return true;
        case aspectRatio > 1 && aspectRatio < 1.44 && isAndroid:
          // Foldable Screen Landscape
          return true;
        default:
          return false;
      }
    }

    console.log('isFoldableScreenOpen', isFoldableScreenOpen());

    if (aspectRatio > 1.44) {
      return (
        <View style={styles.container}>
          <Text>Landscape</Text>
        </View>
      );
    } else if (aspectRatio > 0.65 && aspectRatio < 1 && isAndroid) {
      return (
        <View style={styles.container}>
          <Text>Foldable Screen Portrait</Text>
          <Splash />
        </View>
      );
    } else if (aspectRatio > 1 && aspectRatio < 1.44 && isAndroid) {
      return (
        <View style={styles.container}>
          <Text>Foldable Screen Landscape</Text>
          <Splash />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Portrait</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default App;
