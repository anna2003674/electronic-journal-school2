import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCreateSubject, useEditSubject, useSubjectParams } from './hooks';
import { SubjectParams } from '../../types/SubjectTypes';

type EditSubjectFormValues = Omit<SubjectParams, 'id'> & { id?: number };

export const EditSubjectScreen = ({ route }) => {
    const id = route.params?.id;
    const { subjectParams, error, isLoading, refetch } = useSubjectParams(id);
    const { createSubject, isCreating } = useCreateSubject();
    const { editSubject, isPending } = useEditSubject();
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<EditSubjectFormValues>({ mode: 'onChange' });
    const navigation = useNavigation();
    const disabled = !isValid || isPending || isCreating;

    useEffect(() => {
        if (subjectParams) {
            reset(subjectParams);
        }
    }, [reset, subjectParams]);

    const onSubmit = ({ id, ...values }: EditSubjectFormValues) => {
        if (id) {
            editSubject({ ...values, id });
            navigation.goBack();
        } else {
            createSubject(values);
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
                    name="title"
                    rules={{
                        required: 'Поле обязательно',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => <>
                        <Text>Название предмета:</Text>
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
                    name="description"
                    rules={
                        {
                            required: 'Поле обязательно',
                        }
                    }
                    render={({ field: { onChange, value, onBlur } }) => <>
                        <Text>Описание:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value ? `${value}` : ''}
                        />
                        {errors.description?.message && <Text style={styles.errorText}>{errors.description.message}</Text>}
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
