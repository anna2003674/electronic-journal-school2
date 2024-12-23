import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { RoomItem } from './RoomItem';
import { FlatList } from 'react-native-gesture-handler';
import { Loading } from '../../../Components/Loading';
import { Error } from '../../../Components/Error';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { CreateIcon } from '../../../icons/Create';
import { useRoomsList } from '../../../Hooks/useRoomsList';

export const RoomsScreen = () => {
    const { rooms, isLoadingRooms, errorRooms, refetchRooms } = useRoomsList();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <TouchableOpacity style={styles.createButton} hitSlop={20} onPress={() => navigation.navigate('EditRoomScreen')}><CreateIcon /></TouchableOpacity> })
    }, [navigation]);

    if (isLoadingRooms) {
        return <Loading />;
    }

    if (errorRooms) {
        return <Error refetch={() => { refetchRooms(); }} error={errorRooms} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={rooms}
                renderItem={({ item }) => <RoomItem
                    id={item.id}
                    roomNumber={item.roomNumber}
                    capacity={item.capacity}
                    floor={item.floor}
                />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};
