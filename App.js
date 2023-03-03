import React from 'react';
import { View, StyleSheet } from 'react-native';
import GuessingGame from './components/GuessingGame';

const App = () => {
  return (
    <View style = {styles.rootContainer}>
      <GuessingGame />
    </View>
  );
};

let styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
});

export default App;