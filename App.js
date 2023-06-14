import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LandingPage from "./LandingPage";
import Game from "./Game";
import FinalPage from "./FinalPage";
import words from "./words.json"

const App = () => {
  const [wordCount, setWordCount] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const startGame = () => {
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const shuffledWords = shuffleArray(words)
  

  return (
    <View style={styles.container}>
      {!gameStarted && !gameCompleted && (
        <LandingPage wordCount={wordCount} setWordCount={setWordCount} startGame={startGame} />
      )}
      {gameStarted && !gameCompleted && (
        <Game
          wordCount={wordCount}
          words={shuffledWords}
          setCorrectCount={setCorrectCount}
          setIncorrectCount={setIncorrectCount}
          setGameCompleted={setGameCompleted}
        />
      )}
      {gameCompleted && (
        <FinalPage
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          playAgain={handlePlayAgain}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
