import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { useAddSubjectsClass, useSubjectsClassList } from './hooks';
import { MultiSelect } from 'react-native-element-dropdown';
import { useSubjectsList } from '../../../Hooks/useSubjectsList';
import { SubjectItem } from './SubjectItem';

export const SubjectsClassScreen = ({ route }) => {
    const id = route?.params.id;
    const { subjects, isLoadingSubjects, errorSubjects, refetchSubjects } = useSubjectsList();
    const { subjectClass, isLoadingSubjectsClass, errorSubjectsClass, refetchSubjectsClass } = useSubjectsClassList(id);
    const { addSubjects, isAdding } = useAddSubjectsClass();
    const [selected, setSelected] = useState<string[]>([]);

    if (isLoadingSubjects || isLoadingSubjectsClass) {
        return <Loading />;
    }

    if (errorSubjects || errorSubjectsClass) {
        return <Error refetch={() => { refetchSubjects(); refetchSubjectsClass(); }} error={errorSubjects ?? errorSubjectsClass} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.addSubjectContainer}>
                <Text style={styles.titleText}>Добавить предметы:</Text>
                <MultiSelect
                    search
                    data={subjects ?? []}
                    style={styles.input}
                    labelField="title"
                    valueField="id"
                    placeholder="Выберите предметы"
                    searchPlaceholder="Поиск..."
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={() => { addSubjects({ classId: id, subjectIds: selected }); setSelected([]); }} disabled={isAdding}>
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Список предметов в классе:</Text>
            <FlatList
                data={subjectClass}
                renderItem={({ item }) => <SubjectItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    classId={id}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
