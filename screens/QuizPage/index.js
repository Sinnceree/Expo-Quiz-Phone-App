import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import Question from "../../components/Question";

const Questions = (props) => {
  const [loading, setLoading] = useState(false); // Store the state of loading so we can wait until we fetch all data from api
  const [questions, setQuestions] = useState([]); // Stores all the quizes questions int his array
  const [current, setCurrent] = useState(0); // Store the current question theyre on
  const [correctAnswers, setCorrectAnswers] = useState(0); // Store how many correct answers they have
  const [completed, setCompleted] = useState(false); // Store the state of the current question
  const [answer, setAnswer] = useState(null); // Store their answer for the question theyre currently on
  const [selectedIndex, setSelectedIndex] = useState(null); // The index of the selected answer to compare to the correct one

  // This function makes a requestto opentdb to get quizes
  //  We then add the all the incorrect and correct answers to an array to compare them later on
  // We then update the questions state with the new questions and set loading to false to show the actual quiz
  const fetchQuestions = async () => {
    const { id } = props.match.params;
    setLoading(true);
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`);
    const questions = await response.json();

    const { results } = questions;

    results.forEach(item => {
      let tmpArr = [...item.incorrect_answers, item.correct_answer];
      item.answers = shuffleArr(tmpArr);
    });

    setQuestions(results);
    setLoading(false);
  }

  // We use this function to shuffle the array to make the possible
  // Answers randomized because usually the correct answer
  // Would always be at the bottom of the list
  const shuffleArr = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  // Resets the current quiz and fetches a new quiz from the API
  const reset = () => {
    setQuestions([]);
    setCurrent(0);
    setCorrectAnswers(0);
    setCompleted(false);
    fetchQuestions();
  }

  // Updates the selected question and index position of the answer
  const selectAnswer = (val, index) => {
    setAnswer(val);
    setSelectedIndex(index);
  }

  // We check if the question was either correct or not then move on to
  // The next question and store the correct/incorrect values
  const submitAnswer = (index, answer) => {
    const question = questions[index];
    const isCorrect = question.correct_answer === answer;

    setCorrectAnswers(isCorrect ? correctAnswers + 1 : correctAnswers);
    setCurrent(current + 1);
    setCompleted(index === 9 ? true : false);
    setAnswer(null);
    setSelectedIndex(null);
  }

  // This fetches the quiz data from API any time this componenet is "Mounted" "Loaded"
  useEffect(() => {
    fetchQuestions();
  }, []);

  const { name } = props.match.params;
  return (
    <View style={styles.container}>

      {completed && (          
        <View style={styles.header}>
          <Text style={styles.headerText}>Quiz Completed</Text>
        </View>
      )}
      <View style={styles.content}>        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Fetching questions from API, one moment...</Text>
          </View>
        )}

        {questions.length > 0 &&
          completed === false && (
            <Question
              onSelect={answer => {
                submitAnswer(current, answer);
              }}
              selectedAnswer={answer}
              selectedIndex={selectedIndex}
              setAnswer={selectAnswer}
              header={name}
              question={questions[current]}
              correctPosition={Math.floor(Math.random() * 3)}
              current={current}
            />
          )}

        <View style={{ height: "100%", justifyContent: "center", display: "flex" }}>
          {completed === true && (
            <View style={{ height: "100%", display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>Quiz Completed</Text>
              <Text style={{ color: "#fff" }}>You {correctAnswers} out of {10-correctAnswers} correct!</Text>
              <TouchableOpacity style={styles.button} onPress={reset}>
                <Text>Go Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Questions;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    
  },
  content: {
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
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

  button: {
    backgroundColor: "#2b4059",
    borderRadius: 50,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%"
  },

  loadingContainer: {
    alignItems: "center",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  loadingText: {
    color: "#fff",
    marginTop: 50
  },

  headerImg: {
    height: 20
  }
});
