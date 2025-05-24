import React from 'react';

import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import logo from '../assets/images/logo.png';
const Home = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#faedcd]">
        <View className="my-5 flex-row items-center justify-between px-4">
          <Image style={{ height: 100, width: 100 }} resizeMode="center" source={logo} />
          <View>
            <Text className="font-medium text-[#838383]">Welcome,</Text>
            <Text className="text-lg font-bold text-[#7f4f24]">burakokmezz</Text>
          </View>
          <Pressable className="flex-row items-center gap-2 rounded-full bg-[#7f4f24] px-4 py-2">
            <Ionicons name="add" color={'white'} size={20} />
            <Text className=" text-white">Add</Text>
          </Pressable>
          <View className="rounded-full bg-white p-2">
            <Ionicons name="log-out-outline" color={'black'} size={20} />
          </View>
        </View>
        <View className="mx-4 rounded-xl bg-white p-4 shadow-xl">
          <Text className="mb-2 text-gray-400">Total Balance</Text>
          <Text className="text-3xl font-bold text-[#6b3b11]">$1289.56</Text>
          <View className="mt-6 flex-row items-center justify-between">
            <View className="">
              <Text className="text-center text-gray-400">Income</Text>
              <Text className="text-lg font-bold text-green-500">+$2800.00</Text>
            </View>
            <View className="border-l border-[#cac8c8] px-5">
              <Text className="text-center text-gray-400">Expenses</Text>
              <Text className="text-lg font-bold text-red-500">-$1510.44</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
