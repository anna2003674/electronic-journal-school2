import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { SubjectItem } from './SubjectItem';
import { CreateIcon } from '../../../icons/Create';
import { useSubjectsList } from '../../../Hooks/useSubjectsList';

export const SubjectsScreen = () => {
    const { subjects, isLoadingSubjects, errorSubjects, refetchSubjects } = useSubjectsList();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <TouchableOpacity style={styles.createButton} hitSlop={20} onPress={() => navigation.navigate('EditSubjectScreen')}><CreateIcon /></TouchableOpacity> })
    }, [navigation]);

    if (isLoadingSubjects) {
        return <Loading />;
    }

    if (errorSubjects) {
        return <Error refetch={() => { refetchSubjects(); }} error={errorSubjects} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={subjects}
                renderItem={({ item }) => <SubjectItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
