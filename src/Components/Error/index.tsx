import { Button, Text, View } from 'react-native';
import { styles } from './styles';

type ItemProps = {
    refetch: () => void | Promise<void>,
    error?: Error | null,
}

export const Error: React.FC<ItemProps> = ({ refetch, error }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{error ? `Error: ${error.message}` : 'Something goes wrong'}</Text>
            <Button
                title="Refresh"
                onPress={refetch}
            />
        </View>
    );
};
