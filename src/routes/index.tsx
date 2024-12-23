import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainPageAdminScreen } from '../screens/AdminLayout/MainPageAdminScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useAuthStore } from '../stores/useAuthStore';
import { MainPageTeacherScreen } from '../screens/TeacherLayout/MainPageTeacherScreen';
import { MainPageParentScreen } from '../screens/ParentLayout/MainPageParentScreen';
import { MainPagePupilScreen } from '../screens/PupilLayout/MainPagePupilScreen';
import { ClassesScreen } from '../screens/AdminLayout/ClassesScreen';
import { RoomsScreen } from '../screens/AdminLayout/RoomsScreen';
import { EditRoomScreen } from '../screens/AdminLayout/EditRoomScreen';
import { AcademicYearsScreen } from '../screens/AdminLayout/AcademicYearsScreen';
import { ScheduleScreen } from '../screens/AdminLayout/ScheduleScreen';
import { SubjectsScreen } from '../screens/AdminLayout/SubjectsScreen';
import { EditSubjectScreen } from '../screens/AdminLayout/EditSubjectScreen';
import { EditAcademicYearsScreen } from '../screens/AdminLayout/EditAcademicYearsScreen';
import { QuartersScreen } from '../screens/AdminLayout/QuartersScreen';
import { EditQuarterScreen } from '../screens/AdminLayout/EditQuarterScreen';
import { UsersScreen } from '../screens/AdminLayout/UsersScreen';
import { Role } from '../screens/types/UsersTypes';
import { EditUserScreen } from '../screens/AdminLayout/EditUserScreen';
import { EditClassScreen } from '../screens/AdminLayout/EditClassScreen';
import { TeacherSubjectsScreen } from '../screens/AdminLayout/AssignTeacherSubcetsScreen';
import { AssignParentsPupil } from '../screens/AdminLayout/AssignParentsPupil';
import { PupilsClassScreen } from '../screens/AdminLayout/PupilsClassScreen';
import { SubjectsClassScreen } from '../screens/AdminLayout/SubjectsClassScreen';
import { AssignClassesTeacher } from '../screens/AdminLayout/AssignClassesTeacher';
import { MySubjectsScreen } from '../screens/TeacherLayout/MySubjectsScreen';
import { MyClassesScreen } from '../screens/TeacherLayout/MyClassesScreen';
import { TeachersClassesScreen } from '../screens/AdminLayout/TeachersClassesScreen';
import { TeacherClassesScreen } from '../screens/AdminLayout/TeacherClassesScreen';
import DocumentationScreen from '../screens/AdminLayout/DocumentationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Электронный журнал' }} />
        </Stack.Navigator>
    );
};

const NavigatonTab = () => {
    const role = useAuthStore(state => state.role);

    return (
        <Tab.Navigator>
            {role === Role.ROLE_ADMIN && <Tab.Screen name="AdminLayout" component={AdminStack} options={{ headerShown: false, tabBarLabel: 'Главная', tabBarIcon: () => null, tabBarIconStyle: { width: 0, height: 10 } }} />}
            {role === Role.ROLE_TEACHER && <Tab.Screen name="TeacherLayout" component={TeacherStack} options={{ headerShown: false, tabBarLabel: 'Главная', tabBarIcon: () => null, tabBarIconStyle: { width: 0, height: 10 } }} />}
            {role === Role.ROLE_PARENT && <Tab.Screen name="ParentLayout" component={ParentStack} options={{ headerShown: false, tabBarLabel: 'Главная', tabBarIcon: () => null, tabBarIconStyle: { width: 0, height: 10 } }} />}
            {role === Role.ROLE_PUPIL && <Tab.Screen name="PupilLayout" component={PupilStack} options={{ headerShown: false, tabBarLabel: 'Главная', tabBarIcon: () => null, tabBarIconStyle: { width: 0, height: 10 } }} />}
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Профиль', tabBarIcon: () => null, tabBarIconStyle: { width: 0, height: 10 } }} />
            <Tab.Screen name="DocumentationScreen" component={DocumentationScreen} options={{ title: 'Документация', tabBarIcon: () => null, tabBarIconStyle: { width: 0, height: 10 } }} />
        </Tab.Navigator>
    );
};

const AdminStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPageAdminScreen" component={MainPageAdminScreen} options={{ title: 'Главная страница' }} />
            <Stack.Screen name="ClassesScreen" component={ClassesScreen} options={{ title: 'Классы' }} />
            <Stack.Screen name="EditClassScreen" component={EditClassScreen} options={{ title: 'Классы' }} />
            <Stack.Screen name="PupilsClassScreen" component={PupilsClassScreen} options={{ title: 'Учащиеся' }} />
            <Stack.Screen name="SubjectsClassScreen" component={SubjectsClassScreen} options={{ title: 'Предметы' }} />
            <Stack.Screen name="RoomsScreen" component={RoomsScreen} options={{ title: 'Кабинеты' }} />
            <Stack.Screen name="EditRoomScreen" component={EditRoomScreen} options={{ title: 'Кабинеты' }} />
            <Stack.Screen name="AcademicYearsScreen" component={AcademicYearsScreen} options={{ title: 'Учебные годы' }} />
            <Stack.Screen name="EditAcademicYearsScreen" component={EditAcademicYearsScreen} options={{ title: 'Учебные годы' }} />
            <Stack.Screen name="QuartersScreen" component={QuartersScreen} options={{ title: 'Четверти' }} />
            <Stack.Screen name="EditQuarterScreen" component={EditQuarterScreen} options={{ title: 'Четверти' }} />
            <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ title: 'Расписания' }} />
            <Stack.Screen name="SubjectsScreen" component={SubjectsScreen} options={{ title: 'Предметы' }} />
            <Stack.Screen name="EditSubjectScreen" component={EditSubjectScreen} options={{ title: 'Предметы' }} />
            <Stack.Screen name="UsersScreen" component={UsersScreen} options={{ title: 'Пользователи' }} />
            <Stack.Screen name="EditUserScreen" component={EditUserScreen} options={{ title: 'Пользователи' }} />
            <Stack.Screen name="TeacherSubjectsScreen" component={TeacherSubjectsScreen} options={{ title: 'Назначение предметов' }} />
            <Stack.Screen name="AssignParentsPupil" component={AssignParentsPupil} options={{ title: 'Назначение родителей' }} />
            <Stack.Screen name="AssignClassesTeacher" component={AssignClassesTeacher} options={{ title: 'Назначение классов' }} />
            <Stack.Screen name="TeachersClassesScreen" component={TeachersClassesScreen} options={{ title: 'Классы учителей' }} />
            <Stack.Screen name="TeacherClassesScreen" component={TeacherClassesScreen} options={{ title: 'Классы' }} />
            <Stack.Screen name="DocumentationScreen" component={DocumentationScreen} options={{ title: 'Документация' }} />
        </Stack.Navigator>
    );
};

const TeacherStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPageTeacherScreen" component={MainPageTeacherScreen} options={{ title: 'Главная страница' }} />
            <Stack.Screen name="MySubjectsScreen" component={MySubjectsScreen} options={{ title: 'Мои предметы' }} />
            <Stack.Screen name="MyClassesScreen" component={MyClassesScreen} options={{ title: 'Классный журнал' }} />
            <Stack.Screen name="DocumentationScreen" component={DocumentationScreen} options={{ title: 'Документация' }} />
        </Stack.Navigator>
    );
};

const ParentStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPageParentScreen" component={MainPageParentScreen} options={{ title: 'Главная страница' }} />
            <Stack.Screen name="DocumentationScreen" component={DocumentationScreen} options={{ title: 'Документация' }} />
        </Stack.Navigator>
    );
};

const PupilStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPagePupilScreen" component={MainPagePupilScreen} options={{ title: 'Главная страница' }} />
            <Stack.Screen name="DocumentationScreen" component={DocumentationScreen} options={{ title: 'Документация' }} />
        </Stack.Navigator>
    );
};

export const AppNavigaton = () => {
    const isAuth = useAuthStore(state => !!state.token);

    return isAuth ? <NavigatonTab /> : <Route />;
};
