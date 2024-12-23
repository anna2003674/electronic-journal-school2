import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export const MainPagePupilScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Домашнее задание</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Оценки</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Посещаемость</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Предметы</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Расписание</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
