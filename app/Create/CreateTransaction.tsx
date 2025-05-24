import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const CreateTransaction = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView className="flex-1 bg-[#faedcd]">
          <View className="mx-4 my-6 flex-row items-center justify-between">
            <Ionicons name="arrow-back" size={24} />
            <Text className="text-lg font-medium">New Transaction</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-medium">Save</Text>
              <Ionicons name="checkmark" size={12} />
            </View>
          </View>
          <View className="mx-4 rounded-xl bg-white p-4 shadow-xl">
            <View className="flex-row justify-center gap-4 ">
              <Pressable className="flex-row items-center gap-2 rounded-full bg-[#7f4f24] px-10 py-4">
                <View className="rounded-full bg-white p-1 ">
                  <Ionicons name="arrow-down" color={'#7f4f24'} size={12} />
                </View>
                <Text className="font-bold text-white">Expense</Text>
              </Pressable>
              <Pressable className="flex-row items-center gap-2 rounded-full border  border-[#c28d09] px-10 py-4">
                <View className="rounded-full bg-green-500 p-1 ">
                  <Ionicons name="arrow-up" color={'white'} size={12} />
                </View>
                <Text className="font-bold ">Expense</Text>
              </Pressable>
            </View>
            <View className="my-4 flex-row items-center  border-b border-[#e2e2e2] px-4">
              <Text className="text-4xl font-bold">$</Text>
              <TextInput
                className="flex-1   text-4xl font-bold"
                placeholder="0.00"
                placeholderTextColor={'#d4a276'}
                // placeholderClassName="text-3xl "
              />
            </View>
            <View className="my-4 flex-row items-center rounded-xl border border-[#c28d09] px-4 py-1">
              <MaterialCommunityIcons name="note-edit-outline" size={22} color={'#c28d09'} />
              <TextInput
                placeholderTextColor={'#c28d09'}
                className="flex-1   px-4"
                placeholder="Transaction Title"
              />
            </View>
            <View className="mb-4 flex-row items-center gap-2">
              <AntDesign name="paperclip" size={20} />
              <Text className="text-xl font-bold">Category</Text>
            </View>
            <View className="flex-row flex-wrap gap-3">
              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <Ionicons name="fast-food" />
                <Text>Food & Drinks</Text>
              </View>

              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <Ionicons name="cart" />
                <Text>Shopping</Text>
              </View>
              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <Ionicons name="car" />
                <Text>Transportation</Text>
              </View>
              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <Ionicons name="film" />
                <Text>Transportation</Text>
              </View>
              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <FontAwesome name="money" />
                <Text>Bills</Text>
              </View>
              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <FontAwesome name="money" />
                <Text>Income</Text>
              </View>
              <View className=" flex-row items-center gap-2 rounded-full border border-[#a3a1a1] px-6 py-1">
                <MaterialCommunityIcons name="dots-horizontal" />
                <Text>Other</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateTransaction;
