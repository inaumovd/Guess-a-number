import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import colors from "../constans/colors";

const MainButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 20,
    },
    buttonText : {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
});