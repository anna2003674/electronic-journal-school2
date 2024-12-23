import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { EditIcon } from '../../../icons/Edit';
import { useNavigation } from '@react-navigation/native';
import { AcademicYearParams } from '../../types/AcademicYearTypes';
import { useDeleteAcademicYears } from './hooks';
import { format, parseISO } from 'date-fns';

export const AcademicYearItem: React.FC<AcademicYearParams> = ({ name, startDate, endDate }) => {
    const { deleteaAademicYear, isPending } = useDeleteAcademicYears();
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfoContainer}>
                <Text>Название {name}</Text>
                <Text>Дата начала: {format(parseISO(startDate), 'yyyy-MM-dd')}</Text>
                <Text>Дата конца: {format(parseISO(endDate), 'yyyy-MM-dd')}</Text>
            </View>
            <View style={styles.itemButtonContainer}>
                {isPending ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} /> : <><TouchableOpacity style={styles.button} onPress={() => Alert.alert(
                    'Внимание!',
                    'Вы уверены, что хотите удалить запись?',
                    [
                        {
                            text: 'Да',
                            onPress: () => deleteaAademicYear(startDate),
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditAcademicYearsScreen', { startDate })} disabled={isPending}>
                        <EditIcon />
                    </TouchableOpacity></>}
            </View>
        </View>
    );
};
