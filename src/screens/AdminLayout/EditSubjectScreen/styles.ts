import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
    },
    input: {
        backgroundColor: 'white',
        width: 250,
        textAlignVertical: 'center',
        borderWidth: 1,
        paddingVertical: 0,
    },
    button: {
        width: 150,
        height: 40,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: '#B0AFDF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    disabledButton: {
        elevation: 5,
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 5,
    },
    errorText: {
        color: 'red',
    },
});
