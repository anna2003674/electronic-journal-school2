import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { EditIcon } from '../../../icons/Edit';
import { useDeleteRoom } from './hooks';
import { useNavigation } from '@react-navigation/native';
import { RoomParams } from '../../types/RoomTypes';

export const RoomItem: React.FC<RoomParams> = ({ id, roomNumber, capacity, floor }) => {
    const { deleteRoom, isPending } = useDeleteRoom();
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfoContainer}>
                <Text>Кабинет {roomNumber}</Text>
                <Text>Этаж: {floor}</Text>
                <Text>Вместимость: {capacity} чел.</Text>
            </View>
            <View style={styles.itemButtonContainer}>
                {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <><TouchableOpacity style={styles.button} onPress={() => Alert.alert(
                    'Внимание!',
                    'Вы уверены, что хотите удалить запись?',
                    [
                        {
                            text: 'Да',
                            onPress: () => deleteRoom(id),
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
                </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditRoomScreen', { id })} disabled={isPending}>
                        <EditIcon />
                    </TouchableOpacity></>}
            </View>
        </View>
    );
};
