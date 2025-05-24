import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import authbg from '../../assets/images/authbg_2.png';

const Login = () => {
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
                  placeholderTextColor="#7f4f24/60"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TextInput
                  className="w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/90 px-5 py-4 text-base shadow-sm"
                  placeholder="Create password"
                  placeholderTextColor="#7f4f24/60"
                  secureTextEntry
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
                  className="w-full max-w-[350px] rounded-xl bg-[#7f4f24] px-6 py-4 shadow-lg"
                  activeOpacity={0.8}>
                  <Text className="text-center text-lg font-bold text-white">Sign In</Text>
                </TouchableOpacity>

                <View className="mt-6 flex-row items-center">
                  <View className="h-px flex-1 bg-[#dda15e]/40" />
                  <Text className="mx-4 text-sm text-[#7f4f24]/60">or</Text>
                  <View className="h-px flex-1 bg-[#dda15e]/40" />
                </View>

                <TouchableOpacity
                  className="mt-6 w-full max-w-[350px] rounded-xl border border-[#dda15e] bg-white/50 px-6 py-4"
                  activeOpacity={0.8}>
                  <Text className="text-center text-base font-semibold text-[#7f4f24]">
                    Sign in instead
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;
