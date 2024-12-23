import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { UserParams, } from '../../types/UsersTypes';

export const UserItem: React.FC<Pick<UserParams, 'id' | 'firstName' | 'patronymic' | 'surname'>> = ({ id, firstName, patronymic, surname }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('TeacherClassesScreen', id)}>
            <Text>{patronymic} {firstName} {surname}</Text>
        </TouchableOpacity>
    );
};
