import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5D0D0',
        flexDirection: 'column',
    },
    flatList: {
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#DCD3D3',
        marginHorizontal: 30,
        margin: 5,
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    itemInfoContainer: {
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    itemButtonContainer: {
        flexDirection: 'row',
    },
    button: {
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
});
