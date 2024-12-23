import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { ClassItem } from './ClassItem';
import { useMyClassesList } from '../../../Hooks/useMyClassesList';

export const TeacherClassesScreen = ({ route }) => {
    const id = route?.params.id;
    const { classes, isLoading, error, refetch } = useMyClassesList(id);

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
                    title={item.title}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};