import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { DeleteIcon } from '../../../icons/Delete';
import { EditIcon } from '../../../icons/Edit';
import { useNavigation } from '@react-navigation/native';
import { QuarterParams } from '../../types/QuarterTypes';
import { useDeleteQuarter } from './hooks';
import { format, parseISO } from 'date-fns';

export const QuarterItem: React.FC<QuarterParams> = ({ id, number, startDate, endDate, schoolYear }) => {
    const { deleteaQuarter, isPending } = useDeleteQuarter();
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfoContainer}>
                <Text>{number} четверть</Text>
                <Text>Учебный год: {schoolYear.name}</Text>
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
                            onPress: () => deleteaQuarter(id),
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditQuarterScreen', { id })} disabled={isPending}>
                        <EditIcon />
                    </TouchableOpacity></>}
            </View>
        </View>
    );
};