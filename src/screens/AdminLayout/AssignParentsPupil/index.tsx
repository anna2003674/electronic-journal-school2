import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useMemo, useState } from 'react';
import { useUsersList } from '../../../Hooks/useUsersList';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { RoleForm, UserParams } from '../../types/UsersTypes';
import { useAssignParents } from './hooks';

export const AssignParentsPupil = () => {
    const { users, errorUsers, isLoadingUsers, refetchUsers } = useUsersList();
    const { assignParents, isAssign } = useAssignParents();
    const [user, setUser] = useState<UserParams>();
    const disabled = isLoadingUsers || isAssign;
    const [selected, setSelected] = useState<string[]>([]);
    const parents = useMemo(() => users?.filter((item) => item.role === RoleForm.PARENT), [users]);
    const pupil = useMemo(() => users?.filter((item) => item.role === RoleForm.PUPIL), [users]);

    if (isLoadingUsers) {
        return <Loading />;
    }

    if (errorUsers) {
        return <Error refetch={() => { refetchUsers(); }} error={errorUsers} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text>Ученик:</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={'Выберите ученика'}
                    data={pupil ?? []}
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
                    data={parents ?? []}
                    style={styles.input}
                    labelField="username"
                    valueField="id"
                    placeholder="Выберите родителей"
                    searchPlaceholder="Поиск..."
                    value={selected}
                    onChange={item => {
                        setSelected(item);
                    }}
                />

            </View>
            <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={() => {
                if (user) {
                    assignParents({ pupilId: user.id, parentIds: selected });
                    setSelected([]);
                }
            }} disabled={disabled}>
                <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};
