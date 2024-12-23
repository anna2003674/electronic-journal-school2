import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { EditIcon } from '../../../icons/Edit';
import { useNavigation } from '@react-navigation/native';
import { RoleForm, UserParams, genderForm, roleForm } from '../../types/UsersTypes';
import { format, parseISO } from 'date-fns';
import { useDeleteUser } from './hooks';

export const UserItem: React.FC<UserParams> = ({ id, username, firstName, patronymic, surname, email, phone, birthDate, gender, role }) => {
    const { deleteUser, isPending } = useDeleteUser();
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
                <Text>Логин пользователя: {username}</Text>
                <View style={styles.itemButtonContainer}>
                    {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <>{role !== RoleForm.ADMIN && <><TouchableOpacity style={styles.button} onPress={() => Alert.alert(
                        'Внимание!',
                        'Вы уверены, что хотите удалить запись?',
                        [
                            {
                                text: 'Да',
                                onPress: () => deleteUser(id),
                                style: 'default',
                            },
                            {
                                text: 'Нет',
                                style: 'cancel',
                            },
                        ],
                        {
                            cancelable: true,
                        }
                    )}>
                        <DeleteIcon />
                    </TouchableOpacity></>}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={
                                () => navigation.navigate('EditUserScreen', { id, username, role, patronymic, firstName, surname, gender, birthDate, phone, email })
                            }
                            disabled={isPending}>
                            <EditIcon />
                        </TouchableOpacity></>}
                </View>
            </View>
            <View style={styles.itemDescriptionContainer}>
                <Text>Роль: {roleForm[role]}</Text>
                <Text>Отчество: {patronymic}</Text>
                <Text>Имя: {firstName}</Text>
                <Text>Фамилия: {surname}</Text>
                <Text>Пол: {gender && (genderForm[gender] ?? 'Неизвестно')}</Text>
                <Text>Дата рождения: {format(parseISO(birthDate), 'yyyy-MM-dd')}</Text>
                <Text>Телефон: {phone}</Text>
                <Text>Почта: {email}</Text>
            </View>
        </View >
    );
};
