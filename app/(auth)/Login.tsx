import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Vibration,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack, useRouter } from 'expo-router';
import authbg from '../../assets/images/authbg_2.png';
import { useAuth } from '~/components/provider/Auth';
import Toast from 'react-native-toast-message';
import { supabase } from '~/utils/supabase';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  async function signInWithEmail() {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Toast.show({
          text1: 'Error',
          text2: error.message,
          type: 'error',
        });
        Alert.alert('Login Failed', error.message);
        return;
      }
      Toast.show({
        text1: 'Success',
        text2: 'Signed in successfully!',
        type: 'success',
      });

      navigate.replace('/');
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Text>Loading...</Text>;
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
            {/* Main Content Container */}
            <View className="flex-1 items-center justify-center px-6 py-8">
              {/* Logo/Image Section */}
              <View className="mb-8 w-full items-center">
                <Image
                  resizeMode="contain"
                  style={{ height: 280, width: '100%', maxWidth: 320 }}
                  source={authbg}
                />
              </View>

              {/* Title Section */}
              <View className="mb-8 items-center">
                <Text className="text-center text-4xl font-extrabold text-[#7f4f24]">
                  Welcome Back
                </Text>
                {/* <Text className="mt-2 text-center text-base text-[#7f4f24]/70">
                  Join us and start your journey
                </Text> */}
              </View>

              {/* Form Section */}
              <View className="w-full items-center gap-2 ">
                <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  placeholderTextColor="#7f4f24/60"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Enter password"
                  placeholderTextColor="#7f4f24/60"
                  // secureTextEntry
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Confirm password"
                  placeholderTextColor="#7f4f24/60"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                /> */}
              </View>

              {/* Button Section */}
              <View className="mt-8 w-full items-center">
                <TouchableOpacity
                  onPress={async () => {
                    signInWithEmail();
                  }}
                  className="w-full max-w-[350px] rounded-xl bg-[#7f4f24] px-6 py-4 shadow-lg"
                  activeOpacity={0.8}>
                  <Text className="text-center text-lg font-bold text-white">Sign In</Text>
                </TouchableOpacity>

                <View className="mt-6 flex-row items-center">
                  <View className="h-px flex-1 bg-[#dda15e]/40" />
                  <Text className="mx-4 text-sm text-[#7f4f24]/60">or</Text>
                  <View className="h-px flex-1 bg-[#dda15e]/40" />
                </View>

                <Link href={'/(auth)/Register'} asChild>
                  <TouchableOpacity
                    className="mt-6 w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/50 px-6 py-4"
                    activeOpacity={0.8}>
                    <Text className="text-center text-base font-semibold text-[#7f4f24]">
                      Sign up instead
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;
