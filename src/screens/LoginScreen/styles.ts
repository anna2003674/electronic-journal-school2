import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aunthContainer: {
        alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 500,
    },
    input: {
        backgroundColor: 'white',
        margin: 5,
        width: 250,
        textAlignVertical: 'center',
        borderWidth: 1,
        paddingVertical: 0,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#969ADF',
        height: 40,
        width: 150,
        borderRadius: 50,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    disabledButton: {
        alignSelf: 'center',
        backgroundColor: '#969ADF',
        height: 40,
        width: 150,
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'center',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        margin: 20,
    },
});
