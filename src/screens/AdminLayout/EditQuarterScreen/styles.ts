import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5,
    },
    input: {
        backgroundColor: 'white',
        width: 150,
        height: 25,
        textAlignVertical: 'center',
        borderWidth: 1,
        paddingVertical: 0,
    },
    button: {
        width: 150,
        height: 40,
        marginTop: 10,
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
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    itemContainerDate: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 5,
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
    },
    headerContainer: {
        marginTop: 5,
        marginHorizontal: 5,
        alignSelf: 'flex-start',
    },
});
