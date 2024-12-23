import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ClassParams } from '../../types/ClassTypes';
import { useClassParams, useCreateClass, useEditClass } from './hooks';
import { useRoomsList } from '../../../Hooks/useRoomsList';
import { useUsersList } from '../../../Hooks/useUsersList';
import { Dropdown } from 'react-native-element-dropdown';
import { RoleForm, UserParams } from '../../types/UsersTypes';
import { RoomParams } from '../../types/RoomTypes';

type EditClassFormValues = Omit<ClassParams, 'id'> & { id?: number };

export const EditClassScreen = ({ route }) => {
    const id = route.params?.id;
    const { classParams, error, isLoading, refetch } = useClassParams(id);
    const { createClass, isCreating } = useCreateClass();
    const { editClass, isPending } = useEditClass();
    const { rooms, errorRooms, isLoadingRooms, refetchRooms } = useRoomsList();
    const { users, errorUsers, isLoadingUsers, refetchUsers } = useUsersList();
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<EditClassFormValues>({ mode: 'onChange' });
    const navigation = useNavigation();
    const disabled = !isValid || isPending || isCreating;
    const [room, setRoom] = useState<RoomParams>();
    const [user, setUser] = useState<UserParams>();

    const sortedUsers = useMemo(() => users?.filter((item) => item.role === RoleForm.TEACHER), [users]);

    useEffect(() => {
        if (classParams) {
            reset(classParams);
            setUser(sortedUsers?.find((item) => item.id === classParams.homeroomTeacherId));
            setRoom(rooms?.find((item) => item.id === classParams.roomId));
        }
    }, [reset, classParams, sortedUsers, rooms]);

    const onSubmit = ({ id, ...values }: EditClassFormValues) => {
        if (room && user) {
            if (id) {
                editClass({ ...values, id });
                navigation.goBack();
            } else {
                createClass({ ...values, roomId: room.id, homeroomTeacherId: user.id });
                navigation.goBack();
            }
        }
    };

    if (isLoading || isLoadingRooms || isLoadingUsers) {
        return <Loading />;
    }

    if (error || errorRooms || errorUsers) {
        return <Error refetch={() => { refetch(); refetchUsers(); refetchRooms(); }} error={error ?? errorRooms ?? errorUsers} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="title"
                    rules={{
                        maxLength: 4,
                        required: 'Поле обязательно',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => <>
                        <Text>Название класса:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value}
                        />
                        {errors.title?.message && (<Text style={styles.errorText}>{errors.title.message}</Text>)}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="gradeLevel"
                    rules={{
                        required: 'Поле обязательно',
                        pattern: {
                            value: /^\d*$/,
                            message: 'Только числа',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => <>
                        <Text>Класс:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            onBlur={onBlur}
                            defaultValue={value ? `${value}` : ''}
                        />
                        {errors.gradeLevel && (<Text style={styles.errorText}>{errors.gradeLevel.message}</Text>)}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="pupilCount"
                    rules={
                        {
                            required: 'Поле обязательно',
                            pattern: {
                                value: /^\d*$/,
                                message: 'Только числа',
                            },
                        }
                    }
                    render={({ field: { onChange, value, onBlur } }) => <>
                        <Text>Количество учеников:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            onBlur={onBlur}
                            defaultValue={value ? `${value}` : ''}
                        />
                        {errors.pupilCount && <Text style={styles.errorText}>{errors.pupilCount.message}</Text>}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="bias"
                    rules={
                        {
                            required: 'Поле обязательно',
                        }
                    }
                    render={({ field: { onChange, value, onBlur } }) => <>
                        <Text>Уклон:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value ? `${value}` : ''}
                        />
                        {errors.bias && <Text style={styles.errorText}>{errors.bias.message}</Text>}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainer}>
                <Text>Классный руководитель:</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={'Выберите преподавателя'}
                    data={sortedUsers ?? []}
                    labelField={'username'}
                    valueField={'id'}
                    value={user}
                    onChange={item => {
                        setUser(item);
                    }}
                />
            </View>
            <View style={styles.itemContainer}>
                <Text>Кабинет:</Text>
                <Dropdown
                    style={styles.input}
                    placeholder={'Выберите кабинет'}
                    data={rooms ?? []}
                    labelField={'roomNumber'}
                    valueField={'id'}
                    value={room}
                    onChange={item => {
                        setRoom(item);
                    }}
                />
            </View>
            <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={handleSubmit(onSubmit)} disabled={disabled}>
                <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};
