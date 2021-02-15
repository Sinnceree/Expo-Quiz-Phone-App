import React from 'react';
import { Link } from 'react-router-native';
import { StyleSheet, Text, View } from 'react-native';

export default function index() {
  const topics = [
  {
    name: "General",
    category: 9
  },
  {
    name: "Books",
    category: 10
  },
  {
    name: "Films",
    category: 11
  },
  {
    name: "Music",
    category: 12
  },
  {
    name: "Politics",
    category: 24
  },
  {
    name: "Art",
    category: 25
  },
  {
    name: "History",
    category: 23
  }];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz Select</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.optionList}>
          {topics.map((topic, i) => (
            <Link to={`QuizPage/${topic.category}/${topic.name}`} key={i}>
              <View style={styles.option}>
                <Text style={styles.optionText}>{topic.name}</Text>
              </View>
            </Link>
          ))}
        </View>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f263a",
    height: "100%"
  },

  content: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: "100%",
    flexWrap: "wrap"
  },

  header: {
    height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b4059",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50
  },

  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },

  option: {
    backgroundColor: "#e78330",
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 100,
    height: 75,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10
  },

  optionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },

  optionList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
});
