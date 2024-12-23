import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { useAddPupilClass, usePupilsClassList } from './hooks';
import { PupilItem } from './PupilItem';
import { Dropdown } from 'react-native-element-dropdown';
import { RoleForm, UserParams } from '../../types/UsersTypes';
import { useUsersList } from '../../../Hooks/useUsersList';
import { useMemo, useState } from 'react';

export const PupilsClassScreen = ({ route }) => {
    const id = route?.params.id;
    const { pupilsClass, isLoadingPupilsClass, errorPupilsClass, refetchPupilsClass } = usePupilsClassList(id);
    const { addPupil, isAdding } = useAddPupilClass();
    const { users, isLoadingUsers, errorUsers, refetchUsers } = useUsersList();
    const [user, setUser] = useState<UserParams>();
    const sortedUsers = useMemo(() => users?.filter((item) => item.role === RoleForm.PUPIL), [users]);

    if (isLoadingPupilsClass || isLoadingUsers) {
        return <Loading />;
    }

    if (errorPupilsClass || errorUsers) {
        return <Error refetch={() => { refetchPupilsClass(); refetchUsers(); }} error={errorPupilsClass} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.addPupilContainer}>
                <Text style={styles.titleText}>Добавить ученика:</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={'Выберите ученика'}
                    data={sortedUsers ?? []}
                    labelField={'username'}
                    valueField={'id'}
                    value={user}
                    onChange={item => {
                        setUser(item);
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={() => addPupil({ classId: id, pupilId: user.id })} disabled={isAdding}>
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Список учащихся в классе:</Text>
            <FlatList
                data={pupilsClass}
                renderItem={({ item }) => <PupilItem
                    id={item.id}
                    patronymic={item.patronymic}
                    classId={id}
                    firstName={item.firstName}
                    surname={item.surname}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
