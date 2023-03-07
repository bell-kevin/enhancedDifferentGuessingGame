import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

let trophyImage = require('../assets/trophy.png');

let GuessingGame = () => {
    let [fontsLoaded] = useFonts({
        'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });
    // State variables
    let [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
    let [guess, setGuess] = useState('');
    let [rounds, setRounds] = useState(0);
    let [gameOver, setGameOver] = useState(false);
    let [feedback, setFeedback] = useState('');
    let [guesses, setGuesses] = useState([]);
    let [guessesFeedback, setGuessesFeedback] = useState([]);



    // Function to handle guess input
    let handleGuessInput = (inputValue) => setGuess(inputValue);

    // Function to handle guess submission
    let handleGuessSubmission = () => {
        let guessedNumber = parseInt(guess);
        if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
            setFeedback('Please enter valid data');
            return;
        }
        if (guessedNumber === targetNumber) {
            setFeedback(`Congrats! Number ${targetNumber} guessed in ${rounds + 1} rounds!`);
            setGameOver(true);
            setRounds(rounds + 1);
            return;
        }
        setRounds(rounds + 1);
        setGuesses([guessedNumber, ...guesses]);
        setGuessesFeedback([`${guessedNumber > targetNumber ? 'Too high' : 'Too low'}`, ...guessesFeedback]);
        setFeedback(`Guess is too ${guessedNumber > targetNumber ? 'HIGH' : 'LOW'}!`);
        setGuess(''); // clear input field
    };


    // Function to handle new game start
    let handleNewGameStart = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setRounds(0);
        setGameOver(false);
        setFeedback('');
        setGuesses([]);
        setGuessesFeedback([]);
    };

    // Function to handle submit button or Enter key press
    let handleGuessSubmit = (event) => {
        event.preventDefault();
        handleGuessSubmission();
    };

    useEffect(() => {
        let hideSplash = async () => {
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
            <Text style={[styles.instructions, { fontFamily: 'open-sans' }]}>Guess a number{'\n'} between 1 and 100</Text>
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
            {gameOver ? null : <TouchableOpacity onPress={handleGuessSubmission} style={styles.button}><Text style={styles.buttonText}>Check My Guess</Text></TouchableOpacity>}
            {feedback ? <TouchableOpacity style={styles.hint}><Text style={styles.outputText}>{feedback}</Text></TouchableOpacity> : null}
            {gameOver ?
                <TouchableOpacity
                    onPress={handleNewGameStart}
                    style={styles.button}><Text
                        style={styles.buttonText}>NEW GAME</Text></TouchableOpacity> : null}
            {gameOver ?
                <Ionicons
                    name="trophy"
                    size={100}
                    color="gold"
                    alignSelf="center"
                /> : null}
            <View style={styles.guessesContainer}>
                {guesses.map((guess, index) => (
                    <View key={index} style={styles.guesses}>
                        <Text style={[styles.guessesText, { fontFamily: 'open-sans', textAlign: 'center' }]}>{guess}</Text>
                        <Text style={[styles.guessesText, { fontFamily: 'open-sans', textAlign: 'center' }]}>{guessesFeedback[index]}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

let styles = StyleSheet.create({
    name: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        marginTop: 50,
    },
    instructions: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    textInput: {
        width: 200,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
        textAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    },
    feedback: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'green',
        width: 200,
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    outputText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
    guessesContainer: {
        marginTop: 20,
    },
    guesses: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        alignSelf: 'center',
    },
    guessesText: {
        fontSize: 20,
    },
    hint: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center',
    },
});

export default GuessingGame;
