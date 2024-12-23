import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { CreateIcon } from '../../../icons/Create';
import { useQuarterList } from './hooks';
import { QuarterItem } from './QuarterItem';

export const QuartersScreen = () => {
    const { quarterList, isLoading, error, refetch } = useQuarterList();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <TouchableOpacity style={styles.createButton} hitSlop={20} onPress={() => navigation.navigate('EditQuarterScreen')}><CreateIcon /></TouchableOpacity> })
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
                data={quarterList}
                renderItem={({ item }) => <QuarterItem
                    id={item.id}
                    number={item.number}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    schoolYear={item.schoolYear}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
