import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { SubjectItem } from './SubjectItem';
import { useMySubjectsList } from './hooks';
import { useAuthStore } from '../../../stores/useAuthStore';

export const MySubjectsScreen = () => {
    const id = useAuthStore(state => state.id);
    const { mySubjects, errorMySubjects, isLoadingMySubjects, refetchMySubjects } = useMySubjectsList(id);

    if (isLoadingMySubjects) {
        return <Loading />;
    }

    if (errorMySubjects) {
        return <Error refetch={() => { refetchMySubjects(); }} error={errorMySubjects} />;
    }

    return (
        <View style={styles.container} >
            <FlatList
                style={styles.flatList}
                data={mySubjects}
                renderItem={({ item }) => <SubjectItem
                    title={item.title}
                    description={item.description}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};