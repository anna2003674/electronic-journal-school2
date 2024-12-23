import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { useDeletePupilClass } from './hooks';
import { PupilsParamsDelete } from '../../types/PupilsClassTypes';

export const PupilItem: React.FC<PupilsParamsDelete> = ({ id, classId, patronymic, firstName, surname }) => {
    const { deletePupilClass, isPending } = useDeletePupilClass();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
                <Text>{patronymic} {firstName} {surname}</Text>
                <View style={styles.itemButtonContainer}>
                    {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <><TouchableOpacity style={styles.buttonDelete} onPress={() => Alert.alert(
                        'Внимание!',
                        'Вы уверены, что хотите удалить запись?',
                        [
                            {
                                text: 'Да',
                                onPress: () => deletePupilClass({ classId: classId, pupilId: id }),
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
        </View >
    );
};
