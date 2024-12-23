import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { useCreateRoom, useEditRoom, useRoomParams } from './hooks';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RoomParams } from '../../types/RoomTypes';

type EditRoomFormValues = Omit<RoomParams, 'id'> & { id?: number };

export const EditRoomScreen = ({ route }) => {
    const id = route.params?.id;
    const { roomParams, error, isLoading, refetch } = useRoomParams(id);
    const { createRoom, isCreating } = useCreateRoom();
    const { editRoom, isPending } = useEditRoom();
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<EditRoomFormValues>({ mode: 'onChange' });
    const navigation = useNavigation();
    const disabled = !isValid || isPending || isCreating;

    useEffect(() => {
        if (roomParams) {
            reset(roomParams);
        }
    }, [reset, roomParams]);

    const onSubmit = ({ id, ...values }: EditRoomFormValues) => {
        if (id) {
            editRoom({ ...values, id });
            navigation.goBack();
        } else {
            createRoom(values);
            navigation.goBack();
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error refetch={() => { refetch(); }} error={error} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="roomNumber"
                    rules={{
                        required: 'Поле обязательно',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => <>
                        <Text>Номер кабинета:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value}
                        />
                        {errors.roomNumber?.message && (<Text style={styles.errorText}>{errors.roomNumber.message}</Text>)}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="floor"
                    rules={
                        {
                            required: 'Поле обязательно',
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'Только числа',
                            },
                        }
                    }
                    render={({ field: { onChange, value, onBlur } }) => <>
                        <Text>Этаж:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value ? `${value}` : ''}
                        />
                        {errors.floor?.message && <Text style={styles.errorText}>{errors.floor.message}</Text>}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainer}>
                <Controller
                    control={control}
                    name="capacity"
                    rules={
                        {
                            required: 'Поле обязательно',
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'Только числа',
                            },
                        }
                    }
                    render={({ field: { onChange, onBlur, value } }) => <>
                        <Text>Вместимость:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value ? `${value}` : ''}
                        />
                        {errors.capacity?.message && <Text style={styles.errorText}>{errors.capacity.message}</Text>}
                    </>
                    }
                />
            </View>
            <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={handleSubmit(onSubmit)} disabled={disabled}>
                <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};
