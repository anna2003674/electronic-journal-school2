import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'column',
    },
    itemContainer: {
        flexDirection: 'column',
        backgroundColor: '#D9D9D9',
        marginHorizontal: 30,
        margin: 5,
        borderRadius: 10,
    },
    itemTitleContainer: {
        backgroundColor: '#DCD3D3',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemButtonContainer: {
        flexDirection: 'row',
    },
    addPupilContainer: {
        backgroundColor: '#CBBE9B',
        padding: 5,
        borderRadius: 5,
        width: 350,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    buttonDelete: {
        alignSelf: 'center',
        backgroundColor: '#DCD3D3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    activityIndicator: {
        marginRight: 25,
    },
    createButton: {
        marginRight: 16,
    },
    input: {
        backgroundColor: 'white',
        width: 250,
        textAlignVertical: 'center',
        borderWidth: 1,
        paddingVertical: 0,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 5,
    },
    button: {
        width: 100,
        marginVertical: 10,
        height: 25,
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
});
