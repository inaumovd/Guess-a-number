import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constans/colors";
import Number from "../components/Number";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3)

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputhandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 3);
        };
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const confirmInputhandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
                [{text: 'Ok', style: 'destructive', onPress: resetInputhandler}])
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(parseInt(enteredValue));
        Keyboard.dismiss();
    };

    let confirmOutput;

    if (confirmed) {
        confirmOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <Number>{selectedNumber}</Number>
                <MainButton onPress={()=>{props.startGameHandler(selectedNumber)}}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a new game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a number</Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <MainButton onPress={resetInputhandler} color={colors.accent}>
                                        Reset
                                    </MainButton>
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <MainButton onPress={confirmInputhandler} color={colors.primary}>
                                        Confirm
                                    </MainButton>
                                </View>
                            </View>
                        </Card>
                        {confirmOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingHorizontal: 15,
    },
    inputContainer: {
        width: '90%',
        minWidth: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 50,
        textAlign: 'center',
        height: 35
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});
