import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { CreateIcon } from '../../../icons/Create';
import { UserItem } from './UserItem';
import { useUsersList } from '../../../Hooks/useUsersList';

export const UsersScreen = () => {
    const { users, isLoadingUsers, errorUsers, refetchUsers } = useUsersList();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <TouchableOpacity style={styles.createButton} hitSlop={20} onPress={() => navigation.navigate('EditUserScreen')}><CreateIcon /></TouchableOpacity> })
    }, [navigation]);

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
                data={users}
                renderItem={({ item }) => <UserItem
                    id={item.id}
                    username={item.username}
                    firstName={item.firstName}
                    patronymic={item.patronymic}
                    surname={item.surname}
                    email={item.email}
                    phone={item.phone}
                    birthDate={item.birthDate}
                    gender={item.gender}
                    role={item.role}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
