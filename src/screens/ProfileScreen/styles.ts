import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
    },
    containerScroll: {
        flex: 1,
        backgroundColor: '#C5D0D0',
    },
    infoContainer: {
        backgroundColor: '#CBBE9B',
        padding: 5,
        borderRadius: 5,
        width: 300,
        height: 250,
        justifyContent: 'center',
    },
    passwordContainer: {
        backgroundColor: '#C1C2D2',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        width: 300,
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
    buttonPassword: {
        alignSelf: 'center',
        backgroundColor: '#969ADF',
        height: 40,
        width: 200,
        borderRadius: 50,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    disabledButtonPassword: {
        elevation: 5,
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        margin: 5,
        width: 250,
        textAlignVertical: 'center',
        borderWidth: 1,
        paddingVertical: 0,
    },
    header: {
        fontSize: 18,
        fontWeight: 400,
    },
    errorText: {
        color: 'red',
    }
});
