import '../global.css';
import Toast from 'react-native-toast-message';
import { Stack } from 'expo-router';
import AuthProvider from '~/components/provider/Auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function Layout() {
  return (
    <>
      <GestureHandlerRootView>
        <AuthProvider>
          <Stack />
          <Toast />
        </AuthProvider>
      </GestureHandlerRootView>
    </>
  );
}
