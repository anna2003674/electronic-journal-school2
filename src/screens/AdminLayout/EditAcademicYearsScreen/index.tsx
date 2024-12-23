import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAcademicYearParams, useCreateAcademicYearParams, useEditAcademicYearParams } from './hooks';
import { AcademicYearParams } from '../../types/AcademicYearTypes';
import DatePicker from 'react-native-date-picker';
import { format, parseISO } from 'date-fns';

type EditAcademicYearFormValues = Omit<AcademicYearParams, 'startDate'> & { startDate?: string };

export const EditAcademicYearsScreen = ({ route }) => {
    const startDate = route.params?.startDate;
    const { academicYearParams, error, isLoading, refetch } = useAcademicYearParams(startDate);
    const { createAcademicYear, isCreating } = useCreateAcademicYearParams();
    const { editAcademicYear, isPending } = useEditAcademicYearParams();
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<EditAcademicYearFormValues>({ mode: 'onChange' });
    const navigation = useNavigation();
    const disabled = !isValid || isPending || isCreating;
    const [startDateView, setStartDate] = useState(new Date());
    const [endDateView, setEndDate] = useState(new Date());

    useEffect(() => {
        if (academicYearParams) {
            setStartDate(parseISO(academicYearParams.startDate));
            setEndDate(parseISO(academicYearParams.endDate));
        }
    }, [academicYearParams]);

    useEffect(() => {
        if (academicYearParams) {
            reset(academicYearParams);
        }
    }, [reset, academicYearParams]);

    const onSubmit = (values: EditAcademicYearFormValues) => {
        if (!startDate) {
            createAcademicYear({ ...values, startDate: format(startDateView, 'yyyy-MM-dd'), endDate: format(endDateView, 'yyyy-MM-dd') });
            navigation.goBack();
        } else {
            editAcademicYear({ ...values, startDate: format(startDateView, 'yyyy-MM-dd'), endDate: format(endDateView, 'yyyy-MM-dd') });
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
                    name="name"
                    rules={{
                        required: 'Поле обязательно',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => <>
                        <Text>Название:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            defaultValue={value}
                        />
                        {errors.name?.message && (<Text style={styles.errorText}>{errors.name.message}</Text>)}
                    </>
                    }
                />
            </View>
            <View style={styles.itemContainerDate}>
                <Text>Дата начала:</Text>
                <DatePicker date={startDateView} onDateChange={setStartDate} mode="date" />
            </View>
            <View style={styles.itemContainerDate}>
                <Text>Дата конца:</Text>
                <DatePicker date={endDateView} onDateChange={setEndDate} mode="date" />
            </View>
            <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={handleSubmit(onSubmit)} disabled={disabled}>
                <Text style={styles.buttonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};
