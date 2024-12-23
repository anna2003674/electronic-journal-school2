import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export const MainPageAdminScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.itemsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassesScreen')}>
                        <Text style={styles.buttonText}>Классы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AcademicYearsScreen')}>
                        <Text style={styles.buttonText}>Учебные годы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Уроки</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsersScreen')}>
                        <Text style={styles.buttonText}>Пользователи</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoomsScreen')}>
                        <Text style={styles.buttonText}>Кабинеты</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TeacherSubjectsScreen')}>
                        <Text style={styles.buttonText}>Назначение учителю предметов</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AssignClassesTeacher')}>
                        <Text style={styles.buttonText}>Назначение учителю классов</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SubjectsScreen')}>
                        <Text style={styles.buttonText}>Предметы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('QuartersScreen')}>Четверти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ScheduleScreen')}>
                        <Text style={styles.buttonText}>Расписания</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Темы уроков</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('AssignParentsPupil')}> Назначение родителей ученику</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TeachersClassesScreen')}>
                        <Text style={styles.buttonText}>Классы учителей</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    );
};
