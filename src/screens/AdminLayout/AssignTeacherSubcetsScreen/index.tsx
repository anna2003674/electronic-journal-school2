import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useMemo, useState } from 'react';
import { useSubjectsList } from '../../../Hooks/useSubjectsList';
import { useUsersList } from '../../../Hooks/useUsersList';
import { useAssignSubjects } from './hooks';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { RoleForm, UserParams } from '../../types/UsersTypes';

export const TeacherSubjectsScreen = () => {
    const { subjects, errorSubjects, isLoadingSubjects, refetchSubjects } = useSubjectsList();
    const { users, errorUsers, isLoadingUsers, refetchUsers } = useUsersList();
    const { assignSubjects, isAssign } = useAssignSubjects();
    const [user, setUser] = useState<UserParams>();
    const disabled = isLoadingSubjects || isLoadingUsers || isAssign;
    const sortedUsers = useMemo(() => users?.filter((item) => item.role === RoleForm.TEACHER), [users]);
    const [selected, setSelected] = useState<string[]>([]);

    if (isLoadingUsers || isLoadingSubjects) {
        return <Loading />;
    }

    if (errorSubjects || errorUsers) {
        return <Error refetch={() => { refetchSubjects(); refetchUsers(); }} error={errorSubjects ?? errorUsers} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text>Учитель:</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={'Выберите преподавателя'}
                    data={sortedUsers ?? []}
                    labelField="username"
                    valueField="id"
                    value={user}
                    onChange={item => {
                        setUser(item);
                    }}
                />
            </View>
            <View style={styles.itemContainer}>
                <Text>Предметы:</Text>
                <MultiSelect
                    search
                    data={subjects ?? []}
                    style={styles.input}
                    labelField="title"
                    valueField="id"
                    placeholder="Выберите предмет"
                    searchPlaceholder="Поиск..."
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                    }}
                />

            </View>
            <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={() => {
                if (user) {
                    assignSubjects({ teacherId: user.id, subjectIds: selected });
                    setSelected([]);
                }
            }} disabled={disabled}>
                <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};
