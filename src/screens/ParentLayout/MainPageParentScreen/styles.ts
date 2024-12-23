import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    itemsContainer: {
        marginTop: 25,
        flexDirection: 'column',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#B0AFDF',
        height: 70,
        width: 150,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
    },
});
