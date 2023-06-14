import { VictoryPie } from 'victory-native';
import Svg from 'react-native-svg';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FinalPage = ({ correctCount, incorrectCount, playAgain }) => {
  const data = [
    { x: 'Correct', y: correctCount },
    { x: 'Incorrect', y: incorrectCount },
  ];

  const correctPercentage = Math.round((correctCount / (correctCount + incorrectCount)) * 100);
  const incorrectPercentage = Math.round((incorrectCount / (correctCount + incorrectCount)) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.finalTitle}>Game Over</Text>
      {/* <Svg style={styles.chartContainer}>
        <VictoryPie
          data={data}
          colorScale={['green', 'red']}
          innerRadius={70}
          labelRadius={100}
        />
      </Svg> */}
      <Text style={styles.statsText}>Stats:</Text>
      <Text style={styles.statsText}>
        Correct: {correctCount} ({correctPercentage}%)
      </Text>
      <Text style={styles.statsText}>
        Incorrect: {incorrectCount} ({incorrectPercentage}%)
      </Text>
      <TouchableOpacity style={styles.playAgainButton} onPress={playAgain}>
        <Text style={styles.playAgainButtonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  finalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    height: 200,
  },
  statsText: {
    fontSize: 18,
    marginVertical: 10,
  },
  playAgainButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinalPage;
