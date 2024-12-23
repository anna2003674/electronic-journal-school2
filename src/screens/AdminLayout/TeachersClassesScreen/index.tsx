import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { UserItem } from './UserItem';
import { useUsersList } from '../../../Hooks/useUsersList';
import { RoleForm } from '../../types/UsersTypes';
import { useMemo } from 'react';

export const TeachersClassesScreen = () => {
    const { users, isLoadingUsers, errorUsers, refetchUsers } = useUsersList();
    const teachers = useMemo(() => users?.filter((item) => item.role === RoleForm.TEACHER), [users]);

    if (isLoadingUsers) {
        return <Loading />;
    }

    if (errorUsers) {
        return <Error refetch={() => { refetchUsers(); }} error={errorUsers} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={teachers}
                renderItem={({ item }) => <UserItem
                    id={item.id}
                    firstName={item.firstName}
                    patronymic={item.patronymic}
                    surname={item.surname}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
