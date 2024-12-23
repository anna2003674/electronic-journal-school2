import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { EditIcon } from '../../../icons/Edit';
import { useNavigation } from '@react-navigation/native';
import { ClassParams } from '../../types/ClassTypes';
import { useDeleteClass } from './hooks';

export const ClassItem: React.FC<Pick<ClassParams, 'id' | 'title' | 'bias'>> = ({ id, title, bias }) => {
    const { deleteClass, isPending } = useDeleteClass();
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
                <Text>{title}</Text>
                <View style={styles.itemButtonContainer}>
                    {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <>
                        <TouchableOpacity style={styles.buttonLarge} hitSlop={15} onPress={() => navigation.navigate('SubjectsClassScreen', { id })}>
                            <Text>Предметы</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLarge} hitSlop={15} onPress={() => navigation.navigate('PupilsClassScreen', { id })}>
                            <Text>Учащиеся</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} hitSlop={15} onPress={() => Alert.alert(
                            'Внимание!',
                            'Вы уверены, что хотите удалить запись?',
                            [
                                {
                                    text: 'Да',
                                    onPress: () => deleteClass(id),
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
                        <TouchableOpacity style={styles.button} hitSlop={15} onPress={() => navigation.navigate('EditClassScreen', { id })} disabled={isPending}>
                            <EditIcon />
                        </TouchableOpacity></>}
                </View>
            </View>
            <View style={styles.itemDescriptionContainer}>
                <Text>{bias}</Text>
            </View>
        </View >
    );
};
