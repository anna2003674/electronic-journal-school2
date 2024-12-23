import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useLoginMutation } from './hooks';
import { useAuthStore } from '../../stores/useAuthStore';
import { Loading } from '../../Components/Loading';

export const LoginScreen = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isReady, setIsReady] = useState(false);
    const { data, isPending, error, mutate } = useLoginMutation();
    const setToken = useAuthStore((state) => state.setToken);
    const loadToken = useAuthStore((state) => state.loadToken);
    const disabled = username === '' || password === '' || isPending;

    useEffect(() => {
        if (data) {
            setToken(data['jwt-token']);
        }
    }, [data, setToken]);

    useEffect(() => {
        loadToken().finally(() => setIsReady(true));
    }, [loadToken]);

    if (!isReady) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Введите имя пользователя и пароль:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    placeholder="Имя пользователя"
                    value={username}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry
                    autoCorrect={false}
                    autoComplete="current-password"
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} disabled={disabled} onPress={() => mutate({ username, password })}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>Не удалось авторизоваться: {error.message}</Text>}
        </View>
    );
};
