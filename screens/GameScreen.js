import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    ScrollView
} from 'react-native';
import colors from "../constans/colors";
import NumberContainer from "../components/Number";
import Card from "../components/Card";
import Icon from 'react-native-vector-icons/FontAwesome';
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum;
    }
};

const GameContainer = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoise);
    const [currentGuess, setCurrnetGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHight = useRef(100);

    const {useChoise, onGameoVer} = props;

    useEffect(()=>{
       if (currentGuess === props.userChoise) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, useChoise, onGameoVer]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoise) ||
            (direction === 'greater' && currentGuess > props.userChoise)) {
            Alert.alert('Dont lie!', 'You know this is wrond', [{text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }

        if (direction === 'lower') {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrnetGuess(nextNumber);
        setPastGuesses(currPastGueses => [nextNumber,...currPastGueses]);
    };

    return (
        <View style={styles.screen}>
            <Text>Computer's guess</Text>

            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Icon name='chevron-down'/>
                </MainButton>
                <MainButton title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Icon name='chevron-up'/>
                </MainButton>
            </Card>
            <ScrollView>
                {pastGuesses.map(guess => (
                    <View key={guess}>
                        <Text>{guess}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default GameContainer;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});