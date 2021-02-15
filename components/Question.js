import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from "react-native";


const Question = (props) => {1
  const { selectedAnswer, selectedIndex } = props;

  const generateChoices  = () => {
    let elementsArray = [];
    let abcArr = ["A", "B", "C", "D"];
    
    props.question.answers.forEach((item, index) => {
      elementsArray.push(
        <TouchableOpacity key={index} onPress={() => props.setAnswer(item, index)} style={[styles.answerBox, selectedIndex === index && styles.selectedChoice]}>
          <View style={styles.innerBox}>
            <View style={[styles.circleHighlight, selectedIndex === index && {backgroundColor: "#fff"}]}><Text>{abcArr[index]}</Text></View>
            <Text style={styles.radioText}>{item}</Text>
          </View>
        </TouchableOpacity>
      )
    });
    return elementsArray;
  }

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.header}</Text>
        <Text style={styles.questionsRemainingText}>
          {props.current + 1} / 10
        </Text>
      </View>
      
      <View style={styles.content}>

        <ImageBackground source={require("../assets/QuestionMark.png")} style={styles.image}>
        </ImageBackground>
      
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          {props.question.question}
        </Text>
        
        {generateChoices()}

        <TouchableOpacity style={styles.button} onPress={() => {
          if (!props.selectedAnswer) return Alert.alert(null, "Select atleast one answer");
          props.onSelect(selectedAnswer)
        }}>
          <Text style={styles.buttonText}>Submit Answser</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default Question;

const styles = StyleSheet.create({
  answerBox: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 10,
    paddingHorizontal: 15
  },
  content: {
    height: "100%",
    paddingHorizontal: 20,
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#2b4059",
    borderRadius: 50,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  selectedChoice: {
    backgroundColor: "#e78330",
    color: "#fff",
  },
  innerBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  circleHighlight: {
    backgroundColor: "#e78330",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 15
  },
  questionsRemainingText: {
    fontSize: 13, 
    color: "#fff", 
    textAlign: "left",
    position: "absolute",
    left: 35,
    bottom: 15
  },

  image: {
    alignSelf: "center",
    resizeMode: "center",
    justifyContent: "center",
    height: 75,
    width: 75,
    marginBottom: 20
  }
});
