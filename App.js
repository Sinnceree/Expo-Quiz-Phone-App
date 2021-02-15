import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, BackButton } from 'react-router-native'
import QuizPage from "./screens/QuizPage";
import HomePage from "./screens/HomePage";
import QuizSelect from "./screens/QuizSelect";
export default class App extends React.Component {
  

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <BackButton />
          <Route path="/QuizPage/:id/:name" component={QuizPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/QuizSelect" component={QuizSelect} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    marginTop: 22,
    backgroundColor: "#1f263a",
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold"
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});
