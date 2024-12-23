import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useState } from 'react';
import { useUsersList } from '../../../Hooks/useUsersList';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { RoleForm, UserParams } from '../../types/UsersTypes';
import { useClassesList } from '../../../Hooks/useClassesList';
import { useAssignClasses } from './hooks';

export const AssignClassesTeacher = () => {
    const { users, errorUsers, isLoadingUsers, refetchUsers } = useUsersList();
    const { classes, error, isLoading, refetch } = useClassesList();
    const { assignClasses, isAssign } = useAssignClasses();
    const [user, setUser] = useState<UserParams>();
    const teachers = users?.filter((item) => item.role === RoleForm.TEACHER);
    const [selected, setSelected] = useState<string[]>([]);


    if (isLoadingUsers || isLoading) {
        return <Loading />;
    }

    if (errorUsers || error) {
        return <Error refetch={() => { refetchUsers(); refetch(); }} error={errorUsers ?? error} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text>Ученик:</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={'Выберите учителя'}
                    data={teachers ?? []}
                    labelField="username"
                    valueField="id"
                    value={user}
                    onChange={item => {
                        setUser(item);
                    }}
                />
            </View>
            <View style={styles.itemContainer}>
                <Text>Родители:</Text>
                <MultiSelect
                    search
                    data={classes ?? []}
                    style={styles.input}
                    labelField="title"
                    valueField="id"
                    placeholder="Выберите классы"
                    searchPlaceholder="Поиск..."
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                    }}
                />

            </View>
            <TouchableOpacity style={[styles.button, isAssign && styles.disabledButton]} onPress={() => {
                if (user) {
                    assignClasses({ teacherId: user.id, classIds: selected });
                    setSelected([]);
                }
            }} disabled={isAssign}>
                <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};
