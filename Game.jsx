import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Speech from 'expo-speech';

const Game = ({ wordCount, words, setCorrectCount, setIncorrectCount, setGameCompleted }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    Speech.speak(words[wordIndex].portuguese, { language: 'pt-BR' });
  }, [wordIndex]);

  const handleFlipCard = () => {
    setFlipped(!flipped);
  };

  const handleNextWord = () => {
    if (wordIndex < wordCount - 1) {
      setWordIndex(wordIndex + 1);
      setFlipped(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleAnswer = (answer) => {
    if (answer === 'correct') {
      setCorrectCount((prevCount) => prevCount + 1);
    } else if (answer === 'incorrect') {
      setIncorrectCount((prevCount) => prevCount + 1);
    }

    handleNextWord();
  };

  const renderFlashCard = () => {
    const currentWord = words[wordIndex];
    const { portuguese, english } = currentWord;

    return (
      <TouchableOpacity
        style={styles.flashCard}
        onPress={handleFlipCard}
        activeOpacity={1}
      >
        <Text style={styles.wordText}>
          {flipped ? english : portuguese}
        </Text>
        <TouchableOpacity onPress={() => Speech.speak(portuguese, { language: 'pt-BR' })}>
          <Icon name="volume-up" type="font-awesome" size={24} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderFlashCard()}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer('incorrect')}
        >
          <Icon name="times" type="font-awesome" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer('correct')}
        >
          <Icon name="check" type="font-awesome" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  flashCard: {
    width: 300,
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },
};

export default Game;
