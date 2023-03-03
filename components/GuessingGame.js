import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';

const trophyImage = require('../assets/trophy.png');

const GuessingGame = () => {
    const [fontsLoaded] = useFonts({
        'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      });
    // State variables
    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [rounds, setRounds] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [guessesFeedback, setGuessesFeedback] = useState([]);

    

    // Function to handle guess input
    const handleGuessInput = (inputValue) => setGuess(inputValue);

    // Function to handle guess submission
    const handleGuessSubmission = () => {
        const guessedNumber = parseInt(guess);
        if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
            setFeedback('Please enter valid data');
            return;
        }
        if (guessedNumber === targetNumber) {
            setFeedback(`Congratulations, you guessed the number ${targetNumber} in ${rounds + 1} rounds!`);
            setGameOver(true);
            setRounds(rounds + 1);
            return;
        }
        setRounds(rounds + 1);
        setGuesses([guessedNumber, ...guesses]);
        setGuessesFeedback([`${guessedNumber > targetNumber ? 'Too high' : 'Too low'}`, ...guessesFeedback]);
        setFeedback(`Your guess is too ${guessedNumber > targetNumber ? 'high' : 'low'}!`);
        setGuess(''); // clear input field
    };


    // Function to handle new game start
    const handleNewGameStart = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setRounds(0);
        setGameOver(false);
        setFeedback('');
        setGuesses([]);
        setGuessesFeedback([]);
    };

    // Function to handle submit button or Enter key press
    const handleGuessSubmit = (event) => {
        event.preventDefault();
        handleGuessSubmission();
    };

    useEffect(() => {
        const hideSplash = async () => {
          await SplashScreen.hideAsync();
        };
        if (!fontsLoaded) {
          SplashScreen.preventAutoHideAsync();
        } else {
          hideSplash();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }


    return (
        <View>
            <Text style={[styles.name, { fontFamily: 'open-sans-bold' }]}>KEVIN BELL</Text>
            <Text style={[styles.instructions, { fontFamily: 'open-sans' }]}>Guess a number{'\n'} between 1 and 100:</Text>
            {gameOver ? null : (
                <TextInput
                    style={styles.textInput}
                    value={guess}
                    onChangeText={handleGuessInput}
                    onSubmitEditing={handleGuessSubmit}
                    placeholder="Enter your guess"
                    keyboardType="numeric"
                />
            )}
            {gameOver ? null : <Button
                title="Check My Guess"
                onPress={handleGuessSubmission}
                color="green" />}
            {feedback ? <Text style={styles.textAlignCenter}>{feedback}</Text> : null}
            {gameOver && (
                <View>
                    <Image source={trophyImage} style={styles.image} />
                    <Text style={styles.textAlignCenter}>Game Over!</Text>
                    <Button
                        title="New Game"
                        onPress={handleNewGameStart}
                        color="green" />
                </View>
            )}
            {guesses.length > 0 && (
                <View>
                    <Text style={styles.boldText}>Past guesses:</Text>
                    {guesses.map((guess, index) => (
                        <View key={index}>
                            <Text style={styles.textAlignCenter}>{`${guesses.length - index}. ${guess}`}</Text>
                            {guessesFeedback[index] && (
                                <Text style={styles.textAlignCenter}>{guessesFeedback[index]}</Text>
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    textAlignCenter: {
        textAlign: 'center',
        padding: 1,
    },
    name: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold',
    },
    instructions: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'open-sans',
    },
    boldText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
    },
    view: {
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        padding: 30,
    },
});

export default GuessingGame;
