import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { EditIcon } from '../../../icons/Edit';
import { useNavigation } from '@react-navigation/native';
import { useDeleteSubject } from './hooks';
import { SubjectParams } from '../../types/SubjectTypes';

export const SubjectItem: React.FC<SubjectParams> = ({ id, title, description }) => {
    const { deleteSubject, isPending } = useDeleteSubject();
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
                <Text>{title}</Text>
                <View style={styles.itemButtonContainer}>
                    {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <><TouchableOpacity style={styles.button} onPress={() => Alert.alert(
                        'Внимание!',
                        'Вы уверены, что хотите удалить запись?',
                        [
                            {
                                text: 'Да',
                                onPress: () => deleteSubject(id),
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
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditSubjectScreen', { id })} disabled={isPending}>
                            <EditIcon />
                        </TouchableOpacity></>}
                </View>
            </View>
            <View style={styles.itemDescriptionContainer}>
                <Text>Описание:</Text>
                <Text>{description}</Text>
            </View>
        </View >
    );
};
