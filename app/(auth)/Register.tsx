import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Vibration,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack, useRouter } from 'expo-router';
import authbg from '../../assets/images/authbg_1.png';
import Toast from 'react-native-toast-message';
import { useAuth } from '~/components/provider/Auth';
import { supabase } from '~/utils/supabase';
const Register = () => {
  const navigation = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  async function signUpWithEmail() {
    try {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({ email, password });

      if (error) {
        Toast.show({
          text1: 'Error',
          text2: error.message,
          type: 'error',
        });
        return;
      }

      if (session) {
        Vibration.vibrate(100);
        Toast.show({
          text1: 'Account created',
          text2: 'Kindly Login!',
          type: 'success',
        });
        navigation.replace('/(auth)/Login');
      } else {
        Toast.show({
          text1: 'Unexpected',
          text2: 'Signup succeeded, but no session returned.',
          type: 'info',
        });
      }
    } catch (e) {
      Toast.show({
        text1: 'Unexpected Error',
        text2: 'Something went wrong',
        type: 'error',
      });
      console.log('Signup error:', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#faedcd]">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS === 'ios' ? 120 : 20,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="flex-1 items-center justify-center px-6 py-8">
              <View className="mb-8 w-full items-center">
                <Image
                  resizeMode="contain"
                  style={{ height: 280, width: '100%', maxWidth: 320 }}
                  source={authbg}
                />
              </View>

              <View className="mb-8 items-center">
                <Text className="text-center text-4xl font-extrabold text-[#7f4f24]">
                  Create Account
                </Text>
                <Text className="mt-2 text-center text-base text-[#7f4f24]/70">
                  Join us and start your journey
                </Text>
              </View>

              <View className="w-full items-center gap-2 ">
                <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Enter your email"
                  placeholderTextColor="#7f4f24/60"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Create password"
                  placeholderTextColor="#7f4f24/60"
                  secureTextEntry
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  autoCorrect={false}
                />

                <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Confirm password"
                  placeholderTextColor="#7f4f24/60"
                  secureTextEntry
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={(value) => setConfirmPassword(value)}
                  autoCorrect={false}
                />
              </View>

              <View className="mt-8 w-full items-center">
                <TouchableOpacity
                  onPress={async () => {
                    signUpWithEmail();
                  }}
                  className="w-full max-w-[350px] rounded-xl bg-[#7f4f24] px-6 py-4 shadow-lg"
                  activeOpacity={0.8}>
                  <Text className="text-center text-lg font-bold text-white">Create Account</Text>
                </TouchableOpacity>

                <View className="mt-6 flex-row items-center">
                  <View className="h-px flex-1 bg-[#dda15e]/40" />
                  <Text className="mx-4 text-sm text-[#7f4f24]/60">or</Text>
                  <View className="h-px flex-1 bg-[#dda15e]/40" />
                </View>

                <Link
                  href={'/(auth)/Login'}
                  className="mt-6 w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/50 px-6 py-4">
                  <Text className="text-center text-base font-semibold text-[#7f4f24]">
                    Sign in instead
                  </Text>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Register;
