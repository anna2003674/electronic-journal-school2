import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export const MainPageTeacherScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Мой класс</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyClassesScreen')}>
                    <Text style={styles.buttonText}>Классный журнал</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MySubjectsScreen')}>
                    <Text style={styles.buttonText}>Мои предметы</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Расписание учителя</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
