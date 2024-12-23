import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { Error } from '../../../Components/Error';
import { Loading } from '../../../Components/Loading';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { format, parseISO } from 'date-fns';
import { QuarterParams } from '../../types/QuarterTypes';
import { useCreateQuarter, useEditQuarter, useQuarterParams } from './hooks';
import { Dropdown } from 'react-native-element-dropdown';
import { useAcademicYearsList } from '../../../Hooks/useAcademicYearsList';
import { AcademicYearParams } from '../../types/AcademicYearTypes';

type EditQuarterFormValues = Omit<QuarterParams, 'id'> & { id?: number };

export const EditQuarterScreen = ({ route }) => {
    const id = route.params?.id;
    const { quarterParams, errorQuarter, isLoadingQuearter, refetchQuarter } = useQuarterParams(id);
    const { createQuarter, isCreating } = useCreateQuarter();
    const { editQuarter, isPending } = useEditQuarter();
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<EditQuarterFormValues>({ mode: 'onChange' });
    const navigation = useNavigation();
    const disabled = !isValid || isPending || isCreating;
    const [startDateView, setStartDate] = useState(new Date());
    const [endDateView, setEndDate] = useState(new Date());
    const { academicYears, error, isLoading, refetch } = useAcademicYearsList();
    const [value, setValue] = useState<AcademicYearParams>();

    useEffect(() => {
        if (quarterParams) {
            setStartDate(parseISO(quarterParams.startDate));
            setEndDate(parseISO(quarterParams.endDate));
            setValue(quarterParams.schoolYear);
        }
    }, [quarterParams]);

    useEffect(() => {
        if (quarterParams) {
            reset(quarterParams);
        }
    }, [reset, quarterParams]);

    const onSubmit = (values: EditQuarterFormValues) => {
        if (value) {
            if (!id) {
                createQuarter({ ...values, id: id, startDate: format(startDateView, 'yyyy-MM-dd'), endDate: format(endDateView, 'yyyy-MM-dd'), schoolYear: { startDate: value.startDate } });
                navigation.goBack();
            } else {
                editQuarter({ ...values, id: id, startDate: format(startDateView, 'yyyy-MM-dd'), endDate: format(endDateView, 'yyyy-MM-dd'), schoolYear: { startDate: value.startDate } });
                navigation.goBack();
            }
        }
    };

    if (isLoading || isLoadingQuearter) {
        return <Loading />;
    }

    if (errorQuarter || error) {
        return <Error refetch={() => { refetchQuarter(); refetch(); }} error={errorQuarter ?? error} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.headerContainer}>
                    <Text>Номер четверти:</Text>
                    <Controller
                        control={control}
                        name="number"
                        rules={{
                            required: 'Поле обязательно',
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'Только числа',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => <>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="number-pad"
                                defaultValue={value ? `${value}` : ''}
                            />
                            {errors.number?.message && (<Text style={styles.errorText}>{errors.number.message.toString()}</Text>)}
                        </>
                        }
                    />
                </View>
                <View style={styles.headerContainer}>
                    <Text>Год:</Text>
                    <Dropdown
                        style={styles.input}
                        placeholder={'Выберите год'}
                        data={academicYears ?? []}
                        labelField={'name'}
                        valueField={'startDate'}
                        value={value}
                        onChange={item => {
                            setValue(item);
                        }}
                    />
                </View>
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
