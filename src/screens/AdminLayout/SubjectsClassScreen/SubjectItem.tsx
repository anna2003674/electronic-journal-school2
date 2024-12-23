import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { useDeleteSubjectClass } from './hooks';
import { SubjectParamsDelete } from '../../types/SubjectsClassTypes';

export const SubjectItem: React.FC<SubjectParamsDelete> = ({ id, classId, title, description }) => {
    const { deleteSubjectClass, isPending } = useDeleteSubjectClass(classId);
    const idArray: number[] = [id];

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
                <Text>{title}</Text>
                <View style={styles.itemButtonContainer}>
                    {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <><TouchableOpacity style={styles.buttonDelete} onPress={() => Alert.alert(
                        'Внимание!',
                        'Вы уверены, что хотите удалить запись?',
                        [
                            {
                                text: 'Да',
                                onPress: () => deleteSubjectClass({ subjectIds: idArray }),
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
                    </>}
                </View>
            </View>
            <View style={styles.itemDescriptionContainer}>
                <Text>Описание:</Text>
                <Text>{description}</Text>
            </View>
        </View >
    );
};