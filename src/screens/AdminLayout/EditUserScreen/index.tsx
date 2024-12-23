import { TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GENDERS, RoleForm, UserParams } from '../../types/UsersTypes';
import { useCreateUser, useEditUser } from './hooks';
import { Dropdown } from 'react-native-element-dropdown';
import { GenderDropdownVariables, RoleDropdownVariables } from './types';
import DatePicker from 'react-native-date-picker';
import { format, parseISO } from 'date-fns';

type EditUserFormValues = (Omit<UserParams, 'id'> & { id?: number }) & { password: number };

const genders = [
    { genderLabel: 'Мужской', genderValue: GENDERS.MALE },
    { genderLabel: 'Женский', genderValue: GENDERS.FEMALE },
];

const roles: RoleDropdownVariables[] = [
    { roleLabel: 'Учитель', roleValue: RoleForm.TEACHER },
    { roleLabel: 'Родитель', roleValue: RoleForm.PARENT },
    { roleLabel: 'Ученик', roleValue: RoleForm.PUPIL },
];

export const EditUserScreen = ({ route }) => {
    const userParams = route.params;
    const { createUser, isCreating } = useCreateUser();
    const { editUser, isPending } = useEditUser();
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<EditUserFormValues>({ mode: 'onChange' });
    const navigation = useNavigation();
    const disabled = !isValid || isPending || isCreating;
    const [gender, setGender] = useState<GenderDropdownVariables>();
    const [role, setRole] = useState<RoleDropdownVariables>();
    const [birthDate, setBirthDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (userParams) {
            reset(userParams);
            setBirthDate(parseISO(userParams.birthDate));
            setRole(userParams.role);
            setGender(userParams.gender);
        }
    }, [reset, userParams]);

    const onSubmit = ({ id, ...values }: EditUserFormValues) => {
        if (gender && role) {
            if (id) {
                editUser({ ...values, id, gender: gender.genderValue, role: role.roleValue, birthDate: format(birthDate, 'yyyy-MM-dd') });
                navigation.goBack();
            } else {
                createUser({ ...values, gender: gender.genderValue, role: role.roleValue, birthDate: format(birthDate, 'yyyy-MM-dd') });
                navigation.goBack();
            }
        }
    };

    return (
        <ScrollView style={styles.containerScroll}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={-50}>
                <View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: 'Поле обязательно',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => <>
                            <Text>Логин:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                defaultValue={value}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {errors.username?.message && (<Text style={styles.errorText}>{errors.username.message}</Text>)}
                        </>
                        }
                    />
                </View>
                {userParams?.role !== RoleForm.ADMIN && <View style={styles.itemContainer}>
                    <Text>Роль:</Text>
                    <Dropdown
                        style={styles.input}
                        placeholder={'Выберите Роль'}
                        data={roles}
                        labelField={'roleLabel'}
                        valueField={'roleValue'}
                        value={role}
                        onChange={item => {
                            setRole(item);
                        }}
                    />
                </View>}
                {userParams?.role !== RoleForm.ADMIN && <><View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="password"
                        rules={
                            {
                                required: 'Поле обязательно',
                            }
                        }
                        render={({ field: { onChange, onBlur } }) => <>
                            <Text>Пароль:</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoCapitalize="none"
                            />
                            {errors.password?.message && <Text style={styles.errorText}>{errors.password.message}</Text>}
                        </>
                        }
                    />
                </View>
                </>}
                <View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="surname"
                        rules={
                            {
                                required: 'Поле обязательно',
                            }
                        }
                        render={({ field: { onChange, value, onBlur } }) => <>
                            <Text>Фамилия:</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                defaultValue={value}
                            />
                            {errors.surname?.message && <Text style={styles.errorText}>{errors.surname.message}</Text>}
                        </>
                        }
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="firstName"
                        rules={
                            {
                                required: 'Поле обязательно',
                            }
                        }
                        render={({ field: { onChange, value, onBlur } }) => <>
                            <Text>Имя:</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                defaultValue={value}
                            />
                            {errors.firstName?.message && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                        </>
                        }
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="patronymic"
                        rules={
                            {
                                required: 'Поле обязательно',
                            }
                        }
                        render={({ field: { onChange, value, onBlur } }) => <>
                            <Text>Отчество:</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                defaultValue={value ? `${value}` : ''}
                            />
                            {errors.patronymic?.message && <Text style={styles.errorText}>{errors.patronymic.message}</Text>}
                        </>
                        }
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Text>Пол:</Text>
                    <Dropdown
                        style={styles.input}
                        placeholder={'Выберите пол'}
                        data={genders}
                        labelField={'genderLabel'}
                        valueField={'genderValue'}
                        value={gender}
                        onChange={item => {
                            setGender(item);
                        }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <TouchableOpacity style={styles.buttonData} onPress={() => setOpen(true)}>
                        <Text>Дата рождения</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        date={birthDate}
                        mode="date"
                        open={open}
                        onConfirm={(date) => {
                            setOpen(false);
                            setBirthDate(date);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="phone"
                        rules={
                            {
                                required: 'Поле обязательно',
                            }
                        }
                        render={({ field: { onChange, value, onBlur } }) => <>
                            <Text>Телефон:</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                placeholder="+7 (___) ___-__-__"
                                onChangeText={onChange}
                                autoCorrect={false}
                                onBlur={onBlur}
                                autoCapitalize="none"
                                keyboardType="phone-pad"
                                defaultValue={value ? `${value}` : ''}
                            />
                            {errors.phone?.message && <Text style={styles.errorText}>{errors.phone.message}</Text>}
                        </>
                        }
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Controller
                        control={control}
                        name="email"
                        rules={
                            {
                                required: 'Поле обязательно',
                            }
                        }
                        render={({ field: { onChange, value, onBlur } }) => <>
                            <Text>Email: </Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                defaultValue={value ? `${value}` : ''}
                            />
                            {errors.email?.message && <Text style={styles.errorText}>{errors.email.message}</Text>}
                        </>
                        }
                    />
                </View>
                <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={handleSubmit(onSubmit)} disabled={disabled}>
                    <Text style={styles.buttonText}>Подтвердить</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
