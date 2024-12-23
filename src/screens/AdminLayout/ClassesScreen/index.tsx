import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { CreateIcon } from '../../../icons/Create';
import { ClassItem } from './ClassItem';
import { useClassesList } from '../../../Hooks/useClassesList';

export const ClassesScreen = () => {
    const { classes, isLoading, error, refetch } = useClassesList();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <TouchableOpacity style={styles.createButton} hitSlop={20} onPress={() => navigation.navigate('EditClassScreen')}><CreateIcon /></TouchableOpacity> })
    }, [navigation]);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error refetch={() => { refetch(); }} error={error} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={classes}
                renderItem={({ item }) => <ClassItem
                    id={item.id}
                    title={item.title}
                    bias={item.bias}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
