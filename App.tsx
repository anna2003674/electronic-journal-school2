import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { AppNavigaton } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

axios.defaults.baseURL = 'http://10.0.2.2:8080';

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigaton />
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
