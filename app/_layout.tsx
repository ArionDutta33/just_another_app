import '../global.css';
import Toast from 'react-native-toast-message';
import { Stack } from 'expo-router';
import AuthProvider from '~/components/provider/Auth';

export default function Layout() {
  return (
    <>
      <AuthProvider>
        <Stack />
        <Toast />
      </AuthProvider>
    </>
  );
}
