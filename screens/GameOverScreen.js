import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import colors from "../constans/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Game is over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                    // source={{uri: 'https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg'}}
                    // resizeMode="cover"
                />
            </View>
            <Text style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number
                <Text style={styles.highlight}> {props.userNumber}</Text>
            </Text>
            <MainButton onPress={props.onRestart}>
                NEW GAME
            </MainButton>
        </View>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 20
    },
    highlight: {
        color: colors.primary
    },
    resultText: {
        textAlign: 'center'
    }
});