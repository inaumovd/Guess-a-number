import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert
} from 'react-native';
import colors from "../constans/colors";
import NumberContainer from "../components/Number";
import Card from "../components/Card";

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

    const [currentGuess, setCurrnetGuess] = useState(
        generateRandomBetween(1, 100, props.userChoise)
    );

    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHight = useRef(100);

    const {useChoise, onGameoVer} = props;

    useEffect(()=>{
       if (currentGuess === props.userChoise) {
            props.onGameOver(rounds);
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
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrnetGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>Computer's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
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