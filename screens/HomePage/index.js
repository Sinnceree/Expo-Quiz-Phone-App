import React from 'react'
import { Link } from 'react-router-native';
import { StyleSheet, Text, View } from 'react-native';

export default function index() {
  return (
    <View styles={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>inQUIZator</Text>
      </View>

      <View style={styles.content}>
        
        <Link to="QuizSelect">
          <View style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Play</Text>
          </View>
        </Link>

        <View style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Options</Text>
        </View>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f263a",
  },

  content: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: "100%",
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

  homeButton: {
    backgroundColor: "#2b4059",
    borderRadius: 10,
    paddingVertical: 20,
    marginVertical: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  homeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  }
});
