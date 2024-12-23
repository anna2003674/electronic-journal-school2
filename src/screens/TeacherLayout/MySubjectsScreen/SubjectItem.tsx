import { Text, View } from 'react-native';
import { styles } from './styles';
import { SubjectParams } from '../../types/SubjectTypes';

export const SubjectItem: React.FC<Omit<SubjectParams, 'id'>> = ({ title, description }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
                <Text>{title}</Text>
            </View>
            <View style={styles.itemDescriptionContainer}>
                <Text>Описание:</Text>
                <Text>{description}</Text>
            </View>
        </View>
    );
};
