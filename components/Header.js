import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import colors from "../constans/colors";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});