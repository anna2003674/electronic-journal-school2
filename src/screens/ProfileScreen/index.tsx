import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '../../stores/useAuthStore';
import { styles } from './styles';
import { useEditPassword, usePersonInfo } from './hooks';
import { Controller, useForm } from 'react-hook-form';
import { EditPasswordFormFields } from './types';
import { Role, genderForm, roleForm } from '../types/UsersTypes';
import { format, parseISO } from 'date-fns';

const PathSegmentsForRole = {
    [Role.ROLE_ADMIN]: 'admin',
    [Role.ROLE_TEACHER]: 'teacher',
    [Role.ROLE_PUPIL]: 'pupil',
    [Role.ROLE_PARENT]: 'parent',
};

export const ProfileScreen = () => {
    const clearToken = useAuthStore((state) => state.clearToken);
    const role = useAuthStore(state => state.role);
    const id = useAuthStore(state => state.id);
    const { personInfo, isLoading, error, refetch } = usePersonInfo(id, role && PathSegmentsForRole[role]);
    const { editPassword, isPending } = useEditPassword();
    const { control, handleSubmit, formState: { isValid } } = useForm<EditPasswordFormFields>({ mode: 'onChange' });

    const onSubmit = ({ newPassword, oldPassword }: EditPasswordFormFields) => {
        if (id) {
            editPassword({ userId: id, newPassword, oldPassword });
        }
    };

    return (
        <ScrollView style={styles.containerScroll}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={-50}>
                <View style={styles.infoContainer}>
                    {(!isLoading && !error) && <><Text style={styles.header}>Информация о пользователе:</Text>
                        <Text>Логин пользователя: {personInfo?.username}</Text>
                        <Text>Роль: {personInfo && (roleForm[personInfo.role] ?? 'Неизвестно')}</Text>
                        <Text>Отчество: {personInfo?.patronymic}</Text>
                        <Text>Имя: {personInfo?.firstName}</Text>
                        <Text>Фамилия: {personInfo?.surname}</Text>
                        <Text>Пол: {personInfo && (genderForm[personInfo.gender] ?? 'Неизвестно')}</Text>
                        <Text>Дата рождения: {personInfo && (format(parseISO(personInfo.birthDate), 'yyyy-MM-dd') ?? 'Неизвестно')}</Text>
                        <Text>Телефон: {personInfo?.phone}</Text>
                        <Text>Почта: {personInfo?.email}</Text></>}
                    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    {error && <View>
                        <Text style={styles.errorText}>{error ? `Error: ${error.message}` : 'Something goes wrong'}</Text>
                        <Button title="Обновить" onPress={() => refetch()} />
                    </View>}
                </View>
                {role === Role.ROLE_ADMIN && <View style={styles.passwordContainer}>
                    <Text style={styles.header}>Изменение пароля:</Text>
                    <Controller
                        control={control}
                        name="oldPassword"
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur } }) => <>
                            <TextInput
                                style={styles.input}
                                placeholder="Старый пароль"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry
                            />
                        </>
                        }
                    />
                    <Controller
                        control={control}
                        name="newPassword"
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur } }) => <>
                            <TextInput
                                style={styles.input}
                                placeholder="Новый пароль"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry
                            />
                        </>
                        }
                    />
                    <TouchableOpacity style={[styles.buttonPassword, (!isValid || isPending) && styles.disabledButtonPassword]} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>Изменить пароль</Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.button} onPress={clearToken}>
                    <Text style={styles.buttonText}>Выход</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
