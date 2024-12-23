import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { CreateIcon } from '../../../icons/Create';
import { AcademicYearItem } from './AcademicYearItem';
import { useAcademicYearsList } from '../../../Hooks/useAcademicYearsList';

export const AcademicYearsScreen = () => {
    const { academicYears, isLoading, error, refetch } = useAcademicYearsList();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <TouchableOpacity style={styles.createButton} hitSlop={20} onPress={() => navigation.navigate('EditAcademicYearsScreen')}><CreateIcon /></TouchableOpacity> })
    }, [navigation]);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error refetch={() => { refetch(); }} error={error} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={academicYears}
                renderItem={({ item }) => <AcademicYearItem
                    name={item.name}
                    startDate={item.startDate}
                    endDate={item.endDate}
                />}
                keyExtractor={item => item.startDate.toString()}
            />
        </View>
    );
};
