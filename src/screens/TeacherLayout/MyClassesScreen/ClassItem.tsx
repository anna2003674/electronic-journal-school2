import { Text, View } from 'react-native';
import { styles } from './styles';
import { ClassParams } from '../../types/ClassTypes';

export const ClassItem: React.FC<Pick<ClassParams, 'id' | 'title'>> = ({ id, title }) => {

    return (
        <View style={styles.itemContainer}>
            <Text>{title}</Text>
        </View >
    );
};
